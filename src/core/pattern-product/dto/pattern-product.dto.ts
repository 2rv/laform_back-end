import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  IsObject,
  Min,
  Max,
  ArrayNotEmpty,
  ArrayMinSize,
  ArrayMaxSize,
  IsBoolean,
} from 'class-validator';
import { CategoryDto } from 'src/core/category/dto/category.dto';
import { FileDto } from 'src/core/file-upload/dto/file-dto';
import { CreateSizeDto } from 'src/core/sizes/dto/create-size.dto';

export class PatternProductDto {
  @IsNotEmpty()
  @IsString()
  titleRu: string;

  @IsNotEmpty()
  @IsString()
  descriptionRu: string;

  @IsOptional()
  @IsString()
  titleEn: string;

  @IsOptional()
  @IsString()
  descriptionEn: string;

  @ArrayNotEmpty()
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(5)
  categories: [CategoryDto];

  @IsOptional()
  @IsArray()
  sizes: [CreateSizeDto];

  @ArrayNotEmpty()
  @IsArray()
  images: [FileDto];

  filePdf: FileDto;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  discount: number;

  @IsOptional()
  @IsString()
  modifier: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(2)
  type: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  complexity: number;

  @IsNotEmpty()
  @IsObject()
  materialRu: {
    blocks: [];
    time: number;
    version: string;
  };

  @IsOptional()
  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsBoolean()
  deleted: boolean;
}
