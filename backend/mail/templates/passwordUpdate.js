
exports.passwordUpdated = (email, name) => {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Password Updated</title>
    <style>
        body { background-color: #0d1117; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #e6edf3; margin: 0; padding: 0; }
        .wrapper { background-color: #0d1117; padding: 40px 20px; }
        .container { max-width: 560px; margin: 0 auto; background-color: #161b22; border: 1px solid #30363d; border-radius: 12px; overflow: hidden; }
        .header { background-color: #FFD60A; padding: 28px 32px; text-align: center; }
        .header-title { font-size: 22px; font-weight: bold; color: #0d1117; margin: 0; }
        .body { padding: 36px 32px; text-align: left; }
        .greeting { font-size: 17px; font-weight: 600; color: #e6edf3; margin-bottom: 16px; }
        .text { font-size: 14px; color: #8b949e; margin-bottom: 20px; line-height: 1.7; }
        .info-box { background-color: #0d1117; border: 1px solid #30363d; border-radius: 10px; padding: 16px 20px; margin: 20px 0; font-size: 13px; color: #8b949e; }
        .info-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .info-label { color: #6e7681; }
        .info-value { color: #e6edf3; font-weight: 600; }
        .success-badge { display: inline-flex; align-items: center; gap: 6px; background-color: rgba(35,134,54,0.15); border: 1px solid rgba(35,134,54,0.4); border-radius: 20px; padding: 6px 14px; font-size: 13px; color: #3fb950; font-weight: 600; margin-bottom: 20px; }
        .warning { background-color: #1c1f26; border-left: 3px solid #f85149; border-radius: 4px; padding: 12px 16px; font-size: 13px; color: #8b949e; margin-top: 20px; }
        .cta { display: inline-block; padding: 13px 32px; background-color: #FFD60A; color: #0d1117; text-decoration: none; border-radius: 8px; font-size: 15px; font-weight: bold; }
        .cta-wrap { text-align: center; margin: 28px 0 8px; }
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

                <span class="success-badge">✓ Password changed successfully</span>

                <p class="text">
                    Your StudyNotion account password has been updated. 
                    Here are the details of this change:
                </p>

                <!-- Info box -->
                <div class="info-box">
                    <div class="info-row">
                        <span class="info-label">Account email</span>
                        <span class="info-value">${email}</span>
                    </div>
                    <div class="info-row" style="margin-bottom:0;">
                        <span class="info-label">Changed at</span>
                        <span class="info-value">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</span>
                    </div>
                </div>

                <div class="warning">
                    🔒 <strong>Didn't make this change?</strong> If you did not request a password change, 
                    please contact us immediately at 
                    <a href="mailto:joshianushree1110@gmail.com" style="color:#f85149;">joshianushree1110@gmail.com</a> 
                    to secure your account.
                </div>

                <div class="cta-wrap">
                    <a class="cta" href="http://localhost:5173/login">Log in to your account</a>
                </div>
            </div>

            <!-- Footer -->
            <div class="footer">
                <p class="footer-text">
                    Need help? Contact 
                    <a class="footer-link" href="mailto:joshianushree1110@gmail.com">joshianushree1110@gmail.com</a>
                </p>
                <p class="footer-text" style="margin-top:8px;">© 2024 StudyNotion. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>`;
};