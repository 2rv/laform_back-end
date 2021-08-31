import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  userId: any;
}
