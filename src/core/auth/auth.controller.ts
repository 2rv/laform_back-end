import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Req,
  Res,
  UsePipes,
  UseFilters,
  Delete,
  Query,
  Param,
  Put,
} from '@nestjs/common';
import { UserSignUpDto } from './dto/user-sign-up.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';
import { AccountGuard } from '../user/guard/account.guard';
import { LoginInfoDto } from './dto/login-info.dto';
import { AccountDataDto } from './dto/account-data.dto';
import { ClientConfig } from '../../config/client.config';
import { AuthBasketForCodeDto } from './dto/auth-basket-code.dto';
import { ViewAuthFilter } from '../user/guard/auth.filter';
import { UserUpdateEmailDto } from './dto/user-update-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('/verify/code')
  async authVerifyByCode(@Body() body: AuthBasketForCodeDto): Promise<void> {
    return this.authService.authVerifyByCode(body);
  }

  @Delete('/delete/user')
  async deleteUser(@Query() query): Promise<void> {
    return this.authService.deleteUser(query.id);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('/signup')
  async signUp(@Body() userSignUpDto: UserSignUpDto): Promise<LoginInfoDto> {
    return await this.authService.signUp(userSignUpDto);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('/login')
  logIn(@Body() userLoginDto: UserLoginDto): Promise<LoginInfoDto> {
    return this.authService.login(userLoginDto);
  }

  @Get('/token')
  @UseGuards(AuthGuard())
  checkToken(): void {}

  @Get('/account-data')
  @UseGuards(AuthGuard(), AccountGuard)
  getAccountData(@GetAccount() user: UserEntity): Promise<AccountDataDto> {
    return this.authService.getAccountInfo(user);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Put('/update-email')
  @UseGuards(AuthGuard(), AccountGuard)
  async confirmUpdateEmail(
    @GetAccount() user: UserEntity,
    @Body() body: UserUpdateEmailDto,
  ): Promise<LoginInfoDto> {
    return await this.authService.updateEmail(user, body);
  }

  @Get('/confirm-email/:code')
  @UseGuards(AuthGuard(), AccountGuard)
  async confirmEmailByCode(
    @GetAccount() user: UserEntity,
    @Param('code') code: string,
  ): Promise<LoginInfoDto> {
    return this.authService.confirmEmailByCode(user, code.toLowerCase());
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin() {}

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  @UseFilters(ViewAuthFilter)
  async facebookLoginRedirect(@Req() req, @Res() res) {
    console.log(req.user);
    // const token = await this.authService.signUpWithFacebook(req.user);
    // return res.redirect(
    //   `${ClientConfig.url}/auth/social-access?data=${token.accessToken}`,
    // );
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  @UseFilters(ViewAuthFilter)
  async googleAuthRedirect(@Req() req, @Res() res) {
    const token = await this.authService.signUpWithGoogle(req.user);
    return res.redirect(
      `${ClientConfig.url}/auth/social-access?data=${token.accessToken}`,
    );
  }
  @Get('/apple')
  @UseGuards(AuthGuard('apple'))
  async appleAuth() {}

  @Post('/apple/redirect')
  @UseGuards(AuthGuard('apple'))
  @UseFilters(ViewAuthFilter)
  async appleAuthRedirect(@Req() req, @Res() res) {
    const token = await this.authService.signUpWithApple(req.user);
    return res.redirect(
      `${ClientConfig.url}/auth/social-access?data=${token.accessToken}`,
    );
  }
}
