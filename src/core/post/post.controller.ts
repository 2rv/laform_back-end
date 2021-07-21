import { PostDto } from './dto/post.dto';
import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Response,
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

@Controller('post')
export class PostController {
  constructor(private readonly postRepository: PostService) {}

  @Post('/create')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body(new ValidationPipe()) body: PostDto) {
    return await this.postRepository.create(body);
  }

  @Get('get/:id')
  async getOne(@Query('lang') query: string, @Param('id') id: string) {
    return await this.postRepository.getOne(id, query);
  }

  @Get('get/')
  async getAll(
    @Query('lang') query: string,
    @Query('size') size: number,
    @Query('page') page: number,
    @Query('sort') sort: string,
    @Query('by') by: string,
  ) {
    return await this.postRepository.getAll(query, size, page, sort, by);
  }

  @Get('best/get/')
  async getBest(@Query('lang') query: string) {
    return await this.postRepository.getBest(query);
  }

  @Get('pinned/get/')
  async getPinned(@Query('lang') query: string) {
    return await this.postRepository.getPinned(query);
  }

  @Put('update/:id')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async update(@Param('id') id: string, @Body() body: any, @Response() res) {
    return await this.postRepository.update(id, body);
  }

  @Delete('delete/:id')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async delete(@Param('id') id: string) {
    return await this.postRepository.delete(id);
  }
}
