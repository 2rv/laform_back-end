import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class PurchaseProductDto {
  @IsString()
  @IsOptional()
  masterClassId: string;

  @IsString()
  @IsOptional()
  patternProductId: string;

  @IsString()
  @IsOptional()
  sewingProductId: string;

  @IsOptional()
  @IsString()
  color: string;

  @IsOptional()
  @IsString()
  size: string;

  @IsOptional()
  @IsString()
  categoryId: string;

  @IsOptional()
  @IsString()
  format: string;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  program: string;
}
