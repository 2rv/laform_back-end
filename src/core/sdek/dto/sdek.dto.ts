import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  Min,
  IsUUID,
  Max,
} from 'class-validator';
export class SdekDto {
  @IsNotEmpty()
  @IsNumber()
  type: number;

  @IsOptional()
  @IsNumber()
  tariff_code: number;

  //Это же обьект не????????????
  @IsOptional()
  @IsString()
  from_location: string;

  //Это же обьект не????????????
  @IsOptional()
  @IsString()
  to_location1: string;

  @IsOptional()
  @IsString()
  code: string;

  //Массив посылок может состоять из более одного пропа
  @IsNotEmpty()
  @IsArray()
  @Min(1)
  @Max(1)
  packages: [];

  @IsOptional()
  @IsNumber()
  weight: number;

  //Почекай другие модули в Nest так не пишут
  @IsOptional()
  body;
  //Почекай другие модули в Nest так не пишут
  @IsOptional()
  headers;
  //Почекай другие модули в Nest так не пишут
  @IsOptional()
  query;
}
