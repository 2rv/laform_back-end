import { IsNotEmpty, IsObject } from 'class-validator';

interface IAbout {
  time: number;
  blocks: any;
  version: string;
}

export class CreateOrUpdateAboutUsDto {
  @IsNotEmpty()
  @IsObject()
  about: IAbout;
}
