import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Response,
  UseGuards,
  ValidationPipe,
  Get,
  Put,
  Query,
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
    try {
      const singleUpload = upload.single('fileUrl');
      await singleUpload(req, res, async (err) => {
        if (err) {
          return res.status(422).send({
            errors: [{ title: 'File Upload Error', detail: err.message }],
          });
        }
        body.fileUrl = req.file.location;
        const result = await this.fileUploadService.create(body);
        console.log(result);
        return res.status(HttpStatus.CREATED).send(result);
      });
    } catch (e) {
      Logger.log(e);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
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
    try {
      const singleUpload = upload.single('fileUrl');
      await singleUpload(req, res, async (err) => {
        if (err) {
          return res.status(422).send({
            errors: [{ title: 'File Upload Error', detail: err.message }],
          });
        }
        console.log(body);
        body.fileUrl = req.file.location;
        const result = await this.fileUploadService.update(id, body);
        return res.status(HttpStatus.OK).send(result);
      });
    } catch (error) {
      Logger.log(error);
      return false;
    }
  }

  @Get('get/:id')
  async getOne(@Param('id') id: string, @Response() res) {
    try {
      const result = await this.fileUploadService.getOne(id);
      return res.status(HttpStatus.OK).send(result);
    } catch (error) {
      Logger.log(error);
    }
  }

  @Get('get/')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAll(@Response() res) {
    try {
      const result = await this.fileUploadService.getAll();
      return res.status(HttpStatus.OK).send(result);
    } catch (error) {
      Logger.log(error);
    }
  }

  @Delete('delete/:id')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async delete(@Param('id') id: string, @Response() res) {
    try {
      const result = await this.fileUploadService.delete(id);
      return res.status(HttpStatus.OK).send(result);
    } catch (error) {
      Logger.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
