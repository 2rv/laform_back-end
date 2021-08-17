import * as config from 'config';

const APPLE_CONFIG = config.get('APPLE');

export const AppleConfig = {
  clientID: APPLE_CONFIG.CLIENT_ID,
  teamID: APPLE_CONFIG.CLIENT_ID,
  keyID: APPLE_CONFIG.CLIENT_ID,
  privateKeyString: APPLE_CONFIG.CLIENT_SECRET,
  callbackURL: APPLE_CONFIG.CALLBACK_URL,
};
