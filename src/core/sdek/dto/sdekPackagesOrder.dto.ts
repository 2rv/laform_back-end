import { IsOptional, IsNumber, IsNotEmpty, IsArray } from 'class-validator';
import { SdekItemsDto } from './sdekItem.dto';

export class SdekPackagesOrderDto {
  @IsNotEmpty()
  @IsNumber()
  height: number;

  @IsNotEmpty()
  @IsNumber()
  length: number;

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsOptional()
  @IsNumber()
  width: number;

  @IsNotEmpty()
  @IsArray()
  items: SdekItemsDto[];
}
