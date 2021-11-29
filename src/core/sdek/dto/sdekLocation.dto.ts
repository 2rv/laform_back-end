import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class SdekLocationDto {
  @IsNotEmpty()
  @IsNumber()
  code: number;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  address: string;
}
