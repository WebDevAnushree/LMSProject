const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,   // smtp.gmail.com
      port: 587,
      secure: false, // true for port 465, false for 587
      auth: {
        user: process.env.MAIL_USER, // your gmail address
        pass: process.env.MAIL_PASS, // your 16-character app password
      },
    });

    const info = await transporter.sendMail({
      from: `"StudyNotion" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.log("mailSender failed:", error.message);
    throw error;
  }
};

module.exports = mailSender;