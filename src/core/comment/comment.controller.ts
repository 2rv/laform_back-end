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
import { GetUser } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/create')
  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(
    @GetUser() user: UserEntity,
    @Body(new ValidationPipe()) body: CommentDto,
  ) {
    return await this.commentService.create(body, user.id);
  }

  @Delete('delete/:id')
  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async delete(@Param('id') id: string) {
    return await this.commentService.delete(id);
  }

  @Post('sub/create/')
  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async saveSub(
    @GetUser() user: UserEntity,
    @Body(new ValidationPipe()) body: SubCommentDto,
  ) {
    return await this.commentService.createSub(body, user.id);
  }

  @Delete('sub/delete/:id')
  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async deleteSub(@Param('id') id: string) {
    return await this.commentService.deleteSub(id);
  }

  @Get('get/master-class/:id')
  async getMasterClassComment(
    @Param('id') id: string,
  ): Promise<CommentEntity[]> {
    return await this.commentService.getMasterClassComment(id);
  }

  @Get('get/pattern-product/:id')
  async getPatternProductComment(
    @Param('id') id: string,
  ): Promise<CommentEntity[]> {
    return await this.commentService.getPatternProductComment(id);
  }

  @Get('get/post/:id')
  async getPostComment(@Param('id') id: string): Promise<CommentEntity[]> {
    return await this.commentService.getPostComment(id);
  }
  @Get('get/sewing-product/:id')
  async getSewingProductComment(
    @Param('id') id: string,
  ): Promise<CommentEntity[]> {
    return await this.commentService.getSewingProductComment(id);
  }

  @Patch('update/:id')
  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async update(@Param('id') id: string, @Body() body, @Request() req) {
    body.userId = req.user.id;
    return await this.commentService.update(id, body);
  }

  @Patch('sub/update/:id')
  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async updateSub(@Param('id') id: string, @Body() body, @Request() req) {
    body.userId = req.user.id;
    return await this.commentService.updateSub(id, body);
  }

  @Get('get')
  @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAll(@GetUser() user: UserEntity): Promise<CommentEntity[]> {
    return await this.commentService.getAllUserComments(user.id);
  }

  @Get('get/:id')
  async getOne(@Param('id') id: string): Promise<CommentEntity> {
    return await this.commentService.getOne(id);
  }
}
