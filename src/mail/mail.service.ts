import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';


@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendUserConfirmation(body) {
        const url = `http://fitfinitytrainer.com/updatekyc?id=`+body.user_id;
    
        await this.mailerService.sendMail({
          to: body.email,
          // from: '"Support Team" <support@example.com>', // override default from
          subject: 'Welcome to Fitfinity! Continue to KYC...✏️',
          template: './confirmation', // `.hbs` extension is appended automatically
          context: { 
            name: body.name,
            url,
          },
        });
      }
}
