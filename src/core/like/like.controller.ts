import { UserEntity } from './../user/user.entity';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { GetUser } from '../user/decorator/get-account.decorator';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('/create')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@GetUser() user: UserEntity, @Body(new ValidationPipe()) body) {
    return await this.likeService.create(body, user.id);
  }

  @Get('/get/')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getPosts(@GetUser() user: UserEntity): Promise<any> {
    return await this.likeService.getPosts(user.id);
  }

  @Post('/delete')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async delete(
    @GetUser() user: UserEntity,
    @Body(new ValidationPipe()) body,
  ): Promise<any> {
    console.log(user.id);
    return await this.likeService.delete(body, user.id);
  }
}
