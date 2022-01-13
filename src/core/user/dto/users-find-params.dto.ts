import { USER_ROLE } from '../enum/user-role.enum';

export type usersFindParamsDto = {
  size: number;
  page: number;
  sort: string;
  by: 'DESC' | 'ASC';
  where: string;
  role: USER_ROLE;
};
