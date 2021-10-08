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
import { ProductOptionDto } from 'src/core/product-option/dto/product-option.dto';
import { CreateRecommendationDto } from 'src/core/recommendation/dto/create-recommendation.dto';

export class PatternProductDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(2)
  type: number;

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

  @IsNotEmpty()
  @IsObject()
  materialRu: {
    blocks: [];
    time: number;
    version: string;
  };
  @IsOptional()
  @IsObject()
  materialEn: {
    blocks: [];
    time: number;
    version: string;
  };
  @IsOptional()
  @IsString()
  modifierRu: string;
  @IsOptional()
  @IsString()
  modifierEn: string;

  @ArrayNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  categories: CategoryDto[];

  @IsNotEmpty()
  @IsObject()
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
  @Max(5)
  complexity: number;

  @IsOptional()
  @IsBoolean()
  deleted: boolean;
  @IsOptional()
  @IsBoolean()
  pinned: boolean;
}
