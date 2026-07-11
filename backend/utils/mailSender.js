// const { Resend } = require("resend");

// const resend = new Resend(process.env.RESEND_API_KEY);

// const mailSender = async (to, subject, html) => {
//   try {
//     const { data, error } = await resend.emails.send({
//       from: "StudyNotion <onboarding@resend.dev>", 
//       to,
//       subject,
//       html,
//     });

//     if (error) {
//       console.error("❌ Resend error:", error);
//       throw new Error(error.message);
//     }

//     return data;
//   } catch (err) {
//     console.error("❌ mailSender failed:", err.message);
//     throw err;
//   }
// };

// module.exports = mailSender;

const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const info = await transporter.sendMail({
            from: 'StudyNotion || by Anushree Joshi',
            to: email,
            subject: title,
            html: body
        });

        // console.log('Info of sent mail - ', info);
        return info;
    }
    catch (error) {
        console.log('Error while sending mail (mailSender) - ', email);
    }
}

module.exports = mailSender;