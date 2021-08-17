import { Injectable, NotFoundException } from '@nestjs/common';
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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(userSignUpDto: UserSignUpDto): Promise<LoginInfoDto> {
    const user: UserEntity = await this.userRepository.createUser(
      userSignUpDto,
    );

    const accessToken = await this.createJwt(user);

    return { accessToken };
  }

  async signUpWithGoogle(body: any): Promise<LoginInfoDto> {
    const user = await this.userRepository.createUserWithGoogle({
      email: body.email,
      googleId: body.id,
    });
    const accessToken = await this.createJwt(user);

    return { accessToken };
  }

  async signUpWithFacebook(body: any): Promise<LoginInfoDto> {
    const user = await this.userRepository.createUserWithFacebook({
      email: body.email,
      facebookId: body.id,
    });
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
    const { id, login, email, role } = user;

    const payload: JwtPayload = {
      id,
      login,
      email,
      role,
    };

    return this.jwtService.sign(payload);
  }

  async updateLogin(user: UserEntity): Promise<LoginInfoDto> {
    const accessToken = await this.createJwt(user);

    return { accessToken };
  }

  async getAccountById(id: number): Promise<UserEntity> {
    const user = await this.authRepository.findOne({ id });

    if (!user) {
      throw new NotFoundException(AUTH_ERROR.USER_WITH_THIS_ID_NOT_FOUND);
    }

    return user;
  }

  async getAccountInfo(user: UserEntity): Promise<AccountDataDto> {
    const accountData: AccountDataDto = {
      id: user.id,
      login: user.login,
      email: user.email,
    };

    return accountData;
  }
}
