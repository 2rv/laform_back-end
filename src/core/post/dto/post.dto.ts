import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  @IsString()
  textRu: string;

  @IsNotEmpty()
  @IsString()
  textEn: string;

  @IsNotEmpty()
  @IsString()
  titleRu: string;

  @IsNotEmpty()
  @IsString()
  titleEn: string;

  @IsOptional()
  @IsBoolean()
  pinned: boolean;
}
