import nodemailer from "nodemailer";

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

export const sendEmail = async ({ email, subject, message }: EmailOptions) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      secure: false, // true for 465, false for other ports like 587
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject,
      text: message,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    throw error;
  }
};
