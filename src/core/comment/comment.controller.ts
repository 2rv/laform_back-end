import { SubCommentDto } from './dto/sub-comment.dto';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
  Get,
  Query,
  Request,
  Delete,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { CommentEntity } from './comment.entity';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/create')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body(new ValidationPipe()) body: CommentDto, @Request() req) {
    body.userId = req.user.id;
    return await this.commentService.create(body);
  }

  @Post('sub/create/')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async saveSub(
    @Body(new ValidationPipe()) body: SubCommentDto,
    @Request() req,
  ) {
    body.userId = req.user.id;
    return await this.commentService.createSub(body);
  }

  @Patch('update/:id')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async update(@Param('id') id: string, @Body() body, @Request() req) {
    body.userId = req.user.id;
    return await this.commentService.update(id, body);
  }

  @Patch('sub/update/:id')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async updateSub(@Param('id') id: string, @Body() body, @Request() req) {
    body.userId = req.user.id;
    return await this.commentService.updateSub(id, body);
  }

  @Get('get/post/:postId')
  async getAll(@Param('postId') postId: string): Promise<any[]> {
    return await this.commentService.getAll(postId);
  }

  @Get('get/:id')
  async getOne(@Param('id') id: string): Promise<CommentEntity> {
    return await this.commentService.getOne(id);
  }

  @Delete('delete/:id')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async delete(@Param('id') id: string, @Body() body, @Request() req) {
    body.userId = req.user.id;
    return await this.commentService.delete(id, body);
  }

  @Delete('sub/delete/:id')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async deleteSub(@Param('id') id: string, @Body() body, @Request() req) {
    body.userId = req.user.id;
    return await this.commentService.deleteSub(id, body);
  }
}
