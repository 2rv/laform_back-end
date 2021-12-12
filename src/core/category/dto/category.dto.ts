import { IsString, IsOptional, IsNotEmpty, IsUUID } from 'class-validator';

export class CategoryDto {
  @IsOptional()
  @IsUUID('all')
  id: string;

  @IsNotEmpty()
  @IsString()
  categoryNameRu: string;

  @IsOptional()
  @IsString()
  categoryNameEn: string;

  @IsOptional()
  @IsString()
  type!: '0' | '1' | '2' | '3' | '4';
}
