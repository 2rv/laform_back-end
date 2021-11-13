import * as config from 'config';

const SDEK_CONFIG = config.get('SDEK');

export const SdekConfig = {
  clientID: SDEK_CONFIG.CLIENT_ID,
  clientSecret: SDEK_CONFIG.CLIENT_SECRET,
};
