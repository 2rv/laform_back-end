import { SetMetadata } from '@nestjs/common';

const IS_REQ_ALLOWED = 'isReqAllowed';
const NotBlockReq = () => SetMetadata(IS_REQ_ALLOWED, true);

export default {
  key: IS_REQ_ALLOWED,
  allowReq: NotBlockReq,
};
