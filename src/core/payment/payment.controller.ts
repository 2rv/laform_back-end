import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
  Post,
  Body,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { PaymentService } from './payment.service';
import { GetUser } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { PaymentDto } from './dto/payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('/')
  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async GetUnitpayLink(
    @GetUser() user: UserEntity,
    @Body() body: PaymentDto,
  ): Promise<any> {
    const url = await this.paymentService.getPayAnyWayLink(body, user);
    return url;
  }
}
