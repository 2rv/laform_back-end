import {
  Body,
  Controller,
  Param,
  Post,
  Response,
  UseGuards,
  ValidationPipe,
  Get,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { ProgramsService } from './programs.service';
import { DeleteManyProgramsDto } from './dto/delete-many-programs.dto';

@Controller('programs')
export class ProgramsController {
  constructor(private programsService: ProgramsService) {}

  @Get('get/')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAll() {
    return await this.programsService.getAll();
  }

  @Delete('delete/:id')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async delete(@Param('id') id: string) {
    return await this.programsService.delete(id);
  }

  @Delete('delete-many')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async deleteMany(@Body(new ValidationPipe()) body: DeleteManyProgramsDto) {
    return await this.programsService.deleteMany(body);
  }
}
