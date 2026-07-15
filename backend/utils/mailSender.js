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


const axios = require("axios");

const mailSender = async (to, subject, html) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "StudyNotion",
          email: process.env.BREVO_SENDER_EMAIL, // must match the email you verified in Brevo
        },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error("❌ mailSender failed:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || err.message);
  }
};

module.exports = mailSender;