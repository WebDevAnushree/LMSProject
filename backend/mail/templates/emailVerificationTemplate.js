

const otpTemplate = (otp, name) => {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>OTP Verification Email</title>
    <style>
        body { background-color: #0d1117; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #e6edf3; margin: 0; padding: 0; }
        .wrapper { background-color: #0d1117; padding: 40px 20px; }
        .container { max-width: 560px; margin: 0 auto; background-color: #161b22; border: 1px solid #30363d; border-radius: 12px; overflow: hidden; }
        .header { background-color: #FFD60A; padding: 28px 32px; text-align: center; }
        .header-title { font-size: 22px; font-weight: bold; color: #0d1117; margin: 0; letter-spacing: 0.5px; }
        .body { padding: 36px 32px; text-align: left; }
        .greeting { font-size: 17px; font-weight: 600; color: #e6edf3; margin-bottom: 16px; }
        .text { font-size: 14px; color: #8b949e; margin-bottom: 20px; line-height: 1.7; }
        .otp-box { background-color: #0d1117; border: 2px dashed #FFD60A; border-radius: 10px; padding: 20px; text-align: center; margin: 24px 0; }
        .otp-label { font-size: 12px; color: #8b949e; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px; }
        .otp-code { font-size: 40px; font-weight: bold; color: #FFD60A; letter-spacing: 10px; font-family: monospace; }
        .otp-validity { font-size: 12px; color: #6e7681; margin-top: 8px; }
        .warning { background-color: #1c1f26; border-left: 3px solid #f85149; border-radius: 4px; padding: 12px 16px; font-size: 13px; color: #8b949e; margin-top: 20px; }
        .footer { background-color: #0d1117; padding: 20px 32px; text-align: center; border-top: 1px solid #21262d; }
        .footer-text { font-size: 12px; color: #484f58; }
        .footer-link { color: #58a6ff; text-decoration: none; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <!-- Header -->
            <div class="header">
                <p class="header-title">📚 StudyNotion</p>
            </div>

            <!-- Body -->
            <div class="body">
                <p class="greeting">Hi ${name},</p>
                <p class="text">
                    Thank you for registering with <strong>StudyNotion</strong>. 
                    Use the OTP below to verify your email address and complete your registration.
                </p>

                <!-- OTP Box -->
                <div class="otp-box">
                    <p class="otp-label">Your One-Time Password</p>
                    <p class="otp-code">${otp}</p>
                    <p class="otp-validity">⏱ Valid for 3 minutes only</p>
                </div>

                <p class="text">
                    Enter this OTP on the verification page to activate your account and 
                    gain access to all StudyNotion features.
                </p>

                <div class="warning">
                    🔒 If you did not request this OTP, please ignore this email. 
                    Do not share this code with anyone.
                </div>
            </div>

            <!-- Footer -->
            <div class="footer">
                <p class="footer-text">
                    Need help? Contact us at 
                    <a class="footer-link" href="mailto:joshianushree1110@gmail.com">joshianushree1110@gmail.com</a>
                </p>
                <p class="footer-text" style="margin-top:8px;">© 2024 StudyNotion. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>`;
};

module.exports = otpTemplate;