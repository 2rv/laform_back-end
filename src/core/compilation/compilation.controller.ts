import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
  Get,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { CompilationService } from './compilation.service';
import { CompilationDto } from './dto/compilation.dto';
import { UserEntity } from '../user/user.entity';
import { GetAccount } from '../user/decorator/get-account.decorator';

@Controller('compilation')
export class CompilationController {
  constructor(private compilationService: CompilationService) {}

  @Post('/create/')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async create(@Body(new ValidationPipe()) body: CompilationDto) {
    return await this.compilationService.create(body);
  }

  @Get('/get')
  async getAll() {
    return await this.compilationService.get();
  }

  @Get('/auth/get')
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAllAuth(@GetAccount() user: UserEntity) {
    return await this.compilationService.getAuth(user.id);
  }

  @Delete('/delete/:compilationId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async delete(@Param('compilationId') id: string) {
    return await this.compilationService.delete(id);
  }
}
