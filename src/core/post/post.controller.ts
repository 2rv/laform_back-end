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
import { LangType } from 'src/common/enum/lang.enum';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/get/')
  async getAll(
    @Query(new LangValidationPipe()) lang: LangType,
    @Query('size') size: number = 30,
    @Query('page') page: number = 1,
    @Query('by') by: 'DESC' | 'ASC' = 'DESC',
    @Query('sort') sort: string,
    @Query('where') where: string,
    @Query('category') category: string,
    @Query('getAll') getAll: boolean,
  ) {
    return await this.postService.getAll({
      lang,
      size,
      page,
      sort,
      by,
      where,
      category,
      getAll,
    });
  }

  @Get('/auth/get/')
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAllAuth(
    @Query(new LangValidationPipe()) lang: LangType,
    @Query('size') size: number = 30,
    @Query('page') page: number = 1,
    @Query('by') by: 'DESC' | 'ASC' = 'DESC',
    @Query('sort') sort: string,
    @Query('where') where: string,
    @Query('category') category: string,
    @GetAccount() user: UserEntity,
  ) {
    return await this.postService.getAll({
      lang,
      size,
      page,
      sort,
      by,
      where,
      category,
      userId: user.id,
    });
  }

  @Get('/get/:postId')
  @UseGuards(PostGuard)
  async getOne(@Param('postId') id: string) {
    return await this.postService.getOne({ id });
  }

  @Get('/auth/get/:postId')
  @UseGuards(AuthGuard('jwt'), AccountGuard, PostGuard)
  async getOneAuth(
    @Param('postId') id: string,
    @GetAccount() user: UserEntity,
  ) {
    return await this.postService.getOne({
      id,
      userId: user.id,
    });
  }

  @Get('/liked/get/')
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getLiked(
    @Query(new LangValidationPipe()) lang: LangType,
    @Query('size') size: number = 30,
    @Query('page') page: number = 1,
    @Query('by') by: 'DESC' | 'ASC' = 'DESC',
    @Query('sort') sort: string,
    @Query('where') where: string,
    @Query('category') category: string,
    @GetAccount() user: UserEntity,
  ) {
    return await this.postService.getLiked({
      lang,
      size,
      page,
      sort,
      by,
      where,
      category,
      userId: user.id,
    });
  }

  @Post('/create/')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body(new ValidationPipe()) body: PostDto) {
    return await this.postService.create(body);
  }
  @Put('/update/:postId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, PostGuard)
  async update(@Param('postId') id: string, @Body() body: PostDto) {
    return await this.postService.update(id, body);
  }
  @Delete('/delete/:postId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, PostGuard)
  async delete(@Param('postId') id: string) {
    return await this.postService.delete(id);
  }
  @Put('/disable/:postId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, PostGuard)
  async disable(
    @Param('postId') id: string,
    @Body() body: { deleted: boolean },
  ) {
    return await this.postService.disable(id, body.deleted);
  }
}
