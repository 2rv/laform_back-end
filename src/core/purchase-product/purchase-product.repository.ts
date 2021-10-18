import { EntityRepository, Repository } from 'typeorm';
import { PurchaseProductEntity } from './purchase-product.entity';

@EntityRepository(PurchaseProductEntity)
export class PurchaseProductRepository extends Repository<PurchaseProductEntity> {
  async getOneProductForUser(
    id: string,
    userId: number,
  ): Promise<PurchaseProductEntity> {
    return await this.createQueryBuilder('purchase_product')
      .leftJoin('purchase_product.purchase', 'purchase')

      .leftJoin('purchase_product.optionId', 'option')
      .leftJoin('option.filePdf', 'option_filePdf')

      .leftJoin('purchase_product.masterClassId', 'master_class')
      .leftJoin('master_class.images', 'master_class_images')
      .leftJoin('master_class.categories', 'master_class_categories')

      .leftJoin('purchase_product.patternProductId', 'pattern_product')
      .leftJoin('pattern_product.images', 'pattern_product_images')
      .leftJoin('pattern_product.categories', 'pattern_product_categories')
      .leftJoin('pattern_product.filePdf', 'pattern_product_filePdf')

      .leftJoin('purchase_product.sewingProductId', 'sewing_product')
      .leftJoin('sewing_product.images', 'sewing_product_images')
      .leftJoin('sewing_product.categories', 'sewing_product_categories')

      .select([
        'purchase',
        'purchase_product.id',
        'purchase_product.createdDate',
        'purchase_product.type',
        'purchase_product.totalCount',
        'purchase_product.totalLength',
        'purchase_product.totalDiscount',
        'purchase_product.totalPrice',

        'master_class.id',
        'master_class.createdDate',
        'master_class.vendorCode',
        'master_class.titleRu',
        'master_class.titleEn',
        'master_class.modifierRu',
        'master_class.modifierEn',
        'master_class.articleRu',
        'master_class.articleEn',
        'master_class.descriptionRu',
        'master_class.descriptionEn',
        'master_class.type',
        'master_class_images',
        'master_class_categories',

        'pattern_product.id',
        'pattern_product.optionType',
        'pattern_product.vendorCode',
        'pattern_product.id',
        'pattern_product.titleRu',
        'pattern_product.titleEn',
        'pattern_product.modifierRu',
        'pattern_product.modifierEn',
        'pattern_product.descriptionRu',
        'pattern_product.descriptionEn',
        'pattern_product.materialRu',
        'pattern_product.materialEn',
        'pattern_product.complexity',
        'pattern_product.type',
        'pattern_product.discount',
        'pattern_product.price',
        'pattern_product_images',
        'pattern_product_categories',
        'pattern_product_filePdf',

        'sewing_product.id',
        'sewing_product.optionType',
        'sewing_product.vendorCode',
        'sewing_product.discount',
        'sewing_product.price',
        'sewing_product.count',
        'sewing_product.length',
        'sewing_product.titleRu',
        'sewing_product.titleEn',
        'sewing_product.modifierRu',
        'sewing_product.modifierEn',
        'sewing_product.descriptionRu',
        'sewing_product.descriptionEn',
        'sewing_product.type',
        'sewing_product_images',
        'sewing_product_categories',

        'option.id',
        'option.vendorCode',
        'option.size',
        'option.colorRu',
        'option.colorEn',
        'option_filePdf',
      ])

      .where('purchase_product.id = :id', { id })
      .andWhere('purchase.userId = :userId', { userId })
      .getOne();
  }

  async getOneMasterClass(id: string): Promise<PurchaseProductEntity> {
    return await this.createQueryBuilder('purchase_product')
      .leftJoin('purchase_product.masterClassId', 'master_class')
      .leftJoin('master_class.images', 'master_class_images')
      .leftJoin('master_class.categories', 'master_class_categories')
      .select([
        'purchase_product.id',
        'purchase_product.createdDate',
        'purchase_product.type',
        'purchase_product.totalCount',
        'purchase_product.totalLength',
        'purchase_product.totalDiscount',
        'purchase_product.totalPrice',

        'master_class.id',
        'master_class.createdDate',
        'master_class.vendorCode',
        'master_class.titleRu',
        'master_class.titleEn',
        'master_class.modifierRu',
        'master_class.modifierEn',
        'master_class.articleRu',
        'master_class.articleEn',
        'master_class.descriptionRu',
        'master_class.descriptionEn',
        'master_class.type',
        'master_class_images',
        'master_class_categories',
      ])

      .where('purchase_product.id = :id', { id })
      .getOne();
  }
}
