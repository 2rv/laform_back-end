import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  Min,
  IsUUID,
  Max,
  IsObject,
  IsNotEmptyObject,
} from 'class-validator';
import { ToLocationDto } from './sdekUpdateOrder.dto';

export class SdekDto {
  @IsOptional()
  @IsNumber()
  tariff_code: number;

  @IsNotEmptyObject()
  @IsObject()
  from_location: object;

  @IsNotEmptyObject()
  @IsObject()
  to_location: object;

  @IsOptional()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsArray()
  packages: [];

  @IsOptional()
  @IsNumber()
  weight: number;
}

export class SdekDtoOrder {
  @IsOptional()
  @IsNumber()
  tariff_code: number;

  @IsNotEmptyObject()
  @IsObject()
  to_location: ToLocationDto;

  @IsOptional()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsArray()
  packages: [];

  @IsOptional()
  @IsNumber()
  weight: number;
}
