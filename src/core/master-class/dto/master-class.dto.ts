import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  IsObject,
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
  categories: [CategoryDto];

  @IsNotEmpty()
  @IsArray()
  programs: [CreateProgramDto];

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
}
