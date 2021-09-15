import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsObject,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { CategoryDto } from 'src/core/category/dto/category.dto';
import { FileDto } from 'src/core/file-upload/dto/file-dto';

export class PostDto {
  @IsNotEmpty()
  @IsString()
  titleRu: string;

  @IsOptional()
  @IsString()
  titleEn: string;

  @IsOptional()
  @IsString()
  modifier: string;

  @IsNotEmpty()
  @IsObject()
  image: FileDto;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  categories: [CategoryDto];

  @IsNotEmpty()
  @IsObject()
  postArticle: {
    blocks: [];
    time: number;
    version: string;
  };

  @IsOptional()
  @IsBoolean()
  pinned: boolean;

  @IsOptional()
  @IsArray()
  recommendations: [];

  @IsOptional()
  @IsNumber()
  @Min(4)
  @Max(4)
  type: number;
}
