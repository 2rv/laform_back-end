import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  IsObject,
} from 'class-validator';

export class CreateProgramDto {
  @IsNotEmpty()
  @IsString()
  programNameRu: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
