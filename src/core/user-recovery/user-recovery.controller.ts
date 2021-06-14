import { Controller, Post, Body, ValidationPipe, Query } from '@nestjs/common';

import { UserRecoveryService } from './user-recovery.service';
import { UserRecoveryDto } from './dto/user-recovery.dto';
import { UserRecoveryChangeCredentialsDto } from './dto/user-recovery-change-password.dto';

@Controller('user-recovery')
export class UserRecoveryController {
  constructor(private userRecoveryService: UserRecoveryService) {}

  @Post()
  async getRecoveryCode(
    @Body(ValidationPipe) data: UserRecoveryDto,
  ): Promise<void> {
    return this.userRecoveryService.getRecoveryCode(data);
  }

  @Post('change-credentials')
  async changeCredentials(
    @Query('code')
    code: string,
    @Body(ValidationPipe)
    data: UserRecoveryChangeCredentialsDto,
  ): Promise<void> {
    return this.userRecoveryService.changeCredentials(code, data);
  }
}
