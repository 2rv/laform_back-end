import {  IsString, IsNumber, IsOptional } from 'class-validator';

export class SdekLocation {
  @IsOptional()
  @IsNumber()
  code: number;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  address: string;
}
