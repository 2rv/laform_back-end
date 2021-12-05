import { SdekService } from './../sdek/sdek.service';
import {
  Controller,
  UseGuards,
  Get,
  Query,
  Req,
  Res,
  Post,
  Body,
} from '@nestjs/common';
import { Roles } from '../user/decorator/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { USER_ROLE } from '../user/enum/user-role.enum';
import axios from 'axios';

const request = require('request-promise');
const fs = require('fs');
const path = require('path');

@Controller('pdf')
export class PdfController {
  constructor(private sdekService: SdekService) {}

  @Post('aws')
  @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async amzaonPDF(@Body() body, @Res() res) {
    request
      .get({
        url: body.url,
        encoding: null,
      })
      .then((response) => {
        try {
          const dir = './output';

          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          const date = new Date();
          fs.writeFileSync('./output/' + date + '.pdf', response);
          console.log('Success in writing file');

          const filePath = path.join(
            __dirname,
            '../../../output/' + date + '.pdf',
          );

          res.sendFile(filePath, (err) => {
            if (err) {
              console.log(err);
            }
            fs.unlinkSync(filePath, () => {
              console.log('File was deleted');
            });
          });
        } catch (err) {
          console.log('Error in writing file');
          console.log(err);
        }
      });
  }

  @Post('sdek')
  @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async sdekPDF(@Body() body, @Res() res) {
    try {
      const response = await axios.get(body.url, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
          Authorization: await this.sdekService.authInSdek(),
        },
      });
      res.end(response.data);
    } catch (error) {
      console.log(error);
    }
    //     request
    //       .get({
    //         url: body.url,
    //         encoding: null,
    //         headers: {
    //           'Content-Type': 'application/json',
    //           Authorization: await this.sdekService.authInSdek(),
    //         },
    //       })
    //       .then((response) => {
    //         try {
    //           const dir = './output';

    //           if (!fs.existsSync(dir)) {
    //             fs.mkdirSync(dir, { recursive: true });
    //           }
    //           const date = new Date();
    //           console.log(response);

    //           fs.writeFileSync('./output/' + date + '.pdf', response);
    //           console.log('Success in writing file');

    //           const filePath = path.join(
    //             __dirname,
    //             '../../../output/' + date + '.pdf',
    //           );

    //           res.sendFile(filePath, (err) => {
    //             if (err) {
    //               console.log(err);
    //             }
    //             fs.unlinkSync(filePath, () => {
    //               console.log('File was deleted');
    //             });
    //           });
    //         } catch (err) {
    //           console.log('Error in writing file');
    //           console.log(err);
    //         }
    //       });
  }
}
