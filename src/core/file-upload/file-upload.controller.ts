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
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
  Res,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { DeleteManyFilesDto } from './dto/delete-many-files';
import { Duplex } from 'stream';

@Controller('file')
export class FileUploadController {
  constructor(private fileUploadService: FileUploadService) {}

  @Post('/create')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  @UseInterceptors(FileInterceptor('file'))
  async save(@UploadedFile() file, @Response() res): Promise<any> {
    const result = await this.fileUploadService.create(file);
    return res.send(result);
  }

  @Post('/create-many')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async saveMany(@UploadedFiles() files, @Response() res): Promise<any> {
    const result = await this.fileUploadService.createMany(files);
    return res.send(result);
  }

  @Put('update/:id')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  @UseInterceptors(FileInterceptor('file'))
  async update(@Param('id') id: string, @UploadedFile() file, @Response() res) {
    const result = await this.fileUploadService.update(id, file);
    return res.send(result);
  }

  @Get('get/:id')
  async getOne(@Param('id') id: string) {
    return await this.fileUploadService.getOne(id);
  }

  @Get('browser/get/:id')
  async getInBrowser(@Param('id') id: string, @Res() res) {
    // const stream = Readable.from(
    //   await this.fileUploadService.getFileInBrowser(id),
    // );
    // это создавало поток но для axios или постман
    // Кароче вообще нужно что бы файл открывался прям по ссылке из браузера
    //localhost:4000/file/browser/get
    let stream = new Duplex();
    const { result, fileType } = await this.fileUploadService.getFileInBrowser(
      id,
    );
    stream.push(result);
    stream.push(null);
    if (
      fileType === 'ZIP' ||
      fileType === 'zip' ||
      fileType === 'pdf' ||
      fileType === 'PDF'
    ) {
      res.header('Content-type', 'application/' + fileType); // если пдф
    }

    return stream.pipe(res);
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

  @Delete('delete-many')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async deleteMany(@Body(new ValidationPipe()) body: DeleteManyFilesDto) {
    return await this.fileUploadService.deleteMany(body);
  }
}
