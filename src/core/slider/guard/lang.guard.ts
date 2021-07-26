import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { LangType } from '../enum/lang.enum';
const LANG_ERROR_TID = 'UNCORRECT_LANG_TYPE';
@Injectable()
export class LangValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const langTypes: string[] = Object.values(LangType);
    const lang = String(value.lang);
    const index = langTypes.indexOf(lang);
    if (index === -1) {
      throw new BadRequestException(LANG_ERROR_TID);
    }
    return lang;
  }
}
