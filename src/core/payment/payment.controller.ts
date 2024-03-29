import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
  Post,
  Body,
  Res,
  Param,
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

  @Post('link/')
  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async GetUnitpayLink(
    @GetUser() user: UserEntity,
    @Body() body: PaymentDto,
  ): Promise<any> {
    const url = await this.paymentService.getPayAnyWayLink(body, user);
    return url;
  }
  @Get('link/:purchaseId')
  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async GetPayAnyWayLinkByPurchaseId(
    @GetUser() user: UserEntity,
    @Param('purchaseId') purchaseId : string,
  ): Promise<any> {
    const url = await this.paymentService.getPayAnyWayLinkByPurchaseId(
      purchaseId,
      user,
    );
    return url;
  }
  //localhost:4000/payment/redirect?MNT_ID=123&MNT_TRANSACTION_ID=0000000056&MNT_OPERATION_ID=123123
  @Get('redirect')
  async paymentRedirect(
    @Res() res,
    @Query('MNT_ID') MNT_ID: number,
    @Query('MNT_TRANSACTION_ID') MNT_TRANSACTION_ID: number,
    @Query('MNT_OPERATION_ID') MNT_OPERATION_ID: number,
  ): Promise<any> {
    const link = await this.paymentService.successLink(MNT_TRANSACTION_ID);
    res.redirect(link);
  }
}
