import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
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
  async getAll(
    @Query('size') size: number = 30,
    @Query('page') page: number = 1,
    @Query('by') by: 'DESC' | 'ASC' = 'DESC',
    @Query('sort') sort: string,
    @Query('where') where: string,
    @Query('role') role: USER_ROLE,
  ) {
    return await this.userService.getAll({
      size,
      page,
      by,
      sort,
      where,
      role,
    });
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

  @Get('/subscribe-status')
  @UseGuards(AuthGuard(), AccountGuard)
  async getNotificationEmailStatus(@GetAccount() user: UserEntity) {
    return user.notificationEmail;
  }

  @Patch('/subscribe-update')
  @UseGuards(AuthGuard(), AccountGuard)
  async updateSubscribeStatus(
    @GetAccount() user: UserEntity,
    @Body() body: { notificationEmail: boolean },
  ) {
    return await this.userService.updateSubscribe(user.id, body);
  }

  @Put('/unsubscribe')
  async unsubscribe(@Query('code') code: string) {
    return await this.userService.unsubscribe(code);
  }
}
