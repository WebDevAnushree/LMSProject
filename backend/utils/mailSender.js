const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: Number(process.env.MAIL_PORT) === 465,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

transporter.verify((err, success) => {
  if (err) {
    console.error("❌ SMTP connection failed:", err.message);
  } else {
    console.log("✅ SMTP server is ready to send emails");
  }
});

// ✅ Export a function, not the transporter itself
const mailSender = async (to, subject, html) => {
  const info = await transporter.sendMail({
    from: `"StudyNotion" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html,
  });
  return info;
};

module.exports = mailSender;