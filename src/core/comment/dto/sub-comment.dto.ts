import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class SubCommentDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  userId: string;

  @IsNotEmpty()
  @IsString()
  postId: string;

  @IsNotEmpty()
  @IsString()
  commentId: string;
}
