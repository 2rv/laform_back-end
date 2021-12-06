import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UserInfoUpdateDto {
  @IsOptional()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsPhoneNumber('RU')
  phone: string;
  
  @IsOptional()
  testData?: object;
}
