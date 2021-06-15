import { createParamDecorator } from '@nestjs/common';
import { UserEntity } from '../user.entity';

export const GetAccount = createParamDecorator((data: string, ctx) => {
  const userAccount: UserEntity = ctx.switchToHttp().getRequest().userAccount;

  return data ? userAccount && userAccount[data] : userAccount;
});
