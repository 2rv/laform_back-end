import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  Min,
  Max,
  ArrayNotEmpty,
  ArrayMinSize,
  ArrayMaxSize,
  IsBoolean,
} from 'class-validator';
import { CategoryDto } from 'src/core/category/dto/category.dto';
import { CreateColorDto } from 'src/core/colors/dto/create-color.dto';
import { FileDto } from 'src/core/file-upload/dto/file-dto';
import { CreateSizeDto } from 'src/core/sizes/dto/create-size.dto';

export class SewingProductDto {
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
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  categories: [CategoryDto];

  @ArrayNotEmpty()
  @IsArray()
  sizes: [CreateSizeDto];

  @ArrayNotEmpty()
  @IsArray()
  colors: [CreateColorDto];

  @ArrayNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(6)
  images: [FileDto];

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
  @Min(3)
  @Max(3)
  type: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  count: number;

  @IsOptional()
  @IsBoolean()
  deleted: boolean;
}
