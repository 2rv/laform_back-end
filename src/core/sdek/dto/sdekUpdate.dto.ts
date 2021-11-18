import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class SdekUpdate {
  @IsNotEmpty()
  @IsUUID('all')
  id: string;
}
