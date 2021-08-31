import { IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { SewingProductDto } from './sewing-product.dto';

export class UpdateSewingProductDto {
  @IsOptional()
  @Type(() => SewingProductDto)
  sewingProduct: SewingProductDto;

  @IsOptional()
  @IsArray()
  images: [];
}
