import {
  Injectable,
  NotFoundException,
  BadRequestException,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { AUTH_ERROR } from './enum/auth-error.enum';
import { UserSignUpDto } from './dto/user-sign-up.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { LoginInfoDto } from './dto/login-info.dto';
import { AccountDataDto } from './dto/account-data.dto';
import { JwtPayload } from './interface/jwt-payload.interface';
import { AuthRepository } from './auth.repository';
import { UserInfoService } from '../user-info/user-info.service';
import { AuthBasketForCodeDto } from './dto/auth-basket-code.dto';
import {
  UserUpdateEmailDto,
  UserUpdateEmailRawDataDto,
} from './dto/user-update-email.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private userInfoService: UserInfoService,
  ) {}

  async signUp(userSignUpDto: UserSignUpDto): Promise<any> {
    const user: UserEntity = await this.userRepository.createUser(
      userSignUpDto,
    );
    await this.userInfoService.create(user);
    const accessToken = await this.createJwt(user);

    return { accessToken };
  }

  async login(userLoginDto: UserLoginDto): Promise<LoginInfoDto> {
    const userData = await this.authRepository.login(userLoginDto);

    const accessToken = await this.createJwt(userData);

    const loginInfo: LoginInfoDto = { accessToken };
    return loginInfo;
  }

  async createJwt(user: UserEntity): Promise<string> {
    const { id, login, email, role, emailConfirmed, notificationEmail } = user;

    const payload: JwtPayload = {
      id,
      login,
      email,
      role,
      emailConfirmed,
      notificationEmail,
    };

    return this.jwtService.sign(payload);
  }

  async confirmEmailByCode(
    user: UserEntity,
    code: string,
  ): Promise<LoginInfoDto> {
    const rawPayload: string = await this.cacheManager.get(user.email + code);

    if (!rawPayload) {
      throw new BadRequestException(AUTH_ERROR.CODES_IS_INCORRECT);
    }

    const payload = JSON.parse(rawPayload);

    if (user.email !== payload.email) {
      throw new BadRequestException(AUTH_ERROR.CODES_IS_INCORRECT);
    }

    await this.userRepository.confirmEmailById(user);
    await this.cacheManager.del(user.email + code);
    const accessToken = await this.createJwt(user);
    console.log(`${user.email} is confirmed by ${code}`);
    return { accessToken };
  }

  async updateEmail(
    user: UserEntity,
    body: UserUpdateEmailDto,
  ): Promise<LoginInfoDto> {
    if (!user.emailConfirmed) body.codeOldEmail = body.codeNewEmail;
    let oldRawData: string = await this.cacheManager.get(body.codeOldEmail);
    let newRawData: string = await this.cacheManager.get(body.codeNewEmail);
    if (!oldRawData) {
      throw new BadRequestException(AUTH_ERROR.UPDATE_OLD_CODE_INCORRECT);
    }
    if (!newRawData) {
      throw new BadRequestException(AUTH_ERROR.UPDATE_NEW_CODE_INCORRECT);
    }
    const newData: UserUpdateEmailRawDataDto = JSON.parse(newRawData);
    const oldData: UserUpdateEmailRawDataDto = JSON.parse(oldRawData);
    if (oldData.email !== newData.email) {
      throw new BadRequestException(AUTH_ERROR.CODES_IS_INCORRECT);
    }
    try {
      await this.userRepository.update(user.id, { email: newData.email });
      await this.cacheManager.del(body.codeOldEmail);
      await this.cacheManager.del(body.codeNewEmail);
      user.email = newData.email;
      const accessToken = await this.createJwt(user);
      return { accessToken };
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async getAccountById(id: number): Promise<UserEntity> {
    const user = await this.authRepository.findOne({ id });

    if (!user) {
      throw new NotFoundException(AUTH_ERROR.USER_WITH_THIS_ID_NOT_FOUND);
    }

    return user;
  }

  async getAccountInfo(user: UserEntity): Promise<AccountDataDto> {
    const result = await this.userRepository.findOne(user.id, {
      relations: ['userSettingId'],
    });
    const accountData = {
      id: user.id,
      login: user.login,
      email: user.email,
      emailConfirmed: user.emailConfirmed,
      createDate: user.createDate,
      userInfo: result.userSettingId,
    };

    return accountData;
  }

  async signUpWithGoogle(body: {
    id: string;
    email: string;
    fullName: string;
    accessToken: string;
  }): Promise<LoginInfoDto> {
    let accessToken;
    const findUserByEmail: UserEntity = await this.userRepository.findOne({
      email: body.email,
    });

    if (Boolean(findUserByEmail) && !findUserByEmail.googleId) {
      findUserByEmail.googleId = body.id;
      await findUserByEmail.save();
    }

    const findUserByGoogleId: UserEntity = await this.userRepository.findOne({
      googleId: body.id,
    });

    if (Boolean(findUserByGoogleId)) {
      accessToken = await this.createJwt(findUserByGoogleId);
    } else {
      const user = await this.userRepository.saveGoogleUser({
        email: body.email,
        login: body.email.split('@')[0],
        googleId: body.id,
      });
      await this.userInfoService.create(user, body.fullName);
      accessToken = await this.createJwt(user);
    }
    return { accessToken };
  }

  async signUpWithFacebook(body: any): Promise<LoginInfoDto> {
    let accessToken;

    const findUserByEmail: UserEntity = await this.userRepository.findOne({
      email: body.email,
    });

    if (Boolean(findUserByEmail) && !findUserByEmail.facebookId) {
      findUserByEmail.facebookId = body.id;
      await findUserByEmail.save();
    }

    const findUserByFacebookId: any = await this.userRepository.findOne({
      facebookId: body.id,
    });

    if (Boolean(findUserByFacebookId)) {
      accessToken = await this.createJwt(findUserByFacebookId);
    } else {
      const user = await this.userRepository.saveFacebookUser({
        email: body.email,
        login: body.email.split('@')[0],
        facebookId: body.id,
      });
      await this.userInfoService.create(user);

      accessToken = await this.createJwt(user);
    }

    return { accessToken };
  }

  async signUpWithApple(body: any): Promise<LoginInfoDto> {
    let accessToken;
    const findUserByAppleId: UserEntity = await this.userRepository.findOne({
      appleId: body.idToken,
    });

    if (findUserByAppleId) {
      accessToken = await this.createJwt(findUserByAppleId);
    } else {
      const getEmail = JSON.parse(body.user + '');
      const user = await this.userRepository.saveAppleUser({
        email: getEmail.email,
        login: getEmail.email.split('@')[0],
        appleId: body.idToken,
      });
      await this.userInfoService.create(user);
      accessToken = await this.createJwt(user);
    }
    return { accessToken };
  }

  async authVerifyByCode(body: AuthBasketForCodeDto): Promise<any> {
    const codeResult: string = await this.cacheManager.get(
      `AuthBasketEmailCodeFor${body.email}`,
    );

    if (codeResult === body.code) {
      return true;
    } else {
      throw new BadRequestException(AUTH_ERROR.AUTH_CODE_IS_INCORRECT);
    }
  }

  async deleteUser(id: number): Promise<any> {
    const result = await this.userRepository.delete({ id });
    if (!result) {
      throw new BadRequestException(AUTH_ERROR.AUTH_CODE_IS_INCORRECT);
    }
    return result;
  }
}
