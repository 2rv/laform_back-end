import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpStatus,
  UnauthorizedException,
  UseGuards,
  HttpCode,
  Request,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserSignUpDto } from './dto/user-sign-up.dto';
import { AuthService } from './auth.service';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';
import { AccountGuard } from '../user/guard/account.guard';
import { LoginInfoDto } from './dto/login-info.dto';
import { AccountDataDto } from './dto/account-data.dto';
import { JwtPayloadDto, RefreshTokenDto } from './dto';
import { LocalAuthGuard } from './guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) userSignUpDto: UserSignUpDto,
  ): Promise<LoginInfoDto> {
    return this.authService.signUp(userSignUpDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(HttpStatus.CREATED)
  async logIn(@Request() { user }: { user: JwtPayloadDto }) {
    return {
      user,
      ...(await this.authService.login(user, false)),
    };
  }

  @Post('/refresh')
  @HttpCode(HttpStatus.CREATED)
  async refreshToken(@Body() data: RefreshTokenDto) {
    const user = await this.authService.verifyRefreshToken(data.refreshToken);

    if (!user) {
      throw new UnauthorizedException(
        'Your session is over. You need to login to the application again',
      );
    }

    return this.authService.login(user, true);
  }

  @Get('/account-data')
  @UseGuards(AuthGuard(), AccountGuard)
  getAccountData(@GetAccount() user: UserEntity): Promise<AccountDataDto> {
    return this.authService.getAccountInfo(user);
  }
}
