import { PostGuard } from './guard/post.guard';
import { PostDto } from './dto/post.dto';
import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
  Get,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { Roles } from '../user/decorator/role.decorator';
import { LangValidationPipe } from '../../common/guards/lang.guard';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('/create')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body(new ValidationPipe()) body: PostDto) {
    return await this.postService.create(body);
  }

  @Get('get/:postId')
  @UseGuards(PostGuard)
  async getOne(
    @Query(new LangValidationPipe()) query: string,
    @Param('postId') id: string,
  ) {
    return await this.postService.getOne(id, query);
  }

  @Get('get/auth/:postId')
  @UseGuards(AuthGuard('jwt'), AccountGuard, PostGuard)
  async getOneAuth(
    @Query(new LangValidationPipe()) query: string,
    @Param('postId') id: string,
    @GetAccount() user: UserEntity,
  ) {
    return await this.postService.getOneAuth(id, query, user.id);
  }

  @Get('get/')
  async getAll(
    @Query(new LangValidationPipe()) query: string,
    @Query('size') size: number,
    @Query('page') page: number,
  ) {
    return await this.postService.getAll(query, size, page);
  }

  @Get('get/auth')
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAllAuth(
    @Query(new LangValidationPipe()) query: string,
    @Query('size') size: number,
    @Query('page') page: number,
    @GetAccount() user: UserEntity,
    //@Query('sort') sort: string,
    //@Query('by') by: string,
  ) {
    return await this.postService.getAllAuth(query, size, page, user.id);
  }

  @Get('pinned/get/')
  async getPinned(@Query(new LangValidationPipe()) query: string) {
    return await this.postService.getPinned(query);
  }

  @Get('pinned/get/auth')
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getPinnedAuth(
    @Query(new LangValidationPipe()) query: string,
    @GetAccount() user: UserEntity,
  ) {
    return await this.postService.getPinnedAuth(query, user.id);
  }

  @Put('update/:postId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, PostGuard)
  async update(@Param('postId') id: string, @Body() body: any) {
    return await this.postService.update(id, body);
  }

  @Delete('delete/:postId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, PostGuard)
  async delete(@Param('postId') id: string) {
    return await this.postService.delete(id);
  }
}
