import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateSliderDto {
  @IsOptional()
  @IsString()
  headingTextRu: string;

  @IsOptional()
  @IsString()
  headingTextEn: string;

  @IsOptional()
  @IsString()
  buttonTextRu: string;

  @IsOptional()
  @IsString()
  buttonTextEn: string;

  @IsOptional()
  @IsString()
  buttonUrl: string;
}
