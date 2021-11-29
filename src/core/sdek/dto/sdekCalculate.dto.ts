import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SdekLocationDto } from './sdekLocation.dto';
import { SdekPackagesDto } from './sdekPackages.dto';

export class SdekCalculateDto {
  @IsNotEmpty()
  @IsNumber()
  tariff_code: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => SdekLocationDto)
  to_location: SdekLocationDto;

  @IsOptional()
  from_location: object;

  @IsOptional()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsArray()
  packages: SdekPackagesDto[];

  @IsOptional()
  @IsNumber()
  weight: number;
}
