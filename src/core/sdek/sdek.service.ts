import { SdekConfig } from 'src/config/sdek.config';
import { SdekDto } from './dto/sdek.dto';
import { SdekRepository } from './sdek.repository';

import {
  Injectable,
  Response,
  HttpCode,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

// Спроси женю по поводу метода запроса с другого бека
// у нас здесь есть axios если что
import fetch from 'cross-fetch';
import { stringify } from 'querystring';

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
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
    if (result.errors) {
      throw new InternalServerErrorException(result.errors);
    }
    return result;
  }
  // брать from_location из конфига/БазыДанных возьми любой рандомный адресс в СПБ
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
  //getTariff - Как проще назвать
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
  async registrationOrder(req: SdekDto) {
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
    if (result.error) {
      throw new InternalServerErrorException(result);
    }
    if (result.requst) {
      for (let exception of result.requests) {
        if (exception.errors) {
          throw new NotFoundException(exception.errors);
        }
      }
    }
    return result;
  }
  // id получать надо в controller так удобнее всем а здесь пишешь id: string dto для одного Id не нужен
  //  никогда не видел что бы ошибку искали перебором в js есть метод catch он не работает?
  async getInformationAboutOrder(req: SdekDto) {
    const { id } = req.query;
    const result = await fetch('https://api.cdek.ru/v2/orders/' + `${id}`, {
      method: 'GET',
      headers: {
        Authorization: req.headers.authorization,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
    for (let exception of result.requests) {
      if (exception.errors) {
        throw new NotFoundException(exception.errors);
      }
    }
    return result;
  }
}
