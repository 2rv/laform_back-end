import { IsNotEmpty, IsObject } from 'class-validator';

interface IPrivacyPolicy {
  time: number;
  blocks: any;
  version: string;
}

export class CreateOrUpdatePrivacyPolicyDto {
  @IsNotEmpty()
  @IsObject()
  privacyPolicy: IPrivacyPolicy;
}
