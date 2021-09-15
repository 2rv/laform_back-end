import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';

export class CreateSizeDto {
  @IsNotEmpty()
  @IsString()
  size: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  vendorCode: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  count: number;
}
