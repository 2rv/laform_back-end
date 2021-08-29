import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  IsObject,
} from 'class-validator';
import { CategoryDto } from 'src/core/category/dto/category.dto';
import { CreateColorDto } from 'src/core/colors/dto/create-color.dto';
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

  @IsNotEmpty()
  @IsArray()
  categories: [CategoryDto];

  @IsNotEmpty()
  @IsArray()
  sizes: [CreateSizeDto];

  @IsNotEmpty()
  @IsArray()
  colors: [CreateColorDto];

  @IsNotEmpty()
  @IsArray()
  images: [];

  @IsNotEmpty()
  @IsNumber()
  discount: number;

  @IsOptional()
  @IsString()
  modifier: string;

  @IsNotEmpty()
  @IsObject()
  type: { id: number; tid: string };

  @IsNotEmpty()
  @IsNumber()
  count: number;
}
