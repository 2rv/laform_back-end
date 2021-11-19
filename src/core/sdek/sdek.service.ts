import { SdekConfig } from 'src/config/sdek.config';
import { SdekDto, SdekDtoOrder } from './dto/sdek.dto';
import { SdekRepository } from './sdek.repository';
import fetch from 'cross-fetch';
import { stringify } from 'querystring';

import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class SdekService {
  constructor(private SdekRepository: SdekRepository) {}

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
  async CalculationByTariffCode(body: SdekDto) {
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
  async getTariff(body: SdekDto) {
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
  async editOrder(body) {
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
