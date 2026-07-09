const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT), 
  secure: Number(process.env.MAIL_PORT) === 465, 
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  connectionTimeout: 10000, // 10s instead of default (avoids long hangs)
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

// Optional: verify connection on server startup
transporter.verify((err, success) => {
  if (err) {
    console.error("❌ SMTP connection failed:", err.message);
  } else {
    console.log("✅ SMTP server is ready to send emails");
  }
});

module.exports = transporter;