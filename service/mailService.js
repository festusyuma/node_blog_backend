"use strict";
const nodemailer = require("nodemailer");

const mailService = {
  async send(to, ) {
    let transporter = nodemailer.createTransport({
      host: "smtp.elasticemail.com",
      port: 2525,
      secure: false,
      auth: {
        user: process.env.HOTMAIL_USERNAME,
        pass: process.env.HOTMAIL_PASSWORD,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"festusyuma@gmail.com',
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