import {
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SdekCourierDto {
  @IsNotEmpty()
  @IsUUID('all')
  order_uuid: string;

  @IsNotEmpty()
  @IsString()
  intake_date: string;

  @IsNotEmpty()
  @IsString()
  intake_time_from: string;

  @IsNotEmpty()
  @IsString()
  intake_time_to: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => SdekSenderDto)
  sender: SdekSenderDto[];
}

export class SdekSenderDto {
  @IsNotEmpty()
  @IsArray()
  phones: SdekPhonesDto[];
}

export class SdekPhonesDto {
  @IsNotEmpty()
  @IsString()
  number: string;
}
