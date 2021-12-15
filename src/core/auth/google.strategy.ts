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
      // clientID: '1042068275751-c6pbac6s5l3bjvo73amvl77f3ol2e8dj.apps.googleusercontent.com',
      // clientSecret: 'pQRjjsvJLxydvHMESpajKikM',
      // callbackURL: 'http://localhost:4000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
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
    done(null, user);
  }
}
