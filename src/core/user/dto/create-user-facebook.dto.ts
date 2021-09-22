import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateFacebookUseDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  facebookId: string;
}
