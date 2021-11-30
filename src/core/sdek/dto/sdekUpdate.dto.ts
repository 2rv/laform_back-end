import {
  IsOptional,
  IsArray,
  ValidateNested,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SdekLocationDto } from './sdekLocation.dto';
import { SdekPackagesDto } from './sdekPackages.dto';

export class SdekUpdateDto {
  @IsOptional()
  @IsUUID('all')
  id: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => SdekLocationDto)
  from_location: SdekLocationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => SdekLocationDto)
  to_location: SdekLocationDto;

  @IsOptional()
  @IsArray()
  packages: SdekPackagesDto[];
}
