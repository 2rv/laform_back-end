import { DELIVERY_TYPE } from '../enum/delivery-type.enum';

export interface UserDeliveryInfoDto {
  fullname: string;
  phone: string;
  location: string;
  deliveryType: DELIVERY_TYPE;
}
