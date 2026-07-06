const mailSender = require('../utils/mailSender');

// ─── Reusable email wrapper (header + footer) ───────────────────────────────
const emailWrapper = (bodyContent) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>StudyNotion</title>
</head>
<body style="margin:0;padding:0;background-color:#0f172a;font-family:'Segoe UI',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f172a;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- ── HEADER ── -->
          <tr>
            <td align="center" style="background:linear-gradient(135deg,#1e293b 0%,#0f172a 100%);
                border-radius:16px 16px 0 0;padding:36px 40px 28px;">
              
              <!-- Logo text fallback (works in all email clients) -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#FFD60A;border-radius:8px;padding:8px 18px;">
                    <span style="font-size:22px;font-weight:800;color:#0f172a;
                          letter-spacing:1px;font-family:'Segoe UI',Arial,sans-serif;">
                      Study<span style="color:#1e293b;">Notion</span>
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Decorative line -->
              <div style="margin-top:20px;height:3px;width:60px;
                          background:#FFD60A;border-radius:2px;margin-left:auto;margin-right:auto;"></div>
            </td>
          </tr>

          <!-- ── BODY ── -->
          <tr>
            <td style="background:#1e293b;padding:40px 48px;">
              ${bodyContent}
            </td>
          </tr>

          <!-- ── FOOTER ── -->
          <tr>
            <td style="background:#0f172a;border-radius:0 0 16px 16px;
                        padding:28px 40px;text-align:center;
                        border-top:1px solid #334155;">
              <p style="margin:0 0 8px;font-size:13px;color:#64748b;">
                © ${new Date().getFullYear()} StudyNotion. All rights reserved.
              </p>
              <p style="margin:0;font-size:13px;color:#64748b;">
                Questions? Email us at
                <a href="mailto:joshianushree1110@gmail.com"
                   style="color:#FFD60A;text-decoration:none;">
                  joshianushree1110@gmail.com
                </a>
              </p>
              <p style="margin:12px 0 0;font-size:11px;color:#475569;">
                You received this email because you interacted with StudyNotion.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;


// ─── Template 1 : Confirmation email → sent to the user ─────────────────────
const userConfirmationTemplate = ({ firstname, email, message }) => {
  const body = `
    <!-- Greeting -->
    <h1 style="margin:0 0 6px;font-size:26px;font-weight:700;color:#f8fafc;">
      Hey ${firstname}! 👋
    </h1>
    <p style="margin:0 0 28px;font-size:16px;color:#94a3b8;line-height:1.6;">
      Thanks for getting in touch with us.
    </p>

    <!-- Success badge -->
    <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
      <tr>
        <td style="background:#052e16;border:1px solid #16a34a;
                    border-radius:8px;padding:10px 20px;">
          <span style="font-size:14px;color:#4ade80;font-weight:600;">
            ✅ &nbsp;Message Received Successfully
          </span>
        </td>
      </tr>
    </table>

    <!-- Info card -->
    <table width="100%" cellpadding="0" cellspacing="0"
           style="background:#0f172a;border-radius:12px;
                  border:1px solid #334155;margin-bottom:32px;">
      <tr>
        <td style="padding:28px 32px;">

          <p style="margin:0 0 20px;font-size:13px;font-weight:600;
                    color:#64748b;letter-spacing:1.5px;text-transform:uppercase;">
            Message Details
          </p>

          <!-- Email row -->
          <table width="100%" cellpadding="0" cellspacing="0"
                 style="border-bottom:1px solid #1e293b;padding-bottom:14px;margin-bottom:14px;">
            <tr>
              <td width="30" valign="top" style="padding-top:2px;">
                <span style="font-size:16px;">📧</span>
              </td>
              <td>
                <p style="margin:0;font-size:12px;color:#64748b;">Your email</p>
                <p style="margin:4px 0 0;font-size:15px;color:#e2e8f0;font-weight:600;">
                  ${email}
                </p>
              </td>
            </tr>
          </table>

          <!-- Message row -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="30" valign="top" style="padding-top:2px;">
                <span style="font-size:16px;">💬</span>
              </td>
              <td>
                <p style="margin:0;font-size:12px;color:#64748b;">Your message</p>
                <p style="margin:4px 0 0;font-size:15px;color:#e2e8f0;line-height:1.7;">
                  ${message}
                </p>
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>

    <!-- What happens next -->
    <table width="100%" cellpadding="0" cellspacing="0"
           style="background:#1a1033;border-radius:12px;
                  border:1px solid #4c1d95;margin-bottom:32px;">
      <tr>
        <td style="padding:24px 32px;">
          <p style="margin:0 0 14px;font-size:14px;font-weight:700;color:#a78bfa;">
            ⏱ What happens next?
          </p>
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:6px 0;">
                <span style="color:#FFD60A;font-weight:700;margin-right:10px;">1.</span>
                <span style="font-size:14px;color:#cbd5e1;">Our team reviews your message</span>
              </td>
            </tr>
            <tr>
              <td style="padding:6px 0;">
                <span style="color:#FFD60A;font-weight:700;margin-right:10px;">2.</span>
                <span style="font-size:14px;color:#cbd5e1;">We'll reply within 24–48 hours</span>
              </td>
            </tr>
            <tr>
              <td style="padding:6px 0;">
                <span style="color:#FFD60A;font-weight:700;margin-right:10px;">3.</span>
                <span style="font-size:14px;color:#cbd5e1;">Check your inbox (and spam folder)</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- CTA button -->
    <table cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
      <tr>
        <td style="background:#FFD60A;border-radius:8px;">
          <a href="http://localhost:5173/"
             style="display:inline-block;padding:14px 36px;font-size:15px;
                    font-weight:700;color:#0f172a;text-decoration:none;">
            Visit StudyNotion →
          </a>
        </td>
      </tr>
    </table>

    <p style="margin:24px 0 0;font-size:14px;color:#64748b;line-height:1.6;">
      Warm regards,<br/>
      <strong style="color:#e2e8f0;">The StudyNotion Team</strong>
    </p>
  `;
  return emailWrapper(body);
};


