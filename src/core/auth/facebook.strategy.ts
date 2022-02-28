import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-facebook';

import { FaceBookConfig } from '../../config/facebook.config';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: FaceBookConfig.clientID,
      clientSecret: FaceBookConfig.clientSecret,
      callbackURL: FaceBookConfig.callbackURL,
      scope: 'email',
      profileFields: ['emails', 'name', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails } = profile;
    console.log(profile);
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
