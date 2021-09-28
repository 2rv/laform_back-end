import { PurchaseEntity } from './purchase.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PurchaseEntity)
export class PurchaseRepository extends Repository<PurchaseEntity> {
  async getAll(size: number, page: number): Promise<PurchaseEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;

    return await this.createQueryBuilder('purchase')
      .leftJoin('purchase.userId', 'user')
      .loadRelationCountAndMap(
        'purchase.purchaseProductsCount',
        'purchase.purchaseProducts',
      )
      .select(['purchase', 'user.id'])
      .limit(take)
      .offset(skip)
      .getMany();
  }

  async getAllForUser(
    size: number,
    page: number,
    userId,
  ): Promise<PurchaseEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;

    return await this.createQueryBuilder('purchase')
      .leftJoin('purchase.purchaseProducts', 'purchase_products')
      .leftJoin('purchase_products.program', 'selected_program')
      .leftJoin('purchase_products.size', 'selected_size')
      .leftJoin('selected_size.filePdf', 'selected_size_file_pdf')
      .leftJoin('purchase_products.color', 'selected_color')
      .leftJoin('purchase_products.masterClassId', 'master_class')
      .leftJoin('master_class.images', 'master_class_images')
      .leftJoin('purchase_products.patternProductId', 'pattern_product')
      .leftJoin('pattern_product.images', 'pattern_product_images')
      .leftJoin('purchase_products.sewingProductId', 'sewing_product')
      .leftJoin('sewing_product.images', 'sewing_product_images')
      .leftJoin('sewing_product.categories', 'sewing_product_categories')
      .select([
        'purchase.orderStatus',
        'purchase.id',
        'purchase_products',

        'master_class.id',
        'master_class.titleRu',
        'master_class.titleEn',
        'master_class.type',
        'master_class_images.fileUrl',
        'sewing_product_categories',

        'pattern_product.id',
        'pattern_product.titleRu',
        'pattern_product.titleEn',
        'pattern_product.type',
        'pattern_product_images.fileUrl',

        'sewing_product.id',
        'sewing_product.titleRu',
        'sewing_product.titleEn',
        'sewing_product.type',
        'sewing_product_images.fileUrl',

        'selected_program.id',
        'selected_program.vendorCode',
        'selected_program.programNameRu',
        'selected_program.programNameEn',
        'selected_program.price',
        'selected_color',
        'selected_size.id',
        'selected_size.vendorCode',
        'selected_size.size',
        'selected_size.price',
        'selected_size_file_pdf',
      ])
      .where('purchase.userId = :userId', { userId })
      .limit(take)
      .offset(skip)
      .getMany();
  }

  async getOne(id: string): Promise<PurchaseEntity> {
    return await this.createQueryBuilder('purchase')
      .leftJoin('purchase.purchaseProducts', 'purchase_products')
      .leftJoin('purchase_products.program', 'selected_program')
      .leftJoin('purchase_products.size', 'selected_size')
      .leftJoin('purchase_products.color', 'selected_color')
      .leftJoin('purchase_products.masterClassId', 'master_class')
      .leftJoin('master_class.images', 'master_class_images')
      .leftJoin('purchase_products.patternProductId', 'pattern_product')
      .leftJoin('pattern_product.images', 'pattern_product_images')
      .leftJoin('purchase_products.sewingProductId', 'sewing_product')
      .leftJoin('sewing_product.images', 'sewing_product_images')
      .select([
        'purchase.id',
        'purchase.userId',
        'purchase.email',
        'purchase.fullName',
        'purchase.city',
        'purchase.phoneNumber',
        'purchase.comment',
        'purchase.price',
        'purchase.promoCode',
        'purchase.promoCodeDiscount',
        'purchase.orderNumber',
        'purchase_products.id',
        'purchase_products.totalCount',
        'purchase_products.totalDiscount',
        'purchase_products.totalPrice',

        'selected_program.id',
        'selected_program.vendorCode',
        'selected_program.programNameRu',
        'selected_program.programNameEn',
        'selected_program.price',
        'selected_color',
        'selected_size.id',
        'selected_size.vendorCode',
        'selected_size.size',
        'selected_size.price',

        'master_class.id',
        'master_class.titleRu',
        'master_class.titleEn',
        'master_class.type',
        'master_class_images.fileUrl',

        'pattern_product.id',
        'pattern_product.titleRu',
        'pattern_product.titleEn',
        'pattern_product.type',
        'pattern_product_images.fileUrl',

        'sewing_product.id',
        'sewing_product.titleRu',
        'sewing_product.titleEn',
        'sewing_product.type',
        'sewing_product_images.fileUrl',
      ])
      .where('purchase.id = :id', { id })
      .getOne();
  }
}
