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
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { MasterClassService } from './master-class.service';
import { MasterClassGuard } from './guard/master-class.guard';
import { LangValidationPipe } from 'src/common/guards/lang.guard';
import { MasterClassDto } from './dto/master-class.dto';
import { UpdateMasterClassDto } from './dto/update-master-class.dto';
import { GetUser } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';

@Controller('master-class')
export class MasterClassController {
  constructor(private readonly masterClassService: MasterClassService) {}

  @Post('/create')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body(new ValidationPipe()) body: MasterClassDto) {
    return await this.masterClassService.create(body);
  }

  @Get('get/:masterClassId')
  @UseGuards(MasterClassGuard)
  async getOne(
    @Query(new LangValidationPipe()) query,
    @Param('masterClassId') masterClassId: string,
  ) {
    return await this.masterClassService.getOne(masterClassId, query);
  }

  @Get('get/')
  async getAll(
    @Query(new LangValidationPipe()) query: string,
    @Query('size') size: number,
    @Query('page') page: number,
  ) {
    return await this.masterClassService.getAll(query, size, page);
  }

  @Get('auth/get/')
  @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAllAuth(
    @GetUser() user: UserEntity,
    @Query(new LangValidationPipe()) query: string,
    @Query('size') size: number,
    @Query('page') page: number,
  ) {
    return await this.masterClassService.getAllAuth(query, size, page, user.id);
  }

  @Get('pinned/get/')
  async getPinned(@Query(new LangValidationPipe()) query: string) {
    return await this.masterClassService.getPinned(query);
  }

  @Put('update/:masterClassId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, MasterClassGuard)
  async update(
    @Param('masterClassId') masterClassId: string,
    @Body() body: UpdateMasterClassDto,
  ) {
    return await this.masterClassService.update(masterClassId, body);
  }

  @Delete('delete/:masterClassId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, MasterClassGuard)
  async delete(@Param('masterClassId') masterClassId: string) {
    return await this.masterClassService.delete(masterClassId);
  }
}
