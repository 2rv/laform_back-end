import { USER_ROLE } from '../../user/enum/user-role.enum';

export interface JwtPayload {
  id: number;
  login: string;
  email: string;
  role: USER_ROLE;
}
