import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { JwtConfig } from 'src/config/jwt.config';

import { JwtPayloadDto } from '../dto';
import { AuthAllower } from '../decorators';

@Injectable()
class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly jwtService: JwtService;

  constructor(private readonly reflector: Reflector) {
    super();
    this.jwtService = new JwtService({
      secret: JwtConfig.secret,
    });
  }

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const isReqAllowed = this.reflector.getAllAndOverride<boolean>(
      AuthAllower.key,
      [context.getHandler(), context.getClass()],
    );
    const user =
      isReqAllowed && this.getUserFromToken(req.headers.authorization);

    if (!isReqAllowed) {
      return super.canActivate(context);
    }

    if (user) {
      req.user = user;
    }

    return true;
  }

  private getUserFromToken(bearerToken: string | undefined): JwtPayloadDto {
    const token = this.getAuthToken(bearerToken);

    if (!token) {
      return null;
    }

    try {
      return this.jwtService.verify(token) as JwtPayloadDto;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  private getAuthToken(authorization: string | undefined): string {
    if (!(authorization && typeof authorization === 'string')) {
      return '';
    }

    return authorization.replace(/^Bearer\s+?/, '');
  }
}

export default JwtAuthGuard;
