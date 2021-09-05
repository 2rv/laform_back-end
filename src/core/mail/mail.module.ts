import { MailerModule } from '@nestjs-modules/mailer';

import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailConfig } from '../../config/mail.config';

import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import * as path from 'path';

import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from '../notification/notification.entity';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: MailConfig.host,
        secure: false,
        auth: {
          user: MailConfig.email,
          pass: MailConfig.password,
        },
      },
      defaults: {
        from: `LaForm <${MailConfig.email}>`,
      },
      template: {
        dir: path.join(path.resolve(), 'src/templates/'),
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    TypeOrmModule.forFeature([NotificationEntity]),
  ],
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
