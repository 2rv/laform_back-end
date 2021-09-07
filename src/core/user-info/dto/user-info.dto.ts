import { DELIVERY_TYPE } from '../enum/delivery-type.enum';

export interface UserInfoDto {
  fullName: string;
  phone: string;
  location: string;
  deliveryType: DELIVERY_TYPE;
}
