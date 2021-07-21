import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
  Get,
  Query,
  Delete,
  Patch,
  Request,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('/create')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body(new ValidationPipe()) body, @Request() req) {
    body.userId = req.userAccount.id;
    return await this.likeService.create(body);
  }

  @Get('/get/')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getPosts(
    @Body(new ValidationPipe()) body: any,
    @Request() req,
  ): Promise<any> {
    body.userId = req.userAccount.id;
    return await this.likeService.getPosts(body);
  }

  @Post('/delete')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async delete(@Body(new ValidationPipe()) body, @Request() req): Promise<any> {
    body.userId = req.userAccount.id;
    return await this.likeService.delete(body);
  }
}
