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
  Request,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { Roles } from '../user/decorator/role.decorator';
import { LangValidationPipe } from '../../common/guards/lang.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postRepository: PostService) {}

  @Post('/create')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body(new ValidationPipe()) body: PostDto) {
    return await this.postRepository.create(body);
  }

  @Get('get/:postId')
  @UseGuards(PostGuard)
  async getOne(
    @Query(new LangValidationPipe()) query: string,
    @Param('postId') id: string,
  ) {
    return await this.postRepository.getOne(id, query);
  }

  @Get('get/')
  async getAll(
    @Query(new LangValidationPipe()) query: string,
    @Query('size') size: number,
    @Query('page') page: number,
    //@Query('sort') sort: string,
    //@Query('by') by: string,
  ) {
    return await this.postRepository.getAll(query, size, page);
  }

  @Get('best/get/')
  async getBest(@Query(new LangValidationPipe()) query: string) {
    return await this.postRepository.getBest(query);
  }

  @Get('pinned/get/')
  async getPinned(@Query(new LangValidationPipe()) query: string) {
    return await this.postRepository.getPinned(query);
  }

  @Put('update/:postId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, PostGuard)
  async update(@Param('postId') id: string, @Body() body: any) {
    return await this.postRepository.update(id, body);
  }

  @Delete('delete/:postId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, PostGuard)
  async delete(@Param('postId') id: string) {
    return await this.postRepository.delete(id);
  }
}
