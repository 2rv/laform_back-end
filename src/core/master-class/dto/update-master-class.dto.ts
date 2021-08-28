import { IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { MasterClassDto } from './master-class.dto';

export class UpdateMasterClassDto {
  @IsOptional()
  @Type(() => MasterClassDto)
  masterClass: MasterClassDto;

  @IsOptional()
  @IsArray()
  images: [];
}
