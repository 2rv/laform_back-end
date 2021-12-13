import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CdekLocationDto {
  @IsNotEmpty()
  @IsNumber()
  code: number;

  @IsOptional()
  @IsString()
  postal_code?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
