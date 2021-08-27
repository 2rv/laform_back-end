import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  IsObject,
} from 'class-validator';
import { CreateSizeDto } from 'src/core/sizes/dto/create-size.dto';

export class PatternProductDto {
  @IsNotEmpty()
  @IsArray()
  categories: [];

  @IsNotEmpty()
  @IsNumber()
  discount: number;

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

  @IsNotEmpty()
  @IsNumber()
  complexity: number;

  @IsNotEmpty()
  @IsString()
  material: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsArray()
  sizes: [CreateSizeDto];
}
