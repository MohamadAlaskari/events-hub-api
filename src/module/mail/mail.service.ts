import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { welcomeEmailTemplate } from './templates/welcome.template';
import { MailOptions } from './types/mailOption.type';
import { updatePasswordEmailTemplate } from './templates/updatePasswordEmail.template';
import { verificationEmailTemplate } from './templates/verification.template';

const APP_NAME = 'EventHub';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendMail(options: MailOptions) {
        try {
            await this.mailerService.sendMail({
            to: options.to,
            subject: options.subject,
            html: options.html,
        });
        } catch (e: any) {
            console.error("Error sending mail: ", e)
        
            throw new RequestTimeoutException('Mail delivery failed', { cause: e });
        };  
    }

    async sendVerificationEmail(
        to: string,
        username: string,
        token: string,
        baseUrl: string
    ): Promise<void> {
        const url = `${baseUrl}/auth/verify-email?token=${encodeURIComponent(token)}`;
        return this.sendMail({
            to,
            subject: `${APP_NAME}: E-Mail bestätigen`,
            html: verificationEmailTemplate(username, url),
        });
    }

    async sendPasswordResetEmail(
        to: string,
        username: string,
        token: string,
        baseUrl: string
    ): Promise<void> {
        const resetUrl = `${baseUrl}/auth/reset-password?token=${encodeURIComponent(token)}`;
        return this.sendMail({
            to,
            subject: `${APP_NAME}: Passwort zurücksetzen`,
            html: updatePasswordEmailTemplate(username, resetUrl),
        });
    }

    async sendWelcomeEmail(
        to: string,
        username: string,
        ctaUrl?: string
    ): Promise<void> {
        return this.sendMail({
            to,
            subject: `Willkommen bei ${APP_NAME}, ${username}`,
            html: welcomeEmailTemplate(username, ctaUrl),
        });
    }
}
