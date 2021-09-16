import { IsNotEmpty, IsString, IsNumber, Min, IsObject } from 'class-validator';

export class CreateProgramDto {
  @IsNotEmpty()
  @IsString()
  programNameRu: string;

  @IsNotEmpty()
  @IsString()
  programNameEn: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsObject()
  articleText: {
    blocks: [];
    time: number;
    version: string;
  };

  vendorCode: string;
}
