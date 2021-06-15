import {
  Controller,
  Patch,
  UseGuards,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AccountGuard } from '../user/guard/account.guard';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';

import { UserSettingsUpdatePasswordDto } from './dto/user-settings-update-password.dto';
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
}
