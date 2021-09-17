import {
  Body,
  Controller,
  Param,
  UseGuards,
  ValidationPipe,
  Get,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { SizesService } from './sizes.service';
import { DeleteManySizesDto } from './dto/delete-many-sizes.dto';

@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @Get('get/')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAll() {
    return await this.sizesService.getAll();
  }

  @Delete('delete/:id')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async delete(@Param('id') id: string) {
    return await this.sizesService.delete(id);
  }

  @Delete('delete-many')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async deleteMany(@Body(new ValidationPipe()) body: DeleteManySizesDto) {
    return await this.sizesService.deleteMany(body);
  }
}
