const generateVerificationEmail = (verificationCode: string): string => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification code to confirm your email address</title>
</head>
<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
  <table role="presentation"
    style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
    <tbody>
      <tr>
        <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
          <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
            <tbody>
              <tr>
                <td style="padding: 40px 0px 0px;">
                  <div style="text-align: left;">
                    <div style="padding-bottom: 20px;"><img src="https://i.ibb.co/Qbnj4mz/logo.png" alt="Company" style="width: 56px;"></div>
                  </div>
                  <div style="padding: 20px; background-color: rgb(255, 255, 255);">
                    <div style="color: rgb(0, 0, 0); text-align: left;">
                      <h1 style="margin: 1rem 0">Account Verification Code</h1>
                      <p style="padding-bottom: 16px">Please use the verification code below to verify your MailReadReceipts account:</p>
                      <p style="padding-bottom: 16px"><span style="text-align: center;display: block;"><strong
                            style="font-size: 130%">${verificationCode}</strong></span></p>
                      <p style="padding-bottom: 16px">In case you did not request this email, chill!!</p>
                      <p style="padding-bottom: 16px">Thanks</p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
    `;
  };
  
  import nodemailer from 'nodemailer';
  
  export const sendVerificationEmail = async (recipient: string, verificationCode: string) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_APP_PASSWORD, 
      },
    });
  
    const mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to: recipient,
      subject: 'MailReadReceipts Account Verification',
      html: generateVerificationEmail(verificationCode),
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  
  