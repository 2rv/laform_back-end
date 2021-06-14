import { Controller, Post, Body, ValidationPipe, Query } from '@nestjs/common';

import { UserRecoveryService } from './user-recovery.service';
import {
  UserRecoveryChangePasswordDto,
  UserRecoveryDto,
} from './dto/user-recovery.dto';

@Controller('user-recovery')
export class UserRecoveryController {
  constructor(private userRecoveryService: UserRecoveryService) {}

  @Post()
  async recover(
    @Body(ValidationPipe) userRecoveryDto: UserRecoveryDto,
  ): Promise<void> {
    return this.userRecoveryService.sendEmailPasswordRecovery(userRecoveryDto);
  }

  @Post('change-password')
  async changePassword(
    @Query('code')
    code: string,
    @Body(ValidationPipe)
    userRecoveryChangePasswordDto: UserRecoveryChangePasswordDto,
  ): Promise<void> {
    return this.userRecoveryService.changePassword(
      code,
      userRecoveryChangePasswordDto,
    );
  }
}
