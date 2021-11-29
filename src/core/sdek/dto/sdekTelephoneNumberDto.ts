import { IsNotEmpty, IsString } from 'class-validator';

export class SdekNumberDto {
  @IsNotEmpty()
  @IsString()
  number: string;
}
