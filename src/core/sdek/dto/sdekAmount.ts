import { IsNotEmpty, IsNumber } from 'class-validator';

export class SdekAmoutDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
