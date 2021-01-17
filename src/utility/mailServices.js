import nodemailer from "nodemailer"
import htmlToText from "html-to-text"
import send_otp from  "../../views/send_otp.js"
import resend_otp from  "../../views/resend_otp.js"

import pug from "pug"
export default class Email {

  constructor(user, url) {

    this.to = user.email;

    this.firstName = user.firstName;
    this.url = url;
    this.from = `eliteinvestment <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    //gmail
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
      }
    });
  }
 
  // Send the actual email
  async send(template, subject) {
    

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html: template,
      // text: htmlToText.fromString(html)
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the elite investment!');
  }
  async resetPassword() {
    await this.send(
      resetPass(this.url),
      'Your password reset'
    );
  }
  async verify_email() {
    await this.send(
      verifyEmail(this.url),
      'Email verification'
    );
  }
  async send_otp() {
    await this.send(
        send_otp(this.url),
      'Email verification'
    );
  }
  async resend_otp(){
    await this.send(
      resend_otp(this.url),
    'Email verification'
  );
  }
  async changePass() {
    await this.send(
      changePass(this.url),
      'Email verification'
    );
  }
  async sendAccountActivation() {
    await this.send(
      verify_temp(this.url),
      'Your Account Activation Link'
    );
  }
};
