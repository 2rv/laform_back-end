import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SdekLocation } from './sdekLocation.dto';
import { SdekPackages } from './sdekPackages.dto';

export class SdekDto {
  @IsOptional()
  @IsNumber()
  tariff_code: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => SdekLocation)
  to_location: SdekLocation;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => SdekLocation)
  from_location: SdekLocation;

  @IsOptional()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsArray()
  packages: SdekPackages[];

  @IsOptional()
  @IsNumber()
  weight: number;
}

export class SdekDtoOrder {
  @IsOptional()
  @IsNumber()
  tariff_code: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => SdekLocation)
  to_location: SdekLocation;

  @IsOptional()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsArray()
  packages: SdekPackages[];

  @IsOptional()
  @IsNumber()
  weight: number;
}
