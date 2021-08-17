"use strict";
const nodemailer = require("nodemailer");

const mailService = {
  async send(to, ) {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"twitee@example.com',
      to,
      subject: "Welcome",
      text: "Welcome to the world of twitee",
      html: "<b>Hello world? this is twitee and welcome back</b>",
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
}

module.exports = mailService