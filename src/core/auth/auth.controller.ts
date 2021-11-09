import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Req,
  Res,
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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) userSignUpDto: UserSignUpDto,
  ): Promise<LoginInfoDto> {
    return this.authService.signUp(userSignUpDto);
  }

  @Post('/login')
  logIn(
    @Body(ValidationPipe) userLoginDto: UserLoginDto,
  ): Promise<LoginInfoDto> {
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

  @Get('/update-login')
  @UseGuards(AuthGuard(), AccountGuard)
  checkUserConfirmed(@GetAccount() user: UserEntity): Promise<LoginInfoDto> {
    return this.authService.updateLogin(user);
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(@Req() req): Promise<any> {
    console.dir('face');
    console.dir(req);
    return { ok: 'ok' };
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req, @Res() res) {
    console.dir('redirect');
    console.dir(req);
    const clientUrl = req.hostname.includes('localhost')
      ? `${req.protocol}://localhost:3000`
      : ClientConfig.url;
    console.log(res);

    const token = await this.authService.signUpWithFacebook(req.user);
    return res.redirect(
      `${clientUrl}/social-auth-access?data=${token.accessToken}`,
    );
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const token = await this.authService.signUpWithGoogle(req.user);
    const clientUrl = req.hostname.includes('localhost')
      ? `${req.protocol}://localhost:3000`
      : ClientConfig.url;

    return res.redirect(
      `${clientUrl}/social-auth-access?data=${token.accessToken}`,
    );
  }

  @Get('/apple')
  @UseGuards(AuthGuard('apple'))
  async appleAuth() {}

  @Post('/apple/redirect')
  @UseGuards(AuthGuard('apple'))
  async appleAuthRedirect(@Req() req, @Res() res) {
    //console.log('huipizda', req.user, req.user.idToken, req.user.accessToken);
    console.dir(req);
    //res.json(req.user);
    // return {
    //   user: req.user,
    //   idToken: req.user.idToken,
    //   accessToken: req.user.accessToken,
    // };
    //return res.send(req);
    // const token = await this.authService.signUpWithApple(req.user);
    // const clientUrl = req.hostname.includes('localhost')
    //   ? `${req.protocol}://localhost:3000`
    //   : ClientConfig.url;

    // return res.redirect(
    //   `${clientUrl}/social-auth-access?data=${token.accessToken}`,
    // );
  }

  @Post('/verify/code')
  async authVerifyByCode(@Body() body: AuthBasketForCodeDto): Promise<void> {
    return this.authService.authVerifyByCode(body);
  }
}
