import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { AccountGuard } from '../user/guard/account.guard';
import { UserEntity } from '../user/user.entity';
import { UserService } from './user.service';
import { UserGetSubscriptionStatusDto } from './dto/user-get-subscription-status.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/subscription')
  @UseGuards(AuthGuard(), AccountGuard)
  getAccountEmail(
    @GetAccount() user: UserEntity,
  ): Promise<UserGetSubscriptionStatusDto> {
    return this.userService.getSubscriptionStatus(user);
  }
}
