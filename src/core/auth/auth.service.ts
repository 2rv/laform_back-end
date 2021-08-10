import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { MoreThanOrEqual } from 'typeorm';
import { getUnixTime, addMonths } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import { JwtConfig } from 'src/config/jwt.config';

import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';

import { AUTH_ERROR } from './enum/auth-error.enum';
import { UserSignUpDto } from './dto/user-sign-up.dto';
import { LoginInfoDto } from './dto/login-info.dto';
import { AccountDataDto } from './dto/account-data.dto';
import { JwtPayload } from './interface/jwt-payload.interface';
import { AuthRepository } from './auth.repository';
import { JwtPayloadDto } from './dto';
import { IUpdateProps } from './interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  private _getRefreshData() {
    const refreshToken = uuidv4();
    const refreshTokenExpires = getUnixTime(
      addMonths(new Date(), JwtConfig.refreshTokenTime),
    );

    return { refreshToken, refreshTokenExpires };
  }

  async signUp(userSignUpDto: UserSignUpDto): Promise<LoginInfoDto> {
    const user: UserEntity = await this.userRepository.createUser(
      userSignUpDto,
    );

    const accessToken = await this.createJwt(user);

    return { accessToken };
  }

  public async login(user: JwtPayloadDto, isRefresh: boolean) {
    const updateData = { ...this._getRefreshData() } as IUpdateProps;

    if (!isRefresh) {
      updateData.loginTime = new Date().toISOString();
    }

    await this.userRepository.update(user.id, updateData);

    return {
      accessToken: this.jwtService.sign(
        { ...user },
        {
          expiresIn: JwtConfig.accessTokenTime,
        },
      ),
      refreshToken: updateData.refreshToken,
    };
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

  public async verifyRefreshToken(
    token: string,
  ): Promise<JwtPayloadDto | null> {
    const currentTimestamp = getUnixTime(new Date());

    try {
      const user = await this.userRepository.relationedFindOne({
        refreshToken: token,
        refreshTokenExpires: MoreThanOrEqual(currentTimestamp),
      });

      return user ? new JwtPayloadDto(user) : null;
    } catch (err) {
      return null;
    }
  }
}
