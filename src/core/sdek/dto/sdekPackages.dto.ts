import { IsOptional, IsNumber } from 'class-validator';

export class SdekPackages {
  @IsOptional()
  @IsNumber()
  number: number;

  @IsOptional()
  @IsNumber()
  height: number;

  @IsOptional()
  @IsNumber()
  length: number;

  @IsOptional()
  @IsNumber()
  weight: number;

  @IsOptional()
  @IsNumber()
  width: number;
}
