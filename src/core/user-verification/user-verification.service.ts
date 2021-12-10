import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { randomUUID } from 'src/common/utils/hash';
import { MailService } from '../mail/mail.service';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { USER_VERIFICATION_ERROR } from './enum/user-verification-error.enum';
import { UserVerificationEmailPayload } from './type/user-verification-email-payload.type';
import { PurchaseRepository } from '../purchase/purchase.repository';
import { UserChangeEmailDto } from '../user/dto/user-change-email.dto';
import { USER_ERROR } from '../user/enum/user-error.enum';

@Injectable()
export class UserVerificationService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private userRepository: UserRepository,
    private mailService: MailService,
    private purchaseRepository: PurchaseRepository,
  ) {}

  async getEmailVerificationCode(user: UserEntity): Promise<void> {
    if (user.emailConfirmed) {
      throw new BadRequestException(
        USER_VERIFICATION_ERROR.USER_VERIFICATION_EMAIL_ALREADY_CONFIRMED,
      );
    }

    const data: UserVerificationEmailPayload = {
      email: user.email,
      userId: user.id,
    };

    const code = randomUUID();

    await this.cacheManager.set(code, JSON.stringify(data));

    console.log(`VERIFICATION CODE: ${code}`);
    const messageDate = await this.mailService.sendMessage(
      { toMail: user.email },
      code,
    );
  }

  async confirmUserVerificationEmail(code: string): Promise<any> {
    const rawPayload: string = await this.cacheManager.get(code);
    if (!rawPayload) {
      throw new BadRequestException(
        USER_VERIFICATION_ERROR.USER_VERIFICATION_EMAIL_CODE_DOESNT_EXISTS,
      );
    }

    const payload: UserVerificationEmailPayload = JSON.parse(rawPayload);

    const user = await this.userRepository.findOne({ id: payload.userId });
    if (user.email !== payload.email) {
      throw new BadRequestException(
        USER_VERIFICATION_ERROR.VERIFICATION_CODE_PAYLOAD_HAS_WRONG_EMAIL,
      );
    }
    const updatedUser = await this.userRepository.confirmEmailById(user);
    await this.purchaseRepository.connectPurchasesToUser(updatedUser);

    this.cacheManager.del(code);
    return true;
  }

  async confirmChangeEmail(code: string): Promise<void> {
    const rawPayload: string = await this.cacheManager.get(code);
    if (!rawPayload) {
      throw new BadRequestException(
        USER_VERIFICATION_ERROR.USER_VERIFICATION_EMAIL_CODE_DOESNT_EXISTS,
      );
    }
    const data: UserChangeEmailDto = JSON.parse(rawPayload);
    const user = await this.userRepository.findOne(data.userId);
    if (!Boolean(user)) {
      throw new BadRequestException(USER_ERROR.USER_NOT_FOUND);
    }
    if (user.email === data.email) {
      throw new BadRequestException(
        USER_ERROR.MAIL_ALREADY_LINKED_TO_THIS_ACCOUNT,
      );
    }
    try {
      await this.userRepository.update(user.id, {
        email: data.email,
        emailConfirmed: false,
      });
      await this.cacheManager.del(code);
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
