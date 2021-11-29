import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SdekReceptionDto } from './sdekRecipient.dto';
import { SdekPackagesOrderDto } from './sdekPackagesOrder.dto';

export class SdekOrderDto {
  @IsNotEmpty()
  @IsNumber()
  tariff_code: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => SdekReceptionDto)
  recipient: SdekReceptionDto;

  @IsNotEmpty()
  @IsArray()
  packages: SdekPackagesOrderDto[];

  @IsOptional()
  from_location: object;

  @IsOptional()
  @IsString()
  code: string;
}
