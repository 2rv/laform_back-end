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
      prompt: 'select_account',
      display: 'popup',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    cb: VerifyCallback,
  ): Promise<any> {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);

    const { name, emails } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      accessToken,
      id: profile.id,
    };
    cb(null, user);
  }
}
