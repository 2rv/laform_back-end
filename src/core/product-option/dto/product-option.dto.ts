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
  colorRu: string;

  @IsOptional()
  @IsString()
  colorEn: string;

  @IsNotEmpty()
  @IsString()
  size: string;

  @IsNotEmpty()
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
  @ArrayMinSize(1)
  @ArrayMaxSize(1)
  filePdf: FileDto;

  @IsOptional()
  @IsString()
  vendorCode: string;
}
