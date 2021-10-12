import { Injectable } from '@nestjs/common';
import { DeliveryPriceEntity } from './delivery-price.entity';
import { DeliveryPriceRepository } from './delivery-price.repository';
import { CreateDeliveryPriceDto } from './dto/create-delivery-price.dto';

@Injectable()
export class DeliveryPriceService {
  constructor(private deliveryPriceRepository: DeliveryPriceRepository) {}

  async get(): Promise<DeliveryPriceEntity[]> {
    return await this.deliveryPriceRepository.find();
  }

  async create(body: CreateDeliveryPriceDto): Promise<void> {
    await this.deliveryPriceRepository.save(body);
  }

  async remove(id: string): Promise<void> {
    await this.deliveryPriceRepository.delete(id);
  }
}
