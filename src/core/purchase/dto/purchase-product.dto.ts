import { IsNumber, IsOptional, IsNotEmpty, IsUUID } from 'class-validator';
import { PatternProductEntity } from 'src/core/pattern-product/pattern-product.entity';
import { SewingProductEntity } from 'src/core/sewing-product/sewing-product.entity';
import { MasterClassEntity } from 'src/core/master-class/master-class.entity';
import { ProductOptionEntity } from 'src/core/product-option/product-option.entity';

export class PurchaseProductDto {
  @IsOptional()
  @IsUUID()
  masterClassId: MasterClassEntity;

  @IsOptional()
  @IsUUID()
  patternProductId: PatternProductEntity;

  @IsOptional()
  @IsUUID()
  sewingProductId: SewingProductEntity;

  @IsOptional()
  @IsUUID()
  optionsId: ProductOptionEntity;

  @IsNotEmpty()
  @IsNumber()
  type: number;

  @IsNotEmpty()
  @IsNumber()
  totalCount: number;

  @IsOptional()
  @IsNumber()
  totalDiscount: number;

  @IsOptional()
  @IsNumber()
  totalPrice: number;
}
