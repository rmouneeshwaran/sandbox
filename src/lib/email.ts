import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

const sendEmail = async ({ to, subject, html }: EmailOptions): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Adjust if using another provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Secure App" <${process.env.EMAIL_USER}>`, // Sender address
    to,
    subject,
    html,
  });
};

export default sendEmail;
