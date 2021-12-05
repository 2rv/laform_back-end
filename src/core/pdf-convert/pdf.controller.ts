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

const request = require('request-promise');
const fs = require('fs');
const path = require('path');

@Controller('pdf')
export class PdfController {
  constructor(private sdekService: SdekService) {}
  //localhost:4000/statistics/pdf

  @Post('amazon')
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
  async sdekPDF(@Body() body, @Res() res) {
    request
      .get({
        url: body.url,
        encoding: null,
        headers: {
          'Content-Type': 'application/json',
          Authorization: await this.sdekService.authInSdek(),
        },
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
}
