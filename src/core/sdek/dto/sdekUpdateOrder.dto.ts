import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsNotEmptyObject,
} from 'class-validator';

export class ToLocationDto {
  @IsNotEmpty()
  @IsNumber()
  code: number;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}
