import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  IsObject,
} from 'class-validator';
import { CreateProgramDto } from 'src/core/program/dto/create-program.dto';

export class MasterClassDto {
  @IsNotEmpty()
  @IsArray()
  categories: [];

  @IsNotEmpty()
  @IsString()
  descriptionRu: string;

  @IsOptional()
  @IsString()
  descriptionEn: string;

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
  @IsArray()
  programs: [CreateProgramDto];

  @IsNotEmpty()
  @IsObject()
  type: object;
}
