import { forwardRef, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { join } from 'path';
import { AuthModule } from 'modules/auth/auth.module';
import { User } from 'models/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Session } from 'models/session.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Session]),
    forwardRef(() => AuthModule),
    MailerModule.forRoot({
      transport: {
        host: process.env.HOST_EMAIL,
        port: 465,
        secure: true,
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASS,
        },
      },
      defaults: {
        from: `Your password from ${process.env.USER_EMAIL}`,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
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
