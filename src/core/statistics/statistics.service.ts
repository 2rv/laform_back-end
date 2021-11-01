import { Injectable } from '@nestjs/common';
import { PurchaseRepository } from '../purchase/purchase.repository';
import { StatisticsEntity } from './statistics.entity';
import { StatisticsRepository } from './statistics.repository';
import { PurchaseInfoDto } from './dto/statistics.dto';

@Injectable()
export class StatisticsService {
  constructor(
    private statisticsRepository: StatisticsRepository,
    private purchaseRepository: PurchaseRepository,
  ) {}

  async getPurchasesDataForPeriod() {
    const purchasesData: PurchaseInfoDto[] =
      await this.purchaseRepository.getPurchasesForPeriod();
    const result = purchasesData.reduce(
      (acc, item: PurchaseInfoDto) => {
        acc.price += getTotalPrice(
          Number(item.price),
          Number(item.promoCodeDiscount),
          Number(item.shippingPrice),
        );
        acc.products += Number(item.purchaseProductsCount);
        acc.orders += 1;
        return acc;
      },
      { price: 0, products: 0, orders: 0 },
    );
    return {
      ...result,
      arithmeticMeanOrders: result.price / result.orders,
    };
  }

  async getPurchasesMasterClassDataForPeriod() {
    const purchasesData: PurchaseInfoDto[] =
      await this.purchaseRepository.getMasterClassPurchasesInfo();
    const result = purchasesData.reduce(
      (acc, item: PurchaseInfoDto) => {
        item.purchaseProducts.forEach((itemProduct) => {
          acc.price += getTotalPrice(
            Number(itemProduct.totalPrice),
            Number(itemProduct.totalDiscount),
          );
          acc.products += itemProduct.totalCount;
        });
        acc.orders += 1;
        return acc;
      },
      { price: 0, products: 0, orders: 0 },
    );
    return result;
  }

  async getInfo() {
    const purchasesData: PurchaseInfoDto[] =
      await this.purchaseRepository.getStatisticsInfo();
    const result = purchasesData.reduce(
      (acc, item: PurchaseInfoDto) => {
        acc.totalPrice += getTotalPrice(
          item.price,
          item.promoCodeDiscount,
          item.shippingPrice,
        );
        acc.totalProducts += Number(item.purchaseProductsCount);
        acc.totalOrders += 1;

        item.purchaseProducts.forEach((item) => {
          const date =
            item.createdDate.getDate() +
            '.' +
            item.createdDate.getMonth() +
            '.' +
            item.createdDate.getFullYear();
          console.log(date);

          const res = acc.chartOrders.find((i) => i.date === date);
          if (res) {
            res.orders += item.totalCount ?? 1;
          } else {
            acc.chartOrders.push({ date: date, orders: 1 });
          }
          if (item.type === 0) {
            acc.masterClassPrice += getPrice(
              item.totalPrice,
              item.totalDiscount,
              item.totalCount,
              item.totalLength,
            );
            acc.masterClassProducts += item.totalCount;
          }
          if (item.type === 1) {
            acc.patternElectronicPrice += getPrice(
              item.totalPrice,
              item.totalDiscount,
              item.totalCount,
              item.totalLength,
            );
            acc.patternElectronicProducts += item.totalCount;
          }
          if (item.type === 2) {
            acc.patternPrintPrice += getPrice(
              item.totalPrice,
              item.totalDiscount,
              item.totalCount,
              item.totalLength,
            );
            acc.patternPrintProducts += item.totalCount ?? 1;
          }
          if (item.type === 3) {
            acc.sewingProductPrice += getPrice(
              item.totalPrice,
              item.totalDiscount,
              item.totalCount,
              item.totalLength,
            );
            acc.sewingProductProducts += item.totalCount ?? 1;
          }
        });
        acc.masterClassMean = acc.masterClassPrice / acc.masterClassProducts;
        acc.patternElectronicMean =
          acc.patternElectronicPrice / acc.patternElectronicProducts;
        acc.patternPrintMean = acc.patternPrintPrice / acc.patternPrintProducts;
        acc.sewingProductMean =
          acc.sewingProductPrice / acc.sewingProductProducts;
        return acc;
      },

      {
        totalPrice: 0,
        totalProducts: 0,
        totalOrders: 0,

        masterClassPrice: 0,
        masterClassProducts: 0,
        masterClassMean: 0,

        patternPrintPrice: 0,
        patternPrintProducts: 0,
        patternPrintMean: 0,

        patternElectronicPrice: 0,
        patternElectronicProducts: 0,
        patternElectronicMean: 0,

        sewingProductPrice: 0,
        sewingProductProducts: 0,
        sewingProductMean: 0,

        chartOrders: [],
      },
    );

    return {
      ...result,
      arithmeticMeanOrders: result.totalPrice / result.totalOrders,
    };
  }
}
function getTotalPrice(price = 0, discount = 0, shipping = 0) {
  return (
    Number(price) - (Number(price) * Number(discount)) / 100 + Number(shipping)
  );
}
function getPrice(price = 0, discount = 0, count = 0, length = 0) {
  return (
    (Number(price) - (Number(price) * Number(discount)) / 100) *
    (Boolean(length) ? Number(length) : Number(count))
  );
}
