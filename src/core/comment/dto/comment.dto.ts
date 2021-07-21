import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CommentDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  userId: string;

  @IsNotEmpty()
  @IsString()
  postId: string;
}
