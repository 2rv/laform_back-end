import { IsOptional, IsNotEmpty, IsUUID, IsString } from 'class-validator';

export class FooterDto {
  @IsNotEmpty()
  @IsString()
  phone: string;
}
