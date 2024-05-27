import nodemailer from 'nodemailer';

type EmailOptions = {
  to: string;
  subject: string;
  message: string;
};

const sendEmail = async (emailOptions: EmailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST as string,
    port: 25,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2. Define the email options
  const mailOption = {
    from: 'Adel Guitoun <adel@gmail.com>',
    to: emailOptions.to,
    subject: emailOptions.subject,
    text: emailOptions.message,
  };

  // 3. Send the email
  await transporter.sendMail(mailOption);
};

export default sendEmail;
