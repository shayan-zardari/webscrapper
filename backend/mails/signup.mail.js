import transporter from "../config/nodemailerConfig.js";

export default async function signupEmail(user, code) {
    try {
        const info = await transporter.sendMail({
            from: 'noreply@fake.com',
            to: user.email,
            subject: 'Signup sucessful | OTP',
            text: 'Signup sucessful',
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome Email</title>
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        font-family: Arial, Helvetica, sans-serif;
                        background-color:rgb(225, 224, 224);
                        color: #333;
                    }
                    #code {
                        background: white;
                        font-size: 40px;
                        color: black;
                        display: block;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        background-color: #4CAF50;
                        padding: 20px;
                        text-align: center;
                        color: #ffffff;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 24px;
                    }
                    .content {
                        padding: 20px;
                        line-height: 1.6;
                    }
                    .content h2 {
                        font-size: 20px;
                        color: #4CAF50;
                    }
                    .content p {
                        margin: 10px 0;
                    }
                    .button {
                        display: inline-block;
                        padding: 10px 20px;
                        margin: 20px 0;
                        background-color: #4CAF50;
                        color: #ffffff !important;
                        text-decoration: none;
                        border-radius: 5px;
                        font-weight: bold;
                    }
                    .footer {
                        background-color: #f4f4f4;
                        padding: 10px;
                        text-align: center;
                        font-size: 12px;
                        color: #666;
                    }
                    @media screen and (max-width: 600px) {
                        .container {
                            width: 100%;
                            margin: 10px;
                        }
                        .header h1 {
                            font-size: 20px;
                        }
                        .content h2 {
                            font-size: 18px;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Welcome to Our App!</h1>
                    </div>
                    <div class="content">
                        <h2>Hello there!</h2>
                        <p>Thank you for joining our community. We're excited to have you on board!</p>
                        <p>This is a test email sent from your Node.js application. Here's your email verification code <span id="code">${code}</span></p>
                        <a href="https://example.com" class="button">Visit Our Website</a>
                    </div>
                    <div class="footer">
                        <p>&copy; 2025 Your App Name. All rights reserved.</p>
                        <p>Contact us at <a href="mailto:support@yourapp.com">support@yourapp.com</a></p>
                    </div>
                </div>
            </body>
            </html>
            `
        });
        return info;
    }   catch (err) {
        console.log(err);
        throw err;
    }
};