import { IsString, IsOptional, IsBoolean } from 'class-validator';

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

  @IsOptional()
  @IsString()
  titleTextColor: string;

  @IsOptional()
  @IsString()
  buttonColor: string;

  @IsOptional()
  @IsString()
  buttonTextColor: string;

  @IsOptional()
  @IsBoolean()
  isHaveButton: boolean;
}
