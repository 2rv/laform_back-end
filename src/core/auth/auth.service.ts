import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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
import { BasketService } from './../basket/basket.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private userInfoService: UserInfoService,
    private basketService: BasketService,
  ) {}

  async signUp(userSignUpDto: UserSignUpDto): Promise<any> {
    const user: UserEntity = await this.userRepository.createUser(
      userSignUpDto,
    );
    await this.userInfoService.create(user);
    await this.basketService.create(user);
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
    const { id, login, email, role, emailConfirmed } = user;

    const payload: JwtPayload = {
      id,
      login,
      email,
      role,
      emailConfirmed,
    };

    return this.jwtService.sign(payload);
  }

  async updateLogin(user: UserEntity): Promise<LoginInfoDto> {
    if (user.emailConfirmed) {
      const accessToken = await this.createJwt(user);
      return { accessToken };
    } else {
      throw new BadRequestException(AUTH_ERROR.USER_NOT_CONFIRMED);
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
}
