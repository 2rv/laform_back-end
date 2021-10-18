import { PurchaseEntity } from './purchase.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PurchaseEntity)
export class PurchaseRepository extends Repository<PurchaseEntity> {
  async getAll(size: number, page: number): Promise<PurchaseEntity[]> {
    // const take = size || 10;
    // const skip = (page - 1) * size || 0;
    // .limit(take)
    // .offset(skip)

    return await this.createQueryBuilder('purchase')
      .leftJoin('purchase.userId', 'user')
      .loadRelationCountAndMap(
        'purchase.purchaseProductsCount',
        'purchase.purchaseProducts',
      )
      .select(['purchase', 'user.id'])
      .getMany();
  }

  async getAllForUser(
    size: number,
    page: number,
    userId,
  ): Promise<PurchaseEntity[]> {
    // const take = size || 10;
    // const skip = (page - 1) * size || 0;
    // .limit(take)
    // .offset(skip)

    return await this.createQueryBuilder('purchase')
      .leftJoin('purchase.purchaseProducts', 'purchase_products')

      .leftJoin('purchase_products.masterClassId', 'master_class')
      .leftJoin('master_class.images', 'm_c_images')
      .leftJoin('master_class.categories', 'm_c_categories')

      .leftJoin('purchase_products.patternProductId', 'pattern_product')
      .leftJoin('pattern_product.images', 'p_p_images')
      .leftJoin('pattern_product.categories', 'p_p_categories')
      .leftJoin('pattern_product.filePdf', 'p_p_file_pdf')

      .leftJoin('purchase_products.sewingProductId', 'sewing_product')
      .leftJoin('sewing_product.images', 's_p_images')
      .leftJoin('sewing_product.categories', 's_p_categories')

      .leftJoin('purchase_products.optionId', 'option')
      .leftJoin('option.filePdf', 'option_file_pdf')

      .select([
        'purchase.id',
        'purchase.orderStatus',
        'purchase.city',
        'purchase.fullName',
        'purchase.phoneNumber',
        'purchase.email',

        'purchase_products',

        'master_class.id',
        'master_class.type',
        'master_class.titleRu',
        'master_class.titleEn',
        'master_class.price',
        'master_class.discount',
        'm_c_categories',
        'm_c_categories.id',
        'm_c_categories.categoryNameRu',
        'm_c_categories.categoryNameEn',

        'pattern_product.id',
        'pattern_product.type',
        'pattern_product.titleRu',
        'pattern_product.titleEn',
        'pattern_product.price',
        'pattern_product.discount',
        'pattern_product.count',
        'p_p_file_pdf',
        'p_p_images',
        'p_p_categories.id',
        'p_p_categories.categoryNameRu',
        'p_p_categories.categoryNameEn',

        'sewing_product.id',
        'sewing_product.type',
        'sewing_product.titleRu',
        'sewing_product.titleEn',
        'sewing_product.price',
        'sewing_product.discount',
        'sewing_product.count',
        'sewing_product.length',
        's_p_images',
        's_p_categories.id',
        's_p_categories.categoryNameRu',
        's_p_categories.categoryNameEn',

        'option.id',
        'option.vendorCode',
        'option.size',
        'option_file_pdf',
        'option.colorRu',
        'option.colorEn',
        'option.count',
        'option.length',
        'option.price',
        'option.discount',
      ])
      .where('purchase.userId = :userId', { userId })
      .getMany();
  }

  async getOne(id: string): Promise<PurchaseEntity> {
    return await this.createQueryBuilder('purchase')
      .leftJoin('purchase.purchaseProducts', 'purchase_products')

      .leftJoin('purchase_products.masterClassId', 'master_class')
      .leftJoin('master_class.images', 'm_c_images')
      .leftJoin('master_class.categories', 'm_c_categories')

      .leftJoin('purchase_products.patternProductId', 'pattern_product')
      .leftJoin('pattern_product.images', 'p_p_images')
      .leftJoin('pattern_product.categories', 'p_p_categories')
      .leftJoin('pattern_product.filePdf', 'p_p_file_pdf')

      .leftJoin('purchase_products.sewingProductId', 'sewing_product')
      .leftJoin('sewing_product.images', 's_p_images')
      .leftJoin('sewing_product.categories', 's_p_categories')

      .leftJoin('purchase_products.optionId', 'option')
      .leftJoin('option.filePdf', 'option_file_pdf')

      .select([
        'purchase.id',
        'purchase.orderNumber',
        'purchase.createdDate',
        'purchase.orderStatus',
        'purchase.userId',
        'purchase.email',
        'purchase.fullName',
        'purchase.city',
        'purchase.phoneNumber',
        'purchase.comment',
        'purchase.price',
        'purchase.promoCode',
        'purchase.promoCodeDiscount',

        'purchase_products.id',
        'purchase_products.createdDate',
        'purchase_products.totalCount',
        'purchase_products.totalLength',
        'purchase_products.totalDiscount',
        'purchase_products.totalPrice',

        'option.id',
        'option.vendorCode',
        'option.size',
        'option_file_pdf',
        'option.colorRu',
        'option.colorEn',
        'option.count',
        'option.length',
        'option.price',
        'option.discount',

        'master_class.id',
        'master_class.type',
        'master_class.titleRu',
        'master_class.titleEn',
        'master_class.price',
        'master_class.discount',
        'm_c_images',
        'm_c_categories',
        'm_c_categories.id',
        'm_c_categories.categoryNameRu',
        'm_c_categories.categoryNameEn',

        'pattern_product.id',
        'pattern_product.type',
        'pattern_product.titleRu',
        'pattern_product.titleEn',
        'pattern_product.price',
        'pattern_product.discount',
        'pattern_product.count',
        'p_p_file_pdf',
        'p_p_images',
        'p_p_categories.id',
        'p_p_categories.categoryNameRu',
        'p_p_categories.categoryNameEn',

        'sewing_product.id',
        'sewing_product.type',
        'sewing_product.titleRu',
        'sewing_product.titleEn',
        'sewing_product.price',
        'sewing_product.discount',
        'sewing_product.count',
        'sewing_product.length',
        's_p_images',
        's_p_categories.id',
        's_p_categories.categoryNameRu',
        's_p_categories.categoryNameEn',
      ])
      .where('purchase.id = :id', { id })
      .getOne();
  }
}
