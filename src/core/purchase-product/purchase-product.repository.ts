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

      .leftJoin('purchase_product.program', 'program')
      .leftJoin('purchase_product.size', 'size')
      .leftJoin('purchase_product.color', 'color')
      .leftJoin('purchase_product.masterClassId', 'master_class')
      .leftJoin('master_class.images', 'master_class_images')
      .leftJoin('master_class.categories', 'master_class_categories')
      .leftJoin('purchase_product.patternProductId', 'pattern_product')
      .leftJoin('pattern_product.images', 'pattern_product_images')
      .leftJoin('pattern_product.categories', 'pattern_product_categories')
      .leftJoin('purchase_product.sewingProductId', 'sewing_product')
      .leftJoin('sewing_product.images', 'sewing_product_images')
      .leftJoin('sewing_product.categories', 'sewing_product_categories')
      .leftJoin('size.filePdf', 'size_file_pdf')
      .select([
        'purchase',
        'purchase_product.id',
        'purchase_product.createdDate',
        'purchase_product.type',
        'purchase_product.totalCount',
        'purchase_product.totalDiscount',
        'purchase_product.totalPrice',

        'master_class.id',
        'master_class.titleRu',
        'master_class.titleEn',
        'master_class.descriptionRu',
        'master_class.descriptionEn',
        'master_class.type',
        'master_class_images.fileUrl',
        'master_class_categories',

        'pattern_product.id',
        'pattern_product.titleRu',
        'pattern_product.titleEn',
        'pattern_product.descriptionRu',
        'pattern_product.descriptionEn',
        'pattern_product.materialRu',
        'pattern_product.type',
        'pattern_product_images.fileUrl',
        'pattern_product_categories',

        'sewing_product.id',
        'sewing_product.titleRu',
        'sewing_product.titleEn',
        'sewing_product.descriptionRu',
        'sewing_product.descriptionEn',
        'sewing_product.type',
        'sewing_product_images.fileUrl',
        'sewing_product_categories',

        'program.id',
        'program.vendorCode',
        'program.programNameRu',
        'program.programNameEn',
        'program.price',
        'program.articleText',

        'color',
        'size.id',
        'size.vendorCode',
        'size.count',
        'size.size',
        'size.price',
        'size_file_pdf',
      ])

      .where('purchase_product.id = :id', { id })
      .where('purchase.userId = :userId', { userId })
      .getOne();
  }

  async getOneMasterClass(id: string): Promise<PurchaseProductEntity> {
    return await this.createQueryBuilder('purchase_product')
      .leftJoin('purchase_product.program', 'program')
      .leftJoin('purchase_product.masterClassId', 'master_class')
      .select([
        'purchase_product.id',
        'purchase_product.createdDate',

        'master_class.id',
        'master_class.titleRu',
        'master_class.titleEn',
        'master_class.type',

        'program.id',
        'program.vendorCode',
        'program.programNameRu',
        'program.programNameEn',
        'program.articleText',
      ])

      .where('purchase_product.id = :id', { id })
      .getOne();
  }
}
