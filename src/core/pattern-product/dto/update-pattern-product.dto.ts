import { IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { PatternProductDto } from './pattern-product.dto';

export class UpdatePatternProductDto {
  @IsOptional()
  @Type(() => PatternProductDto)
  patternProduct: PatternProductDto;

  @IsOptional()
  @IsArray()
  imageUrls: [];
}
