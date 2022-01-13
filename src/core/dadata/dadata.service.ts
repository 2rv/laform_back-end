import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { DadataConfig } from 'src/config/dadata.config';
import { DadataDto } from './dto/dadata.dto';

const dadataApi = axios.create({
  baseURL: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs',
  method: 'POST',
  headers: {
    Authorization: DadataConfig.apiToken,
  },
});

@Injectable()
export class DadataService {
  async getCityCodeByKladr(kladr_code: string): Promise<any[]> {
    const response = await dadataApi({
      url: 'findById/delivery',
      data: {
        query: kladr_code,
      },
    });

    return response.data.suggestions || [];

    // await axios.post(
    //   `https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/delivery`,
    //   {
    //     query: kladr_code,
    //   },
    //   {
    //     headers: {
    //       Authorization: DadataConfig.apiToken,
    //     },
    //   },
    // );

    // const suggestions = response.data.suggestions;
    // if (!suggestions.length) return [];
    // return suggestions[0].data.cdek_id;
  }

  async getPostalCode(value: string): Promise<any[]> {
    const response = await dadataApi({
      url: 'suggest/postal_office',
      data: {
        query: value,
      },
    });

    return response.data.suggestions || [];

    // return response.data.suggestions.map((item: any) => ({
    //   label: `${item.data.region}, ${
    //     item.data.city ? item.data.city + ', ' : ''
    //   }
    // 	${item.data.settlement ? item.data.settlement + ', ' : ''} ${
    //     item.data.index
    //   }.`.toLocaleLowerCase(),
    //   postal_code: item.data.index,
    // }));
  }

  async getCountry(value: string): Promise<any[]> {
    const response = await dadataApi({
      url: 'suggest/address',
      data: {
        query: value,
        count: 20,
        from_bound: { value: 'country' },
        to_bound: { value: 'country' },
        locations: [
          {
            country_iso_code: '*',
          },
        ],
      },
    });

    return response.data.suggestions || [];

    // return response.data.suggestions.map((item: any) => ({
    //   label: item.value,
    //   country: item.data.country,
    //   country_iso_code: item.data.country_iso_code,
    // }));
  }

  async getCity(query: DadataDto): Promise<any[]> {
    const response = await dadataApi({
      url: 'suggest/address',
      data: {
        query: query.value,
        count: 20,
        from_bound: { value: 'city' },
        to_bound: { value: 'settlement' },
        locations: query.locations,
      },
    });

    return response.data.suggestions || [];

    // return response.data.suggestions.map((item: any) => ({
    //   label: item.value,
    //   city: item.data.city_with_type,
    //   settlement: item.data.settlement_with_type,
    //   kladr_id: item.data.kladr_id,
    //   fias_id: item.data.fias_id,
    //   fias_level: item.data.fias_level,
    // }));
  }

  async getStreet(query: DadataDto): Promise<any[]> {
    const response = await dadataApi({
      url: 'suggest/address',
      data: {
        query: query.value,
        count: 20,
        from_bound: { value: 'street' },
        to_bound: { value: 'street' },
        locations: query.locations,
      },
    });

    return response.data.suggestions || [];

    // return response.data.suggestions.map((item: any) => ({
    //   label: item.value,
    //   street: item.data.street_with_type,
    //   fias_id: item.data.fias_id,
    //   fias_level: item.data.fias_level,
    // }));
  }

  async getHouse(query: DadataDto): Promise<any[]> {
    const response = await dadataApi({
      url: 'suggest/address',
      data: {
        query: query.value,
        count: 20,
        from_bound: { value: 'house' },
        to_bound: { value: 'house' },
        locations: query.locations,
      },
    });
    return response.data.suggestions || [];

    // return response.data.suggestions.map((item: any) => {
    //   const house = `${item.data.house_type ? item.data.house_type : ''}. ${
    //     item.data.house ? item.data.house : ''
    //   } ${item.data.block_type ? item.data.block_type + '.' : ''} ${
    //     item.data.block ? item.data.block : ''
    //   }`;
    //   return {
    //     label: house,
    //     house: house,
    //     fias_id: item.data.fias_id,
    //     fias_level: item.data.fias_level,
    //   };
    // });
  }
}
