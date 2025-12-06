import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import 'dotenv/config';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async sendMail(options: { to: string; subject: string; text: string }) {
    return this.transporter.sendMail({
      from: process.env.MAIL_USER,
      to: options.to,
      subject: options.subject,
      text: options.text,
    });
  }
}
