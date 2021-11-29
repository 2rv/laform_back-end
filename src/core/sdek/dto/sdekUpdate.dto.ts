import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  ValidateNested,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SdekLocation } from './sdekLocation.dto';
import { SdekPackages } from './sdekPackages.dto';

export class SdekUpdate {
  @IsOptional()
  @IsUUID('all')
  id: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => SdekLocation)
  from_location: SdekLocation;

  @IsOptional()
  @ValidateNested()
  @Type(() => SdekLocation)
  to_location: SdekLocation;

  @IsOptional()
  @IsArray()
  packages: SdekPackages[];
}
