import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePromoCodeDto {
  @IsNotEmpty()
  discount: number;

  @IsNotEmpty()
  @Transform((text) => text.toLowerCase())
  @Transform((value) => value.trim())
  @IsString()
  @MinLength(6)
  text: string;
}
