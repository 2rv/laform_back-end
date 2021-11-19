import { IsOptional, IsUUID } from 'class-validator';

export class SdekUpdate {
  @IsOptional()
  @IsUUID('all')
  id: string;
}
