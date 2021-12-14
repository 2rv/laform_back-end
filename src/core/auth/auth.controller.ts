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

  @Get('/update-login')
  @UseGuards(AuthGuard(), AccountGuard)
  checkUserConfirmed(@GetAccount() user: UserEntity): Promise<LoginInfoDto> {
    return this.authService.updateLogin(user);
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

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin() {}

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  @UseFilters(ViewAuthFilter)
  async facebookLoginRedirect(@Req() req, @Res() res) {
    const clientUrl = req.hostname.includes('localhost')
      ? `${req.protocol}://localhost:3000`
      : ClientConfig.url;

    const token = await this.authService.signUpWithFacebook(req.user);
    return res.redirect(
      `${clientUrl}/social-auth-access?data=${token.accessToken}`,
    );
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    console.log('google');
  }

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
  async appleAuthRedirect(@Body() body, @Res() res) {
    const token = await this.authService.signUpWithApple(body);
    return res.redirect(
      `${ClientConfig.url}/social-auth-access?data=${token.accessToken}`,
    );
  }
}
