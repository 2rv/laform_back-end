import { FileUploadRepository } from './file-upload.repository';
import { uploadFile } from './../../common/utils/file-upload';
import { FILE_UPLOAD_ERROR } from './enum/file-upload-error.enum';
import { Repository } from 'typeorm';
import { FileUploadEntity } from './file-upload.entity';
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FileUploadDto } from './dto/file-upload.dto';

@Injectable()
export class FileUploadService {
  constructor(private fileRepository: FileUploadRepository) {}

  async create(file: FileUploadDto): Promise<FileUploadEntity> {
    const fileUrl = await uploadFile(file);
    return await this.fileRepository.save({ fileUrl: fileUrl });
  }

  async update(id: string, body) {
    return await this.fileRepository.update(id, body);
  }

  async getAllMasterClasses(id): Promise<FileUploadEntity[]> {
    return await this.fileRepository.find({
      where: {
        masterClassId: id,
      },
    });
  }

  async getAllPatternProducts(id): Promise<FileUploadEntity[]> {
    return await this.fileRepository.find({
      where: {
        patternProductId: id,
      },
    });
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

  async delete(id: string): Promise<void> {
    const result = this.fileRepository.findOne(id);
    if (!result) {
      throw new BadRequestException(FILE_UPLOAD_ERROR.FILE_NOT_FOUND);
    } else await this.fileRepository.delete(id);
  }
}
