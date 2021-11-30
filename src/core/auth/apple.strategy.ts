import { PassportStrategy } from '@nestjs/passport';
import { VerifyCallback, Profile, Strategy } from 'passport-apple';

import { Injectable } from '@nestjs/common';
import { AppleConfig } from 'src/config/apple.config';
import * as path from 'path';

@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy, 'apple') {
  constructor() {
    super({
      clientID: AppleConfig.clientID,
      teamID: AppleConfig.teamID,
      callbackURL: AppleConfig.callbackURL,
      keyID: AppleConfig.keyID,
      privateKeyLocation: path.join(__dirname, '../../../config/AuthKey.p8'),
      //passReqToCallback: true,
      scope: ['email', 'profile'],
      // clientID: '1042068275751-c6pbac6s5l3bjvo73amvl77f3ol2e8dj.apps.googleusercontent.com',
      // clientSecret: 'pQRjjsvJLxydvHMESpajKikM',
      // callbackURL: 'http://localhost:4000/auth/google/redirect',
    });
  }

  async validate(
    accessToken,
    refreshToken,
    idToken,
    profile,
    cb: VerifyCallback,
  ): Promise<any> {
    const { id, email } = profile;
    const user = {
      email: email,
      accessToken,
      idToken,
      id: id,
    };

    cb(null, user);
  }
}
