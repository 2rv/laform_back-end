import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

import { BASKET_ERROR } from '../enum/basket.enum';
import { BasketRepository } from '../basket.repository';

@Injectable()
export class BasketGuard implements CanActivate {
  constructor(private basketRepository: BasketRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const basket = await this.basketRepository.findOne({
      where: { userId: request.user.id },
    });

    if (!basket) {
      throw new BadRequestException(BASKET_ERROR.BASKET_NOT_FOUND);
    }

    return true;
  }
}
