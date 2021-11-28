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

  @IsOptional()
  @ValidateNested()
  @Type(() => SdekLocation)
  to_location: SdekLocation;

  @IsOptional()
  from_location: object;

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

  @IsOptional()
  @ValidateNested()
  @Type(() => SdekLocation)
  to_location: SdekLocation;

  @IsOptional()
  from_location: object;

  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsArray()
  packages: SdekPackages[];

  @IsOptional()
  @IsNumber()
  weight: number;
}
