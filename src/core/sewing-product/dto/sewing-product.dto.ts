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
  IsObject,
} from 'class-validator';
import { CategoryDto } from 'src/core/category/dto/category.dto';
import { FileDto } from 'src/core/file-upload/dto/file-dto';
import { ProductOptionDto } from 'src/core/product-option/dto/product-option.dto';
import { CreateRecommendationDto } from 'src/core/recommendation/dto/create-recommendation.dto';

export class SewingProductDto {
  @IsNotEmpty()
  @IsString()
  titleRu: string;
  @IsOptional()
  @IsString()
  titleEn: string;

  @IsNotEmpty()
  @IsString()
  descriptionRu: string;
  @IsOptional()
  @IsString()
  descriptionEn: string;

  @IsOptional()
  @IsString()
  modifierRu: string;
  @IsOptional()
  @IsString()
  modifierEn: string;

  @IsOptional()
  @IsArray()
  categories: CategoryDto[];

  @IsNotEmpty()
  @IsArray()
  options: ProductOptionDto[];

  @ArrayNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(6)
  images: FileDto[];

  @IsOptional()
  @IsObject()
  recommendation: CreateRecommendationDto;

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
  @IsNumber()
  @Min(3)
  @Max(3)
  type: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(3)
  optionType: number;

  @IsOptional()
  @IsBoolean()
  deleted: boolean;
}
