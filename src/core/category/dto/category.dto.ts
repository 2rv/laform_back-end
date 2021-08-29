import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  @IsString()
  textRu: string;

  @IsOptional()
  @IsString()
  textEn: string;
}
