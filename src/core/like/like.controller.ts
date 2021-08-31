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
<<<<<<< HEAD
  async save(@GetUser() user: UserEntity, @Body(new ValidationPipe()) body) {
    return await this.likeService.create(body, user.id);
=======
  async save(@Body(new ValidationPipe()) body, @Request() req) {
    body.userId = req.user.id;
    return await this.likeService.create(body);
>>>>>>> 5216ac6f7961b11cfc717e81f6f3ff80e8f84cac
  }

  @Get('/get/')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
<<<<<<< HEAD
  async getPosts(@GetUser() user: UserEntity): Promise<any> {
    return await this.likeService.getPosts(user.id);
=======
  async getPosts(
    @Body(new ValidationPipe()) body: any,
    @Request() req,
  ): Promise<any> {
    body.userId = req.user.id;
    return await this.likeService.getPosts(body);
>>>>>>> 5216ac6f7961b11cfc717e81f6f3ff80e8f84cac
  }

  @Post('/delete')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
<<<<<<< HEAD
  async delete(
    @GetUser() user: UserEntity,
    @Body(new ValidationPipe()) body,
  ): Promise<any> {
    console.log(user.id);
    return await this.likeService.delete(body, user.id);
=======
  async delete(@Body(new ValidationPipe()) body, @Request() req): Promise<any> {
    body.userId = req.user.id;
    return await this.likeService.delete(body);
>>>>>>> 5216ac6f7961b11cfc717e81f6f3ff80e8f84cac
  }
}
