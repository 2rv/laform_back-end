import { FileUploadEntity } from './file-upload.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(FileUploadEntity)
export class FileUploadRepository extends Repository<FileUploadEntity> {}
