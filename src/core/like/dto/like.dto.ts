import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class LikeDto {
  @IsNotEmpty()
  @IsString()
  postId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
