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
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(
    @GetUser() user: UserEntity,
    @Body(new ValidationPipe()) body: CommentDto,
  ) {
    return await this.commentService.create(body, user.id);
  }

  @Post('sub/create/')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async saveSub(
    @GetUser() user: UserEntity,
    @Body(new ValidationPipe()) body: SubCommentDto,
  ) {
    return await this.commentService.createSub(body, user.id);
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

  @Delete('delete/:id')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async delete(@GetUser() user: UserEntity, @Param('id') id: string) {
    return await this.commentService.delete(id, user.id);
  }

  @Delete('sub/delete/:id')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async deleteSub(@Param('id') id: string, @Body() body, @Request() req) {
    body.userId = req.user.id;
    return await this.commentService.deleteSub(id, body);
  }
}
