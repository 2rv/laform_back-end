import { DELIVERY_TYPE } from '../enum/delivery-type.enum';
import { PAYMENT_TYPE } from '../enum/payment-type.enum';

export interface UserInfoDto {
  fullName: string;
  phone: string;
  location: string;
  deliveryType: DELIVERY_TYPE;
  paymentType: PAYMENT_TYPE;
}
