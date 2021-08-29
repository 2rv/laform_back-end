import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class DeleteManyProgramsDto {
  @IsNotEmpty()
  @IsArray()
  programs: [];
}
