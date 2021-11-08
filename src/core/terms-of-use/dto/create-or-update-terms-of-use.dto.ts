import { IsNotEmpty, IsObject } from 'class-validator';

interface ITermsOfUse {
  time: number;
  blocks: any;
  version: string;
}

export class CreateOrUpdateTermsOfUseDto {
  @IsNotEmpty()
  @IsObject()
  termsOfUse: ITermsOfUse;
}
