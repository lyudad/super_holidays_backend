import { AuthService } from './../auth/auth.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailDto } from './mail.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private authService: AuthService,
  ) {}

  async sendUserInformation(user: EmailDto) {
    const password = nanoid();
    await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <alexeysystem@meta.ua>',
      subject: 'Welcome to ZenBit! This is your access',
      template: './email-template',
      context: {
        name: user.name,
        email: user.email,
        password: password,
      },
    });
    await this.authService.createPassword(user.email, password);
  }
}
