import { Repository } from 'typeorm';
import fetch from 'cross-fetch';
import { stringify } from 'querystring';
import { SdekConfig } from 'src/config/sdek.config';
import { SdekDto } from './dto/sdek.dto';
import {
  Injectable,
  Response,
  HttpCode,
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
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
    if (result.errors) {
      throw new InternalServerErrorException(result.errors);
    }
    return result;
  }
  async CalculationByTariffCode(req: SdekDto) {
    const data = {
      type: req.body.type,
      date: req.body.date,
      currency: req.body.currency,
      tariff_code: req.body.tariff_code,
      from_location: req.body.from_location,
      to_location: req.body.to_location,
      services: req.body.services,
      packages: req.body.packages,
    };
    const result = await fetch('https://api.edu.cdek.ru/v2/calculator/tariff', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: req.headers.authorization,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
    if (result.errors) {
      throw new BadRequestException(result.errors);
    }
    return result;
  }
  async CalculationForAnAvailableTariffCode(req: SdekDto) {
    const data = {
      from_location: req.body.from_location,
      to_location: req.body.to_location,
      packages: req.body.packages,
    };
    const result = await fetch(
      'https://api.edu.cdek.ru/v2/calculator/tarifflist',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: req.headers.authorization,
        },
      },
    )
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
    if (result.errors) {
      throw new BadRequestException(result.errors);
    }
    return result;
  }
  async registrationOrder(req) {
    const result = await fetch('https://api.edu.cdek.ru/v2/orders', {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: req.headers.authorization,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
    if (result.errors) {
      throw new BadRequestException(result.errors);
    }
    if (result.requests.state) {
      throw new BadRequestException(result.request.errors);
    }
    return result;
  }
  async getInformationAboutOrder(req) {
    const result = await fetch(
      'https://api.cdek.ru/v2/orders/' +
        '/72753033-1cf5-447c-a420-c29f4b488ac6',
      {
        method: 'GET',
        headers: {
          Authorization: req.headers.authorization,
        },
      },
    )
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
    if (result.errors) {
      throw new BadRequestException(result.errors);
    }
    if (result.requests.state) {
      throw new BadRequestException(result.request.errors);
    }
    return result;
  }
}
