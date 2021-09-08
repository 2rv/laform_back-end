import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  IsObject,
  IsBoolean,
  Min,
  Max,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { CategoryDto } from 'src/core/category/dto/category.dto';
import { CreateProgramDto } from 'src/core/programs/dto/create-program.dto';

export class MasterClassDto {
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
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  categories: [CategoryDto];

  @IsNotEmpty()
  @IsArray()
  programs: [CreateProgramDto];

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(6)
  images: [{ id: string }];

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
  @Min(0)
  @Max(0)
  type: number;

  @IsOptional()
  @IsArray()
  recommendations: [];

  @IsNotEmpty()
  @IsObject()
  masterClassArticle: {
    blocks: [];
    time: number;
    version: string;
  };

  @IsOptional()
  @IsBoolean()
  pinned: boolean;

  @IsOptional()
  @IsBoolean()
  deleted: boolean;
}
