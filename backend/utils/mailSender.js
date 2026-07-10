const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const mailSender = async (to, subject, html) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "StudyNotion <onboarding@resend.dev>", 
      to,
      subject,
      html,
    });

    if (error) {
      console.error("❌ Resend error:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    console.error("❌ mailSender failed:", err.message);
    throw err;
  }
};

module.exports = mailSender;