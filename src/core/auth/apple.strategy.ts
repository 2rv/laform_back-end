import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from '@nicokaiser/passport-apple';

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
      key: path.join(__dirname, '../../../config/AuthKey.p8'),
      //passReqToCallback: true,
      scope: ['email', 'name'],
      // clientID: '1042068275751-c6pbac6s5l3bjvo73amvl77f3ol2e8dj.apps.googleusercontent.com',
      // clientSecret: 'pQRjjsvJLxydvHMESpajKikM',
      // callbackURL: 'http://localhost:4000/auth/google/redirect',
    });
  }

  async validate(accessToken, refreshToken, profile, cb): Promise<any> {
    //const { id, name, email } = profile;
    const {
      id,
      name: { firstName, lastName },
      email,
    } = profile;
    const user = {
      email: email[0].value,
      firstName: firstName,
      lastName: lastName,
      accessToken,
      id: id,
    };
    cb(null, user);
  }
}
