import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class DeleteManyColorsDto {
  @IsNotEmpty()
  @IsArray()
  colors: [];
}
