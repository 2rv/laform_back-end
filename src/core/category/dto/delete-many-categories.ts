import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class DeleteManyCategoriesDto {
  @IsNotEmpty()
  @IsArray()
  categories: [];
}
