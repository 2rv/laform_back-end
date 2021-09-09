import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateSizeDto {
  @IsNotEmpty()
  @IsString()
  size: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;
}
