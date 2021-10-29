import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { AccountGuard } from '../user/guard/account.guard';
import { UserEntity } from '../user/user.entity';
import { UserService } from './user.service';
import { UserGetEmailDto } from './dto/user-get-email.dto';
import { USER_ROLE } from './enum/user-role.enum';
import { Roles } from './decorator/role.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/email')
  @UseGuards(AuthGuard(), AccountGuard)
  async getUserEmail(@GetAccount() user: UserEntity): Promise<UserGetEmailDto> {
    return await this.userService.getUserEmail(user);
  }

  @Get('get/')
  @UseGuards(AuthGuard(), AccountGuard)
  @Roles(USER_ROLE.ADMIN)
  async getAll(@Query('size') size: number, @Query('page') page: number) {
    return await this.userService.getAll(size, page);
  }

  @Get('get/:userId')
  @UseGuards(AuthGuard(), AccountGuard)
  @Roles(USER_ROLE.ADMIN)
  async getProfile(@Param('userId') userId: number) {
    return await this.userService.getProfile(userId);
  }

  @Put('update/:userId')
  @UseGuards(AuthGuard(), AccountGuard)
  async updateOne(@Param('userId') userId: number, @Body() body: any) {
    return await this.userService.updateOne(userId, body);
  }

  @Get('/notification-email')
  @UseGuards(AuthGuard(), AccountGuard)
  async getNotificationEmailStatus(@GetAccount() user: UserEntity) {
    return await this.userService.getUserNotificationEmail(user);
  }

  @Put('unsubscribe-notification')
  @UseGuards(AuthGuard(), AccountGuard)
  async unsubscribeNotification(@Query('code') code: string) {
    return await this.userService.unsubscribeNotification(code);
  }
}
