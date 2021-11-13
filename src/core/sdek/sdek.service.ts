import { Repository } from 'typeorm';
import fetch from 'cross-fetch';
import { stringify } from 'querystring';
import { SdekConfig } from 'src/config/sdek.config';
import {
  Injectable,
  Response,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class SdekService {
  async authInSdek(grant_type: string): Promise<any> {
    const data = {
      grant_type: grant_type,
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
    return result;
  }
  async CalculationByTariffCode(req) {
    const data: any = {
      type: req.body.type,
      date: req.body.date,
      currency: req.body.currency,
      tariff_code: req.body.tariff_code,
      from_location: req.body.from_location,
      to_location: req.body.to_location,
      services: req.body.services,
      packages: req.body.packages,
    };
    if (!data) {
      return;
    }
    console.log(data);
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
    return result;
  }
  async CalculationForAnAvailableTariffCode(req) {
    const data: any = {
      from_location: req.body.from_location,
      to_location: req.body.to_location,
      packages: req.body.packages,
    };
    if (!data) {
      return;
    }
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
    return result;
  }
 }
