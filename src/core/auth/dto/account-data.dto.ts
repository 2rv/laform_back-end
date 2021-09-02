import { UserInfoEntity } from '../../user-info/user-info.entity';

export interface AccountDataDto {
  id: number;
  login: string;
  email: string;
  createDate: string;
  emailConfirmed: boolean;
  userInfo: UserInfoEntity;
}
