import {
  Controller,
  Patch,
  UseGuards,
  Body,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AccountGuard } from '../user/guard/account.guard';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';

import { UserSettingsUpdatePasswordDto } from './dto/user-settings-update-password.dto';
import { UserSettingsGetEmailDto } from './dto/user-settings-get-email.dto';
import { UserSettingsUpdateEmailDto } from './dto/user-settings-update-email.dto';
import { PasswordGuard } from './guard/password.guard';
import { UserSettingsService } from './user-settings.service';

@Controller('user/settings')
export class UserSettingsController {
  constructor(private userSettingsService: UserSettingsService) {}

  @Patch('/password')
  @UseGuards(AuthGuard(), AccountGuard, PasswordGuard)
  updatePassword(
    @Body(ValidationPipe)
    userSettingsUpdatePasswordDto: UserSettingsUpdatePasswordDto,
    @GetAccount() user: UserEntity,
  ): Promise<void> {
    return this.userSettingsService.updatePassword(
      user,
      userSettingsUpdatePasswordDto,
    );
  }

  @Get('/email')
  // @UseGuards(AuthGuard(), AccountGuard)
  async getAccountEmail(@GetAccount() user: UserEntity): Promise<any> {
    return 'hello';
  }

  @Patch('/email')
  @UseGuards(AuthGuard(), AccountGuard, PasswordGuard)
  async updateUserEmail(
    @GetAccount() user: UserEntity,
    @Body(ValidationPipe) data: UserSettingsUpdateEmailDto,
  ): Promise<void> {
    return this.userSettingsService.updateEmail(user, data);
  }
}
