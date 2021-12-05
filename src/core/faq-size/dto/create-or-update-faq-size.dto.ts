import { IsNotEmpty, IsObject } from 'class-validator';

export class CreateOrUpdateFaqSizeDto {
  @IsNotEmpty()
  @IsObject()
  data: {
    blocks: [];
    time: number;
    version: string;
  };
}
