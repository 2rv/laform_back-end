// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   BadRequestException,
// } from '@nestjs/common';

// import { SdekRepository } from '../sdek.repository';
// import { FILE_UPLOAD_ERROR } from '../enum/sdek.enum';

// @Injectable()
// export class SdekGuard implements CanActivate {
//   constructor(private fileUploadRepository: SdekRepository) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const { params } = request;

//     if (!params.fileId) {
//       throw new BadRequestException();
//     }

//     const file = await this.fileUploadRepository.findOne({
//       where: { id: params.fileId },
//     });

//     if (!file) {
//       throw new BadRequestException(FILE_UPLOAD_ERROR.FILE_NOT_FOUND);
//     }
//     request.fileId = params.fileId;
//     return true;
//   }
// }
