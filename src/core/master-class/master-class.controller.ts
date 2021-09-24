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
import { GetAccount } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';

@Controller('master-class')
export class MasterClassController {
  constructor(private readonly masterClassService: MasterClassService) {}

  @Post('/create')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body(new ValidationPipe()) body: MasterClassDto) {
    return await this.masterClassService.save(body);
  }

  @Get('get/:masterClassId')
  @UseGuards(MasterClassGuard)
  async getOne(
    @Query(new LangValidationPipe()) query,
    @Param('masterClassId') masterClassId: string,
  ) {
    return await this.masterClassService.getOne(masterClassId, query);
  }

  @Get('get/auth/:masterClassId')
  @UseGuards(AuthGuard('jwt'), AccountGuard, MasterClassGuard)
  async getOneAuth(
    @Query(new LangValidationPipe()) query,
    @Param('masterClassId') masterClassId: string,
    @GetAccount() user: UserEntity,
  ) {
    return await this.masterClassService.getOneAuth(
      masterClassId,
      query,
      user.id,
    );
  }

  @Get('get-all')
  async getAll(
    @Query(new LangValidationPipe()) query: string,
    @Query('size') size: number,
    @Query('page') page: number,
  ) {
    return await this.masterClassService.getAll(query, size, page);
  }

  @Get('get-all/authtorized')
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAllAuth(
    @Query(new LangValidationPipe()) query: string,
    @Query('size') size: number,
    @Query('page') page: number,
    @GetAccount() user: UserEntity,
  ) {
    return await this.masterClassService.getAllAuth(query, size, page, user.id);
  }

  @Get('pinned/get/')
  async getPinned(@Query(new LangValidationPipe()) query: string) {
    return await this.masterClassService.getPinned(query);
  }

  @Get('pinned/get/auth')
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getPinnedAuth(
    @Query(new LangValidationPipe()) query: string,
    @GetAccount() user: UserEntity,
  ) {
    return await this.masterClassService.getPinnedAuth(query, user.id);
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

  @Get('liked')
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getLiked(
    @Query(new LangValidationPipe()) query: string,
    @GetAccount() user: UserEntity,
  ) {
    return await this.masterClassService.getLiked(user.id, query);
  }
}
