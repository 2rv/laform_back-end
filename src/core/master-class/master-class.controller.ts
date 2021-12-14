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
import { GetAccount } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';

@Controller('master-class')
export class MasterClassController {
  constructor(private readonly masterClassService: MasterClassService) {}

  @Post('/create/')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body(new ValidationPipe()) body: MasterClassDto) {
    return await this.masterClassService.save(body);
  }

  @Get('/get/')
  async getAll(
    @Query(new LangValidationPipe()) query: string,
    @Query('size') size: number,
    @Query('sort') sort: string,
    @Query('page') page: number,
    @Query('by') by: 'DESC' | 'ASC',
    @Query('where') where: string,
    @Query('category') category: string,
    @Query('getAll') getAll: boolean,
  ) {
    return await this.masterClassService.getAll(
      query,
      size,
      page,
      sort,
      by,
      where,
      category,
      getAll,
    );
  }

  @Get('/auth/get/')
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAllAuth(
    @Query(new LangValidationPipe()) query: string,
    @Query('size') size: number,
    @Query('sort') sort: string,
    @Query('page') page: number,
    @Query('by') by: 'DESC' | 'ASC',
    @Query('where') where: string,
    @Query('category') category: string,
    @GetAccount() user: UserEntity,
  ) {
    return await this.masterClassService.getAllAuth(
      query,
      size,
      page,
      sort,
      by,
      where,
      category,
      user.id,
    );
  }

  @Get('/get/:masterClassId')
  @UseGuards(MasterClassGuard)
  async getOne(
    @Query(new LangValidationPipe()) query,
    @Param('masterClassId') masterClassId: string,
  ) {
    return await this.masterClassService.getOne(masterClassId, query);
  }
  @Get('/auth/get/:masterClassId')
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

  @Get('/liked/get/')
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getLiked(
    @Query(new LangValidationPipe()) query: string,
    @Query('size') size: number,
    @Query('page') page: number,
    @GetAccount() user: UserEntity,
  ) {
    return await this.masterClassService.getLiked(user.id, query, size, page);
  }

  @Put('/update/:masterClassId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, MasterClassGuard)
  async update(
    @Param('masterClassId') masterClassId: string,
    @Body() body: MasterClassDto,
  ) {
    return await this.masterClassService.update(masterClassId, body);
  }

  @Delete('/delete/:masterClassId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, MasterClassGuard)
  async delete(@Param('masterClassId') masterClassId: string) {
    return await this.masterClassService.delete(masterClassId);
  }

  @Put('/disable/:masterClassId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, MasterClassGuard)
  async disable(
    @Param('masterClassId') masterClassId: string,
    @Body() body: { deleted: boolean },
  ) {
    return await this.masterClassService.disable(masterClassId, body.deleted);
  }

  @Get('/get/for-update/:masterClassId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, MasterClassGuard)
  async getOneForAdmin(
    @Query(new LangValidationPipe()) query,
    @Param('masterClassId') masterClassId: string,
  ) {
    return await this.masterClassService.getOneForAdmin(masterClassId, query);
  }
}
