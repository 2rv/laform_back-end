import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class FileUploadDto {}

export class FilesUploadDto {
  @IsNotEmpty()
  @IsArray()
  files: [];
}
