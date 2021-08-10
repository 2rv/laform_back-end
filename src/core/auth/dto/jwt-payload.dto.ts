import { LikeEntity } from 'src/core/like/like.entity';
import { USER_ROLE } from 'src/core/user/enum/user-role.enum';
import { UserEntity } from 'src/core/user/user.entity';

class JwtPayloadDto {
  id: number;
  login: string;
  email: string;
  role: USER_ROLE;
  like: LikeEntity[];

  constructor(user: UserEntity) {
    this.id = user.id;
    this.login = user.login;
    this.email = user.email;
    this.role = user.role;
    this.like = user.like;
  }
}

export default JwtPayloadDto;
