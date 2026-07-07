
exports.courseEnrollmentEmail = (courseName, name) => {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Course Enrollment Confirmation</title>
    <style>
        body { background-color: #0d1117; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #e6edf3; margin: 0; padding: 0; }
        .wrapper { background-color: #0d1117; padding: 40px 20px; }
        .container { max-width: 560px; margin: 0 auto; background-color: #161b22; border: 1px solid #30363d; border-radius: 12px; overflow: hidden; }
        .header { background-color: #FFD60A; padding: 28px 32px; text-align: center; }
        .header-title { font-size: 22px; font-weight: bold; color: #0d1117; margin: 0; }
        .body { padding: 36px 32px; text-align: left; }
        .greeting { font-size: 17px; font-weight: 600; color: #e6edf3; margin-bottom: 16px; }
        .text { font-size: 14px; color: #8b949e; margin-bottom: 20px; line-height: 1.7; }
        .course-box { background-color: #0d1117; border: 1px solid #30363d; border-radius: 10px; padding: 20px 24px; margin: 24px 0; }
        .course-label { font-size: 11px; color: #6e7681; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 6px; }
        .course-name { font-size: 20px; font-weight: bold; color: #FFD60A; }
        .cta { display: inline-block; padding: 13px 32px; background-color: #FFD60A; color: #0d1117; text-decoration: none; border-radius: 8px; font-size: 15px; font-weight: bold; margin-top: 8px; }
        .cta-wrap { text-align: center; margin: 28px 0 8px; }
        .steps { margin: 24px 0; }
        .step { display: flex; align-items: flex-start; margin-bottom: 14px; }
        .step-num { background-color: #FFD60A; color: #0d1117; border-radius: 50%; width: 22px; height: 22px; font-size: 12px; font-weight: bold; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; margin-right: 12px; margin-top: 1px; }
        .step-text { font-size: 13px; color: #8b949e; line-height: 1.5; }
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
                <p class="greeting">Hi ${name}, you're enrolled! 🎉</p>
                <p class="text">
                    Congratulations! You have successfully enrolled in the following course:
                </p>

                <!-- Course box -->
                <div class="course-box">
                    <p class="course-label">Course</p>
                    <p class="course-name">${courseName}</p>
                </div>

                <p class="text">Here's how to get started:</p>

                <div class="steps">
                    <div class="step">
                        <span class="step-num">1</span>
                        <span class="step-text">Log in to your StudyNotion account at <strong>localhost:5173</strong></span>
                    </div>
                    <div class="step">
                        <span class="step-num">2</span>
                        <span class="step-text">Go to <strong>Dashboard → Enrolled Courses</strong></span>
                    </div>
                    <div class="step">
                        <span class="step-num">3</span>
                        <span class="step-text">Click on <strong>${courseName}</strong> and start learning!</span>
                    </div>
                </div>

                <div class="cta-wrap">
                    <a class="cta" href="https://lms-project-delta-olive.vercel.app/dashboard/enrolled-courses">
                        Go to My Courses →
                    </a>
                </div>
            </div>

            <!-- Footer -->
            <div class="footer">
                <p class="footer-text">
                    Questions? Reach us at 
                    <a class="footer-link" href="mailto:joshianushree1110@gmail.com">joshianushree1110@gmail.com</a>
                </p>
                <p class="footer-text" style="margin-top:8px;">© 2024 StudyNotion. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>`;
};