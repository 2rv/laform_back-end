import { Injectable } from '@nestjs/common';

import { PurchaseProductRepository } from '../purchase-product/purchase-product.repository';
import { StatisticType } from './enum/statistic.enum';

@Injectable()
export class StatisticsService {
  constructor(private purchaseProductRepository: PurchaseProductRepository) {}

  async priceStatistic(from: Date, to: Date, type: StatisticType) {
    const array = [];

    const results = await this.purchaseProductRepository.statistics(
      from,
      to,
      +type,
    );

    for (let result of results) {
      result.createdDate = new Intl.DateTimeFormat().format(result.createdDate);
      const data = {
        date: result.createdDate,
        price: +result.totalPrice,
      };
      array.push(data);
    }

    const newArray = [
      {
        data: array,
      },
    ];

    const newData = newArray.map(({ data }) => {
      return {
        data: Object.values(
          data.reduce((r, e) => {
            if (!r[e.date]) r[e.date] = Object.assign({}, e);
            else r[e.date].price += e.price;
            return r;
          }, {}),
        ),
      };
    });
    return newData;
  }

  async countStatistic(from: Date, to: Date, type: StatisticType) {
    const array = [];

    const results = await this.purchaseProductRepository.statistics(
      from,
      to,
      type,
    );

    for (let result of results) {
      result.createdDate = new Intl.DateTimeFormat().format(result.createdDate);
      const data = {
        date: result.createdDate,
        count: +result.totalCount,
      };
      array.push(data);
    }

    const newArray = [
      {
        data: array,
      },
    ];

    const newData = newArray.map(({ data }) => {
      return {
        data: Object.values(
          data.reduce((r, e) => {
            if (!r[e.date]) r[e.date] = Object.assign({}, e);
            else r[e.date].count += e.count;
            return r;
          }, {}),
        ),
      };
    });
    return newData;
  }
}
