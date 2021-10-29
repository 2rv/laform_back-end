import { FileUploadRepository } from './file-upload.repository';
import { uploadFile } from './../../common/utils/file-upload';
import { FILE_UPLOAD_ERROR } from './enum/file-upload-error.enum';
import { FileUploadEntity } from './file-upload.entity';
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FileUploadDto, FilesUploadDto } from './dto/file-upload.dto';
import { DeleteManyFilesDto } from './dto/delete-many-files';

@Injectable()
export class FileUploadService {
  constructor(private fileRepository: FileUploadRepository) {}

  async create(file: FileUploadDto): Promise<FileUploadEntity> {
    const fileUrl = await uploadFile(file);
    return await this.fileRepository.save({ fileUrl: fileUrl });
  }

  async createMany(files: FilesUploadDto[]): Promise<FileUploadEntity> {
    const uploadedFiles = [];
    for (let file of files) {
      const fileUrl = await uploadFile(file);
      uploadedFiles.push({ fileUrl: fileUrl });
    }
    const result = await this.fileRepository.insert(uploadedFiles);
    return result.raw;
  }

  async update(id: string, body) {
    const result = await this.fileRepository.update(id, body);
    return result;
  }

  async getOne(id: string): Promise<FileUploadEntity> {
    try {
      return await this.fileRepository.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(FILE_UPLOAD_ERROR.FILE_NOT_FOUND);
    }
  }

  async getAll(): Promise<FileUploadEntity[]> {
    return await this.fileRepository.find();
  }

  async delete(id: string): Promise<any> {
    const result = this.fileRepository.findOne(id);
    if (!result) {
      throw new BadRequestException(FILE_UPLOAD_ERROR.FILE_NOT_FOUND);
    } else return await this.fileRepository.delete(id);
  }

  async deleteMany(body: DeleteManyFilesDto) {
    const files = await this.fileRepository.findByIds(body.files);
    const result = files.map(({ id }) => id);
    if (result.length === 0) {
      throw new BadRequestException('FILES_ERROR.FILES_NOT_FOUND');
    } else {
      return await this.fileRepository.delete(result);
    }
  }
}
