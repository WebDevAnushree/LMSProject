const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT) || 587,
            secure: process.env.MAIL_PORT === '465', 
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
            connectionTimeout: 10000, 
            greetingTimeout: 10000,
            socketTimeout: 10000
        });

        const info = await transporter.sendMail({
            from: `"StudyNotion" <${process.env.MAIL_USER}>`,
            to: email,
            subject: title,
            html: body
        });

        return info;
    }
    catch (error) {
        console.log('Error while sending mail (mailSender) - ', email, error.message);
        throw error; // rethrow so the caller actually knows it failed
    }
}

module.exports = mailSender;