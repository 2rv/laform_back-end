import { Injectable } from '@nestjs/common';

import { PurchaseProductRepository } from '../purchase-product/purchase-product.repository';
import { StatisticType } from './enum/statistic.enum';
import { PurchaseRepository } from '../purchase/purchase.repository';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class StatisticsService {
  constructor(
    private purchaseProductRepository: PurchaseProductRepository,
    private purchaseRepository: PurchaseRepository,
    private userRepository: UserRepository,
  ) {}

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

  async userStatistic(from: Date, to: Date) {
    const array = [];

    const results = await this.userRepository.statistics(from, to);

    for (let result of results) {
      result.createDate = new Intl.DateTimeFormat().format(result.createDate);
      const data = {
        date: result.createDate,
      };
      array.push(data);
    }

    const counter = array.reduce((o, i) => {
      if (!o.hasOwnProperty(i.date)) {
        o[i.date] = 0;
      }
      o[i.date]++;
      return o;
    }, {});
    const result = Object.keys(counter).map((date) => {
      return { date: date, sum: counter[date] };
    });

    return result;
  }

  async generalStatistic(from: Date, to: Date) {
    let purchaseProductsCount = 0;
    let purchaseProductsTotalPrice = 0;
    let materialPurchaseProductsCount = 0;
    let notMaterialPurchaseProductsCount = 0;

    const purchaseProducts = await this.purchaseProductRepository.statistics(
      from,
      to,
      StatisticType.All,
    );
    const purchases = await this.purchaseRepository.statistics(from, to);
    const materialPurchaseProducts =
      await this.purchaseProductRepository.statistics(
        from,
        to,
        StatisticType.MaterialProduct,
      );
    const notMaterialPurchaseProducts =
      await this.purchaseProductRepository.statistics(
        from,
        to,
        StatisticType.NotMaterialProduct,
      );

    for (let purchaseProduct of purchaseProducts) {
      purchaseProductsCount += purchaseProduct.totalCount;
    }
    for (let purchase of purchases) {
      purchaseProductsTotalPrice += purchase.price;
    }
    for (let materialPurchaseProduct of materialPurchaseProducts) {
      materialPurchaseProductsCount += materialPurchaseProduct.totalCount;
    }
    for (let notMaterialPurchaseProduct of notMaterialPurchaseProducts) {
      notMaterialPurchaseProductsCount += notMaterialPurchaseProduct.totalCount;
    }

    return {
      purchaseProductsCount,
      purchaseProductsTotalPrice,
      materialPurchaseProductsCount,
      notMaterialPurchaseProductsCount,
    };
  }
}
