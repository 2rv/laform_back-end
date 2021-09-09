import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateColorDto {
  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;
}
