import { LangType } from 'src/common/enum/lang.enum';

export type findAllPatternParamsDto = {
  size: number;
  page: number;
  sort: string;
  by: 'DESC' | 'ASC';
  where: string;
  category: string;
  lang: LangType;
  userId?: number;
  getAll?: boolean;
  type: 'printed' | 'electronic' | '1' | '2' | '';
};

export type findOnePatternParamsDto = {
  id: string;
  userId?: number;
};