// ─── Template 2 : Admin notification email → sent to you ────────────────────
const adminNotificationTemplate = ({ firstname, lastname, email, phoneNo, countrycode, message }) => {
  const body = `
    <!-- Alert badge -->
    <table cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td style="background:#FFD60A;border-radius:8px;padding:8px 20px;">
          <span style="font-size:13px;font-weight:700;color:#0f172a;">
            🔔 &nbsp;NEW CONTACT FORM SUBMISSION
          </span>
        </td>
      </tr>
    </table>

    <h1 style="margin:0 0 6px;font-size:24px;font-weight:700;color:#f8fafc;">
      Someone reached out!
    </h1>
    <p style="margin:0 0 32px;font-size:15px;color:#94a3b8;">
      A visitor submitted the contact form on StudyNotion.
    </p>

    <!-- Sender details card -->
    <table width="100%" cellpadding="0" cellspacing="0"
           style="background:#0f172a;border-radius:12px;
                  border:1px solid #334155;margin-bottom:28px;">
      <tr>
        <td style="padding:28px 32px;">

          <p style="margin:0 0 20px;font-size:13px;font-weight:600;
                    color:#64748b;letter-spacing:1.5px;text-transform:uppercase;">
            Sender Information
          </p>

          <!-- Name -->
          <table width="100%" cellpadding="0" cellspacing="0"
                 style="border-bottom:1px solid #1e293b;padding-bottom:14px;margin-bottom:14px;">
            <tr>
              <td width="30"><span style="font-size:16px;">👤</span></td>
              <td>
                <p style="margin:0;font-size:12px;color:#64748b;">Full Name</p>
                <p style="margin:4px 0 0;font-size:16px;font-weight:700;color:#f8fafc;">
                  ${firstname} ${lastname || ''}
                </p>
              </td>
            </tr>
          </table>

          <!-- Email -->
          <table width="100%" cellpadding="0" cellspacing="0"
                 style="border-bottom:1px solid #1e293b;padding-bottom:14px;margin-bottom:14px;">
            <tr>
              <td width="30"><span style="font-size:16px;">📧</span></td>
              <td>
                <p style="margin:0;font-size:12px;color:#64748b;">Email Address</p>
                <a href="mailto:${email}"
                   style="display:block;margin-top:4px;font-size:15px;
                          font-weight:600;color:#FFD60A;text-decoration:none;">
                  ${email}
                </a>
              </td>
            </tr>
          </table>

          <!-- Phone -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="30"><span style="font-size:16px;">📱</span></td>
              <td>
                <p style="margin:0;font-size:12px;color:#64748b;">Phone Number</p>
                <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#e2e8f0;">
                  ${countrycode || ''} ${phoneNo || 'Not provided'}
                </p>
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>

    <!-- Message card -->
    <table width="100%" cellpadding="0" cellspacing="0"
           style="background:#0f172a;border-radius:12px;
                  border-left:4px solid #FFD60A;margin-bottom:28px;">
      <tr>
        <td style="padding:28px 32px;">
          <p style="margin:0 0 12px;font-size:13px;font-weight:600;
                    color:#64748b;letter-spacing:1.5px;text-transform:uppercase;">
            💬 Their Message
          </p>
          <p style="margin:0;font-size:16px;color:#e2e8f0;line-height:1.8;">
            ${message}
          </p>
        </td>
      </tr>
    </table>

    <!-- Quick reply button -->
    <table cellpadding="0" cellspacing="0">
      <tr>
        <td style="background:#FFD60A;border-radius:8px;">
          <a href="mailto:${email}?subject=Re: Your message to StudyNotion"
             style="display:inline-block;padding:14px 36px;font-size:15px;
                    font-weight:700;color:#0f172a;text-decoration:none;">
            Reply to ${firstname} →
          </a>
        </td>
      </tr>
    </table>

    <p style="margin:24px 0 0;font-size:13px;color:#475569;">
      Received on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
    </p>
  `;
  return emailWrapper(body);
};


// ─── Controller ─────────────────────────────────────────────────────────────
exports.contactUs = async (req, res) => {
  try {
    const { firstname, lastname, email, phoneNo, countrycode, message } = req.body;

    if (!firstname || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    // 1️⃣ Confirmation email → user
    await mailSender(
      email,
      '✅ We received your message – StudyNotion',
      userConfirmationTemplate({ firstname, email, message })
    );

    // 2️⃣ Notification email → admin (you)
    await mailSender(
      'joshianushree1110@gmail.com',
      `📬 New message from ${firstname} ${lastname || ''} – StudyNotion`,
      adminNotificationTemplate({ firstname, lastname, email, phoneNo, countrycode, message })
    );

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully'
    });

  } catch (error) {
    console.log('Error in contactUs:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message',
      error: error.message
    });
  }
};