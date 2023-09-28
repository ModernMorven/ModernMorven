const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: process.env.HOST,
  port: process.env.PORT,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
   
});

const sendPasswordResetEmail=async(email, Code)=> {
    try{
  const message = {
    from: process.env.SMTP_PASS,
    to: email,
    subject: 'Password Reset OTP',
    html: `
      <html>
        <head>
          <style>
            /* Add your CSS styles here */
            body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
              padding: 20px;
            }
            .container {
              background-color: #fff;
              border-radius: 5px;
              padding: 20px;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333;
            }
            p {
              font-size: 16px;
            }
            b {
              font-weight: bold;
              color: #007bff;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Password Reset Request</h1>
            <p>Dear ${email},</p>
            <p>You have requested a password reset for your ModernMorven account. Your one-time password (OTP) is:</p>
            <h4><b>${Code}</b></h4>
            <p>Please enter this OTP on the reset password page to complete the password reset process.</p>
            <p>If you did not request this password reset, please ignore this message.</p>
            <p>Thank you,</p>
            <p>ModernMorven</p>
            <p>Your Store Your Choice</p>
          </div>
        </body>
      </html>
    `,
        
  };

  const data=await transporter.sendMail(message);
  if (data) {
    return { result: 'Email sent successfully' };
  } else {
    return { message: 'Error sending email' };
  }
} catch (error) {
  console.error('Error in sendPasswordResetEmail:', error);
  return { message: 'Internal server error' };
}
}


module.exports = sendPasswordResetEmail;
