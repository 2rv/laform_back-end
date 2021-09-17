import { IsNumber, IsString, IsOptional, IsNotEmpty } from 'class-validator';

import { PatternProductEntity } from 'src/core/pattern-product/pattern-product.entity';
import { SewingProductEntity } from 'src/core/sewing-product/sewing-product.entity';
import { MasterClassEntity } from 'src/core/master-class/master-class.entity';
import { ColorsEntity } from 'src/core/colors/colors.entity';
import { SizesEntity } from 'src/core/sizes/sizes.entity';
import { ProgramsEntity } from 'src/core/programs/programs.entity';

export class PurchaseProductDto {
  @IsOptional()
  masterClassId: MasterClassEntity;

  @IsOptional()
  patternProductId: PatternProductEntity;

  @IsOptional()
  sewingProductId: SewingProductEntity;

  @IsNotEmpty()
  @IsNumber()
  type: number;

  @IsOptional()
  @IsString()
  color: ColorsEntity;

  @IsOptional()
  @IsString()
  size: SizesEntity;

  @IsOptional()
  @IsString()
  program: ProgramsEntity;

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
