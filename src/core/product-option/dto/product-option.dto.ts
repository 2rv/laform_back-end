import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  IsOptional,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  Max,
} from 'class-validator';
import { FileDto } from 'src/core/file-upload/dto/file-dto';

export class ProductOptionDto {
  @IsOptional()
  @IsString()
  size: string;

  @IsOptional()
  @IsString()
  colorRu: string;

  @IsOptional()
  @IsString()
  colorEn: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  discount: number;

  @IsOptional()
  @IsArray()
  filesPdf: FileDto[];

  @IsOptional()
  @IsString()
  vendorCode: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  count: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  length: number;
}
