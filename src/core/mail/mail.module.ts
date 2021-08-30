import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { Module } from '@nestjs/common';
import * as path from 'path';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

const miniConfig = {
  mailLogin: 'leitank@mail.ru',
  mailPassword: '1Oo_aTFpiiO3',
  mailConfig: {
    host: 'smtp.mail.ru',
    port: 465,
  },
};
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'Mail.ru',
        // host: miniConfig.mailConfig.host,
        // port: miniConfig.mailConfig.port,
        // ignoreTLS: true,
        // secure: true,
        auth: {
          user: miniConfig.mailLogin,
          pass: miniConfig.mailPassword,
        },
      },
      defaults: {
        from: `LaForm <${miniConfig.mailLogin}>`,
      },
      template: {
        dir: path.join(path.resolve(), 'src/templates/'),
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
