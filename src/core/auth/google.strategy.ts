import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';
import { GoogleConfig } from 'src/config/google.config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: GoogleConfig.clientID,
      clientSecret: GoogleConfig.clientSecret,
      callbackURL: GoogleConfig.callbackURL,
      scope: ['email', 'profile'],
      prompt: 'consent',
      display: 'page',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: undefined,
    profile: Profile,
    cb: VerifyCallback,
  ): Promise<any> {
    const { id, displayName, emails } = profile;
    const user = {
      id: id,
      email: emails[0].value,
      fullName: displayName,
      accessToken,
    };
    cb(null, user);
  }
}
