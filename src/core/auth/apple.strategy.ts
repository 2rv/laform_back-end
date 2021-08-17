import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-apple';
import { AppleConfig } from '../../config/apple.config';

@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy, 'apple') {
  constructor() {
    super({
      clientID: AppleConfig.clientID,
      teamID: AppleConfig.teamID,
      callbackURL: AppleConfig.callbackURL,
      keyID: AppleConfig.keyID,
      privateKeyString: AppleConfig.privateKeyString,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      accessToken,
      refreshToken,
    };
    done(null, user);
  }
}
429812;
