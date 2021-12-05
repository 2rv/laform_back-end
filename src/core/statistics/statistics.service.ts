import { Injectable } from '@nestjs/common';
import { PurchaseProductRepository } from '../purchase-product/purchase-product.repository';
import { StatisticType } from './enum/statistic.enum';
import { PurchaseRepository } from '../purchase/purchase.repository';
import { UserRepository } from '../user/user.repository';
import { PageNavigationRepository } from '../page-navigation/page-navigation.repository';

@Injectable()
export class StatisticsService {
  constructor(
    private purchaseProductRepository: PurchaseProductRepository,
    private purchaseRepository: PurchaseRepository,
    private userRepository: UserRepository,
    private pageNavigationRepository: PageNavigationRepository,
  ) {}

  async priceStatistic(from: Date, to: Date, type: StatisticType) {
    const products = await this.purchaseProductRepository.statistics(
      from,
      to,
      type,
    );

    const array = products.map((result) => {
      const [day, month, year] = new Intl.DateTimeFormat()
        .format(result.createDate)
        .split('.');
      return {
        date: `${month}-${day}-${year}`,
        price: +result.totalPrice * (+result.totalCount || +result.totalLength),
      };
    });

    return Object.values(
      array.reduce((r, e) => {
        if (!r[e.date]) r[e.date] = Object.assign({}, e);
        else r[e.date].price += e.price;
        return r;
      }, {}),
    );
  }

  async countStatistic(from: Date, to: Date, type: StatisticType) {
    const products = await this.purchaseProductRepository.statistics(
      from,
      to,
      type,
    );

    const array = products.map((result) => {
      const [day, month, year] = new Intl.DateTimeFormat()
        .format(result.createDate)
        .split('.');
      return {
        date: `${month}-${day}-${year}`,
        count: +result.totalCount || 1,
      };
    });

    return Object.values(
      array.reduce((r, e) => {
        if (!r[e.date]) r[e.date] = Object.assign({}, e);
        else r[e.date].count += e.count;
        return r;
      }, {}),
    );
  }

  async userStatistic(from: Date, to: Date) {
    const results = await this.userRepository.statistics(from, to);

    const array = results.map((result) => {
      const [day, month, year] = new Intl.DateTimeFormat()
        .format(result.createDate)
        .split('.');
      return {
        date: `${month}-${day}-${year}`,
      };
    });

    const counter = array.reduce((o, i) => {
      if (!o.hasOwnProperty(i.date)) {
        o[i.date] = 0;
      }
      o[i.date]++;
      return o;
    }, {});
    return Object.keys(counter).map((date) => {
      return { date: date, users: counter[date] };
    });
  }

  async generalStatistic(from: Date, to: Date, type: StatisticType) {
    let totalCount = 0;
    let totalPrice = 0;
    let printCount = 0;
    let electronicCount = 0;

    const orders = await this.purchaseRepository.statistics(from, to);
    for (let order of orders) {
      totalPrice += +order.price;
    }

    const products = await this.purchaseProductRepository.statistics(
      from,
      to,
      type,
    );
    for (let product of products) {
      totalCount += product.totalCount;
    }

    const printPurchaseProducts =
      await this.purchaseProductRepository.statistics(
        from,
        to,
        StatisticType.PrintProduct,
      );
    for (let printPurchaseProduct of printPurchaseProducts) {
      printCount += printPurchaseProduct.totalCount;
    }
    const electronicPurchaseProducts =
      await this.purchaseProductRepository.statistics(
        from,
        to,
        StatisticType.ElectronicProduct,
      );
    for (let electronicPurchaseProduct of electronicPurchaseProducts) {
      electronicCount += electronicPurchaseProduct.totalCount;
    }

    return {
      totalOrders: orders.length, // всего заказов (только для общей статистики)
      averagePrice: totalPrice / orders.length, // средняя цена за заказ (только для общей статистики)
      totalCount, // общее количество купленных продуктов по типу
      totalPrice, // общая цена купленных продуктов по типу
      printCount, // цена по физическим товарам (только для общей статистики)
      electronicCount, // цена по электронным товарам (только для общей статистики)
    };
  }

  async pageStatistic(from: Date, to: Date, type: StatisticType) {
    const products = await this.pageNavigationRepository.statistics(
      from,
      to,
      type,
    );

    const array = products.map((result) => {
      let id;
      if (result.masterClassId) {
        id = result.masterClassId.id;
      }
      if (result.patternProductId) {
        id = result.patternProductId.id;
      }
      if (result.sewingProductId) {
        id = result.sewingProductId.id;
      }
      return {
        id: id,
        count: +result.count || 1,
      };
    });

    return Object.values(
      array.reduce((r, e) => {
        if (!r[e.id]) r[e.id] = Object.assign({}, e);
        else r[e.id].count += e.count;
        return r;
      }, {}),
    );
  }
}

// const array = products.map((item) => {
//   return {
//     date: new Intl.DateTimeFormat().format(item.createdDate),
//     price: +item.totalPrice * (+item.totalCount || +item.totalLength),
//   };
// });

// Count метод старый вариант
// const array = [];
// for (let result of results) {
//   result.createdDate = new Intl.DateTimeFormat().format(result.createdDate);
//   const data = {
//     date: result.createdDate,
//     count: +result.totalCount || 1,
//   };
//   array.push(data);
// }
//  const newArray = [
//   {
//     data: array,
//   },
// ];
// const newData = newArray.map(({ data }) => {
//   return {
//     data: Object.values(
//       data.reduce((r, e) => {
//         if (!r[e.date]) r[e.date] = Object.assign({}, e);
//         else r[e.date].count += e.count;
//         return r;
//       }, {}),
//     ),
//   };
// });
// return newData;

// Price старый вариант
// const array = [];
// for (let result of results) {
//   result.createdDate = new Intl.DateTimeFormat().format(result.createdDate);
//   const data = {
// 	date: result.createdDate,
// 	price: +result.totalPrice,
//   };
//   array.push(data);
// }

// const newArray = [
//   {
// 	data: array,
//   },
// ];

// const newData = newArray.map(({ data }) => {
//   return {
// 	data: Object.values(
// 	  data.reduce((r, e) => {
// 		if (!r[e.date]) r[e.date] = Object.assign({}, e);
// 		else r[e.date].price += e.price;
// 		return r;
// 	  }, {}),
// 	),
//   };
// });

// return newData;
