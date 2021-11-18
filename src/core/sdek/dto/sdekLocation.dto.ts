import {
  IsNotEmpty,
  IsString,
  IsNumber,
} from 'class-validator';

export class SdekLocation {
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
