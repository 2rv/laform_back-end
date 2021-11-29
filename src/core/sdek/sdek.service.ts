import { SdekConfig } from 'src/config/sdek.config';
import { SdekDto, SdekDtoOrder } from './dto/sdek.dto';
import fetch from 'cross-fetch';
import { stringify } from 'querystring';
import { SdekUpdate } from './dto/sdekUpdate.dto';
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SdekService {
  async authInSdek(): Promise<string> {
    const data = {
      grant_type: SdekConfig.grant_type,
      client_id: SdekConfig.clientID,
      client_secret: SdekConfig.clientSecret,
    };
    const result = await fetch('https://api.edu.cdek.ru/v2/oauth/token', {
      method: 'POST',
      body: stringify(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
    if (result.errors) {
      throw new BadRequestException(result.errors);
    }
    return 'Bearer ' + result.access_token;
  }
  async сalculationByTariffCode(body: SdekDto) {
    const data = {
      city: SdekConfig.from_location.city,
      adress: SdekConfig.from_location.adress,
      code: SdekConfig.from_location.code,
    };
    body.from_location = data;
    const result: any = await fetch(
      'https://api.edu.cdek.ru/v2/calculator/tariff',
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: await this.authInSdek(),
        },
      },
    )
      .then((data) => {
        return data.json();
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
    if (result.errors) {
      throw new BadRequestException(result.errors);
    }
    return result;
  }
  async getTariffList(body: SdekDto) {
    const data = {
      city: SdekConfig.from_location.city,
      adress: SdekConfig.from_location.adress,
      code: SdekConfig.from_location.code,
    };
    body.from_location = data;
    const result = await fetch(
      'https://api.edu.cdek.ru/v2/calculator/tarifflist',
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: await this.authInSdek(),
        },
      },
    )
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
    if (result.errors) {
      throw new BadRequestException(result.errors);
    }
    return result;
  }

  async getCityCodeByKladr(kladr_code) {
    try {
      const response = await axios.post(
        `https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/delivery`,
        {
          query: kladr_code,
        },
        {
          headers: {
            Authorization: 'Token 47277a98629b84336b47c3b23b49f7d67bce9f77',
          },
        },
      );

      return response.data.suggestions[0].data.cdek_id;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getOffices(city_code: string) {
    try {
      const response = await axios.get(
        `https://api.edu.cdek.ru/v2/deliverypoints?city_code=${city_code}`,
        {
          headers: {
            Authorization: await this.authInSdek(),
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }

    // const url: any = new URL('https://api.edu.cdek.ru/v2/deliverypoints');
    // const params = { postal_code: postal_code };
    // Object.keys(params).forEach((key) =>
    //   url.searchParams.append(key, params[key]),
    // );
    // const result = await fetch(url, {
    //   method: 'GET',
    //   headers: {
    //     Authorization: await this.authInSdek(),
    //   },
    // })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .catch((err) => {
    //     throw new InternalServerErrorException(err);
    //   });
    // if (result.error) {
    //   throw new InternalServerErrorException(result);
    // }
    // if (result.requests) {
    //   for (let exception of result.requests) {
    //     if (exception.errors) {
    //       throw new BadRequestException(exception.errors);
    //     }
    //   }
    // }
    // for (let office of result) {
    //   if (office.location.postal_code === postal_code) {
    //     return office;
    //   }
    // }
  }
  async getCities(code: string) {
    console.log(code);

    try {
      const response = await axios.get(
        `https://api.edu.cdek.ru/v2/location/cities/?code=${code}&country_codes=RU,TR`,
        {
          headers: {
            Authorization: await this.authInSdek(),
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }

    // const url: any = new URL('https://api.edu.cdek.ru/v2/location/cities');
    // const params = { fias_region_guid: fias_region_guid };
    // Object.keys(params).forEach((key) =>
    //   url.searchParams.append(key, params[key]),
    // );
    // const result = await fetch(url, {
    //   method: 'GET',
    //   headers: {
    //     Authorization: await this.authInSdek(),
    //   },
    // })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .catch((err) => {
    //     throw new InternalServerErrorException(err);
    //   });
    // if (result.error) {
    //   throw new InternalServerErrorException(result);
    // }
    // if (result.requests) {
    //   for (let exception of result.requests) {
    //     if (exception.errors) {
    //       throw new BadRequestException(exception.errors);
    //     }
    //   }
    // }
    // for (let codes of result) {
    //   return codes.postal_codes;
    // }
  }

  async createOrder(body: SdekDtoOrder) {
    const data = {
      city: SdekConfig.from_location.city,
      adress: SdekConfig.from_location.adress,
      code: SdekConfig.from_location.code,
    };
    body.from_location = data;
    const result = await fetch('https://api.edu.cdek.ru/v2/orders', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: await this.authInSdek(),
      },
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
    if (result.error) {
      throw new InternalServerErrorException(result);
    }
    if (result.requests) {
      for (let exception of result.requests) {
        if (exception.errors) {
          throw new BadRequestException(exception.errors);
        }
      }
    }
    return result;
  }
  async getOrder(id: string) {
    const result = await fetch('https://api.edu.cdek.ru/v2/orders/' + `${id}`, {
      method: 'GET',
      headers: {
        Authorization: await this.authInSdek(),
      },
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
    return result;
  }
  async editOrder(body: SdekUpdate) {
    const result = await fetch('https://api.edu.cdek.ru/v2/orders', {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: await this.authInSdek(),
      },
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
    if (result.error) {
      throw new InternalServerErrorException(result);
    }
    if (result.requests) {
      for (let exception of result.requests) {
        if (exception.errors) {
          throw new BadRequestException(exception.errors);
        }
      }
    }
    return result;
  }
  async deleteOrder(id: string) {
    const result = await fetch('https://api.edu.cdek.ru/v2/orders/' + `${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: await this.authInSdek(),
      },
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
    if (result.error) {
      throw new InternalServerErrorException(result);
    }
    if (result.requests) {
      for (let exception of result.requests) {
        if (exception.errors) {
          throw new BadRequestException(exception.errors);
        }
      }
    }
    return result;
  }
}
