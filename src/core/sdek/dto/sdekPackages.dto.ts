import { IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

export class SdekPackagesDto {
  @IsOptional()
  @IsNumber()
  height: number;

  @IsOptional()
  @IsNumber()
  length: number;

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsOptional()
  @IsNumber()
  width: number;
}
