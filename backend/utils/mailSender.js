const axios = require("axios");

const mailSender = async (to, subject, html) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "StudyNotion",
          email: process.env.BREVO_SENDER_EMAIL, 
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