import { FILE_UPLOAD_ERROR } from './enum/file-upload-error.enum';
import { Repository } from 'typeorm';
import { FileUploadEntity } from './file-upload.entity';
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FileUploadDto } from './dto/file-upload.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(FileUploadEntity)
    private fileRepository: Repository<FileUploadEntity>,
  ) {}

  async create(body: FileUploadDto): Promise<FileUploadEntity> {
    return await this.fileRepository.save(body);
  }

  async update(id: string, body: any) {
    const result = await this.fileRepository.findOneOrFail(id);
    if (!result) {
      throw new BadRequestException(FILE_UPLOAD_ERROR.FILE_NOT_FOUND);
    } else await this.fileRepository.update(id, body);
    return this.fileRepository.findOne(id);
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
