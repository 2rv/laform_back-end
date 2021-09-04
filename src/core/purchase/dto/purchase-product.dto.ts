import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

import { PatternProductEntity } from 'src/core/pattern-product/pattern-product.entity';
import { SewingProductEntity } from 'src/core/sewing-product/sewing-product.entity';
import { MasterClassEntity } from 'src/core/master-class/master-class.entity';
import { BasketEntity } from './../../basket/basket.entity';

export class PurchaseProductDto {
  @IsOptional()
  masterClassId: MasterClassEntity;

  @IsOptional()
  patternProductId: PatternProductEntity;

  @IsOptional()
  sewingProductId: SewingProductEntity;

  @IsOptional()
  basketId: BasketEntity;

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
