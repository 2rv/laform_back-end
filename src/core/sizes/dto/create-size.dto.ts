import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  IsOptional,
  IsArray,
  MinLength,
} from 'class-validator';
import { FileDto } from 'src/core/file-upload/dto/file-dto';

export class CreateSizeDto {
  @IsNotEmpty()
  @IsString()
  size: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  vendorCode: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  count: number;

  @IsOptional()
  @IsArray()
  @MinLength(1)
  filePdf: FileDto;
}
