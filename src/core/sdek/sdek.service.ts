import { SdekConfig } from 'src/config/sdek.config';
import { SdekDto } from './dto/sdek.dto';
import fetch from 'cross-fetch';
import { stringify } from 'querystring';
import { SdekUpdateDto } from './dto/sdekUpdate.dto';
import { SdekPackagesDto } from './dto/sdekPackages.dto';
import { SdekOrderDto } from './dto/sdekOrder.dto';
import axios from 'axios';
import { SdekPdfDto } from './dto/sdekPdf.dto';
import { SdekCourierDto } from './dto/sdek.courier.dto';

import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SdekBarcoderDto } from './dto/sdek.barcode.dto';
import { SdekCalculateDto } from './dto/sdekCalculate.dto';

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
  async сalculationByTariffCode(body: SdekCalculateDto) {
    const fromLocation = {
      city: SdekConfig.from_location.city,
      adress: SdekConfig.from_location.address,
      code: SdekConfig.from_location.code,
    };
    const productProp = {
      weight: SdekConfig.weight * body.amount,
      height: SdekConfig.height,
      width: SdekConfig.width,
      length: SdekConfig.length,
    };
    body.packages.push(productProp);
    body.from_location = fromLocation;
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
      adress: SdekConfig.from_location.address,
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
      const cityByKladrCode = await axios.post(
        `https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/delivery`,
        {
          query: kladr_code,
        },
        {
          headers: {
            Authorization: SdekConfig.tokenByKladr,
          },
        },
      );
      if (cityByKladrCode.data.suggestions == '') {
        return [];
      }
      const getOffices = await axios.get(
        `https://api.cdek.ru/v2/deliverypoints?city_code=${cityByKladrCode.data.suggestions[0].data.cdek_id}`,
        {
          headers: {
            Authorization: await this.authInSdek(),
          },
        },
      );
      return getOffices.data || [];
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async createOrder(body: any) {
    const data = {
      city: SdekConfig.from_location.city,
      address: SdekConfig.from_location.address,
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
  async editOrder(body: SdekUpdateDto) {
    const data: SdekPackagesDto = {
      height: SdekConfig.height,
      length: SdekConfig.length,
      weight: SdekConfig.weight,
      width: SdekConfig.width,
    };
    body.packages.push(data);
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
  async createPdfReceipt(body: SdekPdfDto): Promise<Buffer> {
    try {
      const createPdf = await fetch('https://api.edu.cdek.ru/v2/print/orders', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: await this.authInSdek(),
        },
      });
      if (!createPdf) {
        return undefined;
      }
      const result = await createPdf.json();
      const getUrlByPdf: any = await fetch(
        'https://api.edu.cdek.ru/v2/print/orders/' + result.entity.uuid,
        {
          method: 'GET',
          headers: {
            Authorization: await this.authInSdek(),
          },
        },
      );
      const url = await getUrlByPdf.json();
      const response = await axios.get(url.entity.url, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
          Authorization: await this.authInSdek(),
        },
      });
      return response.data;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
  async createCourier(body: SdekCourierDto) {
    try {
      const createCourier = await fetch('https://api.edu.cdek.ru/v2/intakes', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: await this.authInSdek(),
        },
      });
      const result = await createCourier.json();
      if (result.entity.uuid == null) {
        return [];
      }
      const getInformation = await fetch(
        'https://api.edu.cdek.ru/v2/intakes/' + result.entity.uuid,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: await this.authInSdek(),
          },
        },
      );
      return getInformation.json();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
  async createBarcode(body: SdekBarcoderDto) {
    try {
      const createBarcode = await fetch(
        'https://api.edu.cdek.ru/v2/print/barcodes',
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
            Authorization: await this.authInSdek(),
          },
        },
      );
      const result = await createBarcode.json();
      if (result.entity.uuid == null) {
        return [];
      }
      const getBarcode = await fetch(
        'https://api.edu.cdek.ru/v2/print/barcodes/' + result.entity.uuid,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: await this.authInSdek(),
          },
        },
      );
      const data = {
        information: await getBarcode.json(),
        token: await this.authInSdek(),
      };
      return data;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
