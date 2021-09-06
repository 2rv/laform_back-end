import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateProgramDto {
  @IsNotEmpty()
  @IsString()
  programNameRu: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;
}
