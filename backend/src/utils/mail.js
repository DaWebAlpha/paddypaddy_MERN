import nodemailer from 'nodemailer';
import config from '../config/config.js';
import { system_logger } from '../core/pino.logger.js';

const transporter = nodemailer.createTransport({
  host: config.mail_host,
  port: config.mail_port,
  secure: config.mail_secure,
  auth: {
    user: config.mail_user,
    pass: config.mail_pass,
  },
});

export const sendMail = async ({ to, subject, html, text }) => {
  try {
    return await transporter.sendMail({
      from: config.mail_from,
      to,
      subject,
      text,
      html,
    });
  } catch (error) {
    system_logger.error({ error: error.message }, 'Mail sending failed');
    throw new Error('Failed to send email');
  }
};

export const sendVerificationCodeEmail = async ({ email, code }) => {
  const subject = 'Verify your email';
  const text = `Your verification code is ${code}. It expires in 10 minutes.`;

  const html = `
    <div style="font-family: Arial, sans-serif;">
      <h2>Email Verification</h2>
      <p>Your verification code is:</p>
      <h1 style="letter-spacing: 4px;">${code}</h1>
      <p>This code expires in 10 minutes.</p>
    </div>
  `;

  return sendMail({ to: email, subject, text, html });
};

export default {
  sendMail,
  sendVerificationCodeEmail,
};