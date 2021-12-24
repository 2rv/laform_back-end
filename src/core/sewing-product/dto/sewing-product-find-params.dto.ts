import { LangType } from 'src/common/enum/lang.enum';

export type findAllSewingProductParamsDto = {
  size: number;
  page: number;
  sort: string;
  by: 'DESC' | 'ASC';
  where: string;
  category: string;
  lang: LangType;
  userId?: number;
  getAll?: boolean;
};

export type findOneSewingProductParamsDto = {
  id: string;
  userId?: number;
};
