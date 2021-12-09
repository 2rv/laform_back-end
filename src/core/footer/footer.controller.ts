import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
  Get,
  Delete,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { FooterEntity } from './footer.entity';
import { FooterService } from './footer.service';
import { FooterDto } from './dto/footer.dto';

@Controller('footer')
export class FooterController {
  constructor(private readonly footerService: FooterService) {}

  @Post('/save')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(
    @Body(new ValidationPipe()) body: FooterDto,
  ): Promise<FooterEntity> {
    return await this.footerService.createOrUpate(body);
  }

  @Get('get/:id')
  async getOne(@Param('id') id: string): Promise<FooterEntity> {
    return await this.footerService.getOne(id);
  }

  @Get('get/')
  async getAll(): Promise<FooterEntity[]> {
    return await this.footerService.getAll();
  }

  @Patch('update/:id')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async update(@Param('id') id: string, @Body() body: FooterDto) {
    return await this.footerService.update(id, body);
  }

  @Delete('delete/:id')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async delete(@Param('id') id: string) {
    return await this.footerService.delete(id);
  }
}
