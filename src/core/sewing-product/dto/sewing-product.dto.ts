import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  IsObject,
} from 'class-validator';
import { CreateColorDto } from 'src/core/colors/dto/create-color.dto';
import { CreateSizeDto } from 'src/core/sizes/dto/create-size.dto';

export class SewingProductDto {
  @IsNotEmpty()
  @IsArray()
  categories: [];

  @IsNotEmpty()
  @IsNumber()
  discount: number;

  @IsNotEmpty()
  @IsNumber()
  count: number;

  @IsNotEmpty()
  @IsArray()
  imageUrls: [];

  @IsOptional()
  @IsString()
  modifier: string;

  @IsNotEmpty()
  @IsString()
  titleRu: string;

  @IsOptional()
  @IsString()
  titleEn: string;

  @IsNotEmpty()
  @IsObject()
  type: { id: number; tid: string };

  @IsNotEmpty()
  @IsString()
  descriptionRu: string;

  @IsOptional()
  @IsString()
  descriptionEn: string;

  @IsOptional()
  @IsArray()
  sizes: [CreateSizeDto];
  @IsOptional()
  @IsArray()
  colors: [CreateColorDto];
}
