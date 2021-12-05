import * as config from 'config';

const SDEK_CONFIG = config.get('SDEK');

export const SdekConfig = {
  grant_type: SDEK_CONFIG.GRANT_TYPE,
  clientID: SDEK_CONFIG.CLIENT_ID,
  clientSecret: SDEK_CONFIG.CLIENT_SECRET,
  tokenByKladr: 'Token 47277a98629b84336b47c3b23b49f7d67bce9f77',
  from_location: {
    code: 270,
    city: 'Москва',
    address: 'ул. Пушкина 25',
  },
  weight: 300,
  height: 1,
  width: 30,
  length: 40,
};
