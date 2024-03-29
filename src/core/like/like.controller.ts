import { UserEntity } from './../user/user.entity';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  Get,
  Delete,
  Query,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { GetUser } from '../user/decorator/get-account.decorator';
import { LikeDto } from './dto/like.dto';
import { LangValidationPipe } from 'src/common/guards/lang.guard';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('/create')
  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(
    @GetUser() user: UserEntity,
    @Body(new ValidationPipe()) body: LikeDto,
  ) {
    return await this.likeService.create(body, user.id);
  }

  @Get('/get/')
  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getLikes(
    @Query(new LangValidationPipe()) query: string,
    @GetUser() user: UserEntity,
  ): Promise<any> {
    return await this.likeService.getUserLikes(user.id, query);
  }

  @Delete('/delete')
  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async delete(
    @GetUser() user: UserEntity,
    @Body(new ValidationPipe()) body: LikeDto,
  ): Promise<any> {
    return await this.likeService.delete(body, user.id);
  }
}
