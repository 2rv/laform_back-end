import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';

import { UserRecoveryService } from './user-recovery.service';
import { UserRecoveryDto } from './dto/user-recovery.dto';

@Controller('user-recovery')
export class UserRecoveryController {
  constructor(private userRecoveryService: UserRecoveryService) {}

  @Post()
  async signUp(
    @Body(ValidationPipe) userRecoveryDto: UserRecoveryDto,
  ): Promise<void> {
    return this.userRecoveryService.recover(userRecoveryDto);
  }
}
