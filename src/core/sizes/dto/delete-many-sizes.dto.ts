import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class DeleteManySizesDto {
  @IsNotEmpty()
  @IsArray()
  sizes: [];
}
