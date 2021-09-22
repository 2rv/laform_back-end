import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateGoogleUseDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  googleId: string;
}
