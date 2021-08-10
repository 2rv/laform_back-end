import { IsNotEmpty, IsString } from 'class-validator';

class RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  readonly refreshToken: string;
}

export default RefreshTokenDto;
