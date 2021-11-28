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
  async registrationOrder(body: SdekDtoOrder) {
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
  async getInformationAboutOrder(id: string) {
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
  async getOffice(postal_code: string) {
    const url: any = new URL('https://api.edu.cdek.ru/v2/deliverypoints');
    const params = { postal_code: postal_code };
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key]),
    );
    const result = await fetch(url, {
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
    for (let office of result) {
      if (office.location.postal_code === postal_code) {
        return office;
      }
    }
  }
  async listOfCities(fias_guid: string) {
    const url: any = new URL('https://api.edu.cdek.ru/v2/location/cities');
    const params = { fias_guid: fias_guid };
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key]),
    );
    const result = await fetch(url, {
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
    for (let codes of result) {
      return codes.postal_codes;
    }
  }
}
