import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { SdekNumberDto } from './sdekTelephoneNumberDto';

export class SdekReceptionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  phones: SdekNumberDto[];
}
