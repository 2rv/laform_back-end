import {
  Controller,
  Body,
  ValidationPipe,
  Get,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';

import { GetAccount } from './decorator/get-account.decorator';
import { AccountGuard } from './guard/account.guard';
import { GetAccountEmailDto } from './dto/get-account-email.dto';
import { UpdateAccountEmailDto } from './dto/update-account-email.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Controller('user/account')
export class UserController {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private userService: UserService,
  ) {}

  @Get('/email')
  @UseGuards(AuthGuard(), AccountGuard)
  async getAccountEmail(
    @GetAccount() user: UserEntity,
  ): Promise<GetAccountEmailDto> {
    return this.userService.getAccountEmail(user);
  }

  @Patch('/email')
  @UseGuards(AuthGuard(), AccountGuard)
  async updateUserEmail(
    @GetAccount() user: UserEntity,
    @Body(ValidationPipe) data: UpdateAccountEmailDto,
  ): Promise<void> {
    return this.userRepository.changeEmail(user, data);
  }
}
