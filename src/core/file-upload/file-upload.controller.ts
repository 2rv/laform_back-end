import {
  Body,
  Controller,
  Param,
  Post,
  Response,
  UseGuards,
  ValidationPipe,
  Get,
  Put,
  Delete,
  Request,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { upload } from '../../common/utils/upload-image';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';

@Controller('file')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('/create')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(
    @Body(new ValidationPipe()) body: any,
    @Response() res,
    @Request() req,
  ) {
    const singleUpload = upload.single('fileUrl');
    await singleUpload(req, res, async (err) => {
      if (err) {
        return res.status(422).send({
          errors: [{ title: 'File Upload Error', detail: err.message }],
        });
      }
      body.fileUrl = req.file.location;
      return await this.fileUploadService.create(body);
    });
  }

  @Put('update/:id')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async updateImage(
    @Param('id') id: string,
    @Body() body: any,
    @Response() res,
    @Request() req,
  ) {
    const singleUpload = upload.single('fileUrl');
    await singleUpload(req, res, async (err) => {
      if (err) {
        return res.status(422).send({
          errors: [{ title: 'File Upload Error', detail: err.message }],
        });
      }
      body.fileUrl = req.file.location;
      return await this.fileUploadService.update(id, body);
    });
  }

  @Get('get/:id')
  async getOne(@Param('id') id: string) {
    return await this.fileUploadService.getOne(id);
  }

  @Get('get/')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAll() {
    return await this.fileUploadService.getAll();
  }

  @Delete('delete/:id')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async delete(@Param('id') id: string) {
    return await this.fileUploadService.delete(id);
  }
}
