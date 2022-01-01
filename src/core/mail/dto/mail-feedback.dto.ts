import { IsNotEmpty } from 'class-validator';

export class MailFeedbackDto {
  @IsNotEmpty()
  description: string;
}
