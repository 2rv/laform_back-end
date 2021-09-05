import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  IsObject,
} from 'class-validator';
import { CategoryDto } from 'src/core/category/dto/category.dto';
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

  @IsNotEmpty()
  @IsArray()
  categories: [CategoryDto];

  @IsOptional()
  @IsArray()
  sizes: [CreateSizeDto];

  @IsNotEmpty()
  @IsArray()
  images: [{ id: string }];

  @IsNotEmpty()
  @IsNumber()
  discount: number;

  @IsOptional()
  @IsString()
  modifier: string;

  @IsNotEmpty()
  @IsNumber()
  type: number;

  @IsNotEmpty()
  @IsNumber()
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
  price: number;

  @IsOptional()
  @IsArray()
  recomendations: [];
}
