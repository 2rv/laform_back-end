import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  Min,
  IsUUID,
  Max,
} from 'class-validator';
export class SdekDto {
  @IsOptional()
  @IsUUID('all')
  id: string;

  @IsNotEmpty()
  @IsNumber()
  type: number;

  @IsOptional()
  @IsNumber()
  tariff_code: number;

  @IsOptional()
  @IsString()
  from_location: string;

  @IsOptional()
  @IsString()
  to_location1: string;

  @IsOptional()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsArray()
  @Min(1)
  @Max(1)
  packages: [];

  @IsOptional()
  @IsNumber()
  weight: number;

  @IsOptional()
  body;

  @IsOptional()
  headers;
}
