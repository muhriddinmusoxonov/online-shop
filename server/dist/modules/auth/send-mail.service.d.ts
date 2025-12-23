import 'dotenv/config';
export declare class MailService {
    private transporter;
    sendMail(options: {
        to: string;
        subject: string;
        text: string;
    }): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
}
