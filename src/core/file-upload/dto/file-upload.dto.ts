import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class FileUploadDto {
  @IsNotEmpty()
  @IsString()
  fileUrl: string;
}
