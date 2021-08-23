import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class SliderDto {
  @IsNotEmpty()
  @IsString()
  headingTextRu: string;

  @IsNotEmpty()
  @IsString()
  headingTextEn: string;

  @IsNotEmpty()
  @IsString()
  buttonTextRu: string;

  @IsNotEmpty()
  @IsString()
  buttonTextEn: string;

  @IsNotEmpty()
  @IsString()
  buttonUrl: string;
}
