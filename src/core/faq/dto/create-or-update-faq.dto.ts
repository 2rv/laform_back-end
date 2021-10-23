import { IsNotEmpty, IsObject } from 'class-validator';

interface IFaq {
  time: number;
  blocks: any;
  version: string;
}

export class CreateOrUpdateFaqDto {
  @IsNotEmpty()
  @IsObject()
  faq: IFaq;
}
