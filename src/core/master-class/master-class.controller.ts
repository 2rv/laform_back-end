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
import { LangType } from 'src/common/enum/lang.enum';

@Controller('master-class')
export class MasterClassController {
  constructor(private readonly masterClassService: MasterClassService) {}

  @Get('/get/')
  async getAll(
    @Query(new LangValidationPipe()) lang: LangType,
    @Query('size') size: number = 30,
    @Query('page') page: number = 1,
    @Query('by') by: 'DESC' | 'ASC' = 'DESC',
    @Query('sort') sort: string,
    @Query('where') where: string,
    @Query('category') category: string,
    @Query('getAll') getAll: boolean,
  ) {
    return await this.masterClassService.getAll({
      lang,
      size,
      page,
      sort,
      by,
      where,
      category,
      getAll,
    });
  }

  @Get('/auth/get/')
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAllAuth(
    @Query(new LangValidationPipe()) lang: LangType,
    @Query('size') size: number = 30,
    @Query('page') page: number = 1,
    @Query('by') by: 'DESC' | 'ASC' = 'DESC',
    @Query('sort') sort: string,
    @Query('where') where: string,
    @Query('category') category: string,
    @GetAccount() user: UserEntity,
  ) {
    return await this.masterClassService.getAll({
      lang,
      size,
      page,
      sort,
      by,
      where,
      category,
      userId: user.id,
    });
  }

  @Get('/get/:masterClassId')
  @UseGuards(MasterClassGuard)
  async getOne(@Param('masterClassId') id: string) {
    return await this.masterClassService.getOne({
      id,
    });
  }
  @Get('/auth/get/:masterClassId')
  @UseGuards(AuthGuard('jwt'), AccountGuard, MasterClassGuard)
  async getOneAuth(
    @Param('masterClassId') id: string,
    @GetAccount() user: UserEntity,
  ) {
    return await this.masterClassService.getOne({
      id,
      userId: user.id,
    });
  }

  @Get('/liked/get/')
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getLiked(
    @Query(new LangValidationPipe()) lang: LangType,
    @Query('size') size: number = 30,
    @Query('page') page: number = 1,
    @Query('by') by: 'DESC' | 'ASC' = 'DESC',
    @Query('sort') sort: string,
    @Query('where') where: string,
    @Query('category') category: string,
    @GetAccount() user: UserEntity,
  ) {
    return await this.masterClassService.getLiked({
      lang,
      size,
      page,
      sort,
      by,
      where,
      category,
      userId: user.id,
    });
  }

  @Get('/get/for-update/:masterClassId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, MasterClassGuard)
  async getOneForAdmin(@Param('masterClassId') id: string) {
    return await this.masterClassService.getOneForAdmin(id);
  }

  @Post('/create/')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body(new ValidationPipe()) body: MasterClassDto) {
    return await this.masterClassService.save(body);
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
}
