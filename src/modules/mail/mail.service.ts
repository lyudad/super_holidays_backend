import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { LoginUserDto } from 'modules/users/create-user.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserInformation(user: LoginUserDto) {
    await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <alexeysystem@meta.ua>', // override default from
      subject: 'Welcome to ZenBit! This is your access',
      template: './email-template', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.email,
        email: user.email,
        password: user.password,
      },
    });
  }
}
