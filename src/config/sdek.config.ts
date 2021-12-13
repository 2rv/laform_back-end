import * as config from 'config';

const СDEK_CONFIG = config.get('СDEK');
const DADATA_CONFIG = config.get('DADATA');

export const SdekConfig = {
  grant_type: СDEK_CONFIG.GRANT_TYPE,
  clientID: СDEK_CONFIG.CLIENT_ID,
  clientSecret: СDEK_CONFIG.CLIENT_SECRET,
  dadataToken: DADATA_CONFIG.TOKEN,
  from_location: {
    code: 137,
    city: 'Санкт-Петербург',
    address: '199106, Санкт-Петербург, ул. Новгородская, д.23, лит.А',
    postal_code: 230203,
  },
  weight: 300,
  height: 1,
  width: 30,
  length: 40,
};
