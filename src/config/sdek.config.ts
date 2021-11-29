import * as config from 'config';

const SDEK_CONFIG = config.get('SDEK');

export const SdekConfig = {
  grant_type: SDEK_CONFIG.GRANT_TYPE,
  clientID: SDEK_CONFIG.CLIENT_ID,
  clientSecret: SDEK_CONFIG.CLIENT_SECRET,
  from_location: {
    code:270,
    city:"Москва",
    adress:"Пушкина 2"
  },
  weight:100,
};
