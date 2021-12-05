import { IsNotEmpty, IsObject } from 'class-validator';

interface ILegalInformation {
  time: number;
  blocks: any;
  version: string;
}

export class CreateOrUpdateLegalInformationDto {
  @IsNotEmpty()
  @IsObject()
  legalInformation: ILegalInformation;
}
