import { IsNotEmpty, IsString } from 'class-validator';

export class FooterDto {
  @IsNotEmpty()
  @IsString()
  phone: string;
}
