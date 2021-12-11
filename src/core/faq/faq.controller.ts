import {
  Controller,
  Post,
  UseGuards,
  Get,
  Body,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { FaqService } from './faq.service';
import { FaqDatato } from './dto/faq.dto';

@Controller('faq')
export class FaqController {
  constructor(private faqService: FaqService) {}

  @Get('/:name')
  async get(@Param('name') name: string) {
    console.log(name);

    return await this.faqService.get(name.trim().toLocaleLowerCase());
  }

  @Post('/:name')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(
    @Body(ValidationPipe) body: FaqDatato,
    @Param('name') name: string,
  ) {
    return await this.faqService.save(body, name.trim().toLocaleLowerCase());
  }
}
