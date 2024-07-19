'use server';

import getBaseURL from '@/lib/base-url';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);
const domain = getBaseURL();

export async function sendVerificationEmail(email: string, token: string) {
  const verificationLink = `${domain}/auth/verify-email?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: '7authOTP - Activate your account',
    html: `
      <p>Click the link below to activate your account</p>
      <a href="${verificationLink}">Activate account</a>
    `,
  });
  if (error) return console.log(error);
  if (data) return data;
}

export async function sendResetPasswordEmail(email: string, token: string) {
  const resetLink = `${domain}/auth/reset-password?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: '7authOTP - Reset your password',
    html: `
      <p>Click the link below to create your new password</p>
      <a href="${resetLink}">Reset Password</a>
    `,
  });
  if (error) return console.log(error);
  if (data) return data;
}

export async function sendTwoFactorCodeEmail(email: string, token: string) {
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: '7authOTP - Two-factor authentication code',
    html: `
      <p>
        Your two-factor authentication code is: <strong>${token}</strong>
      </p>
    `,
  });
  if (error) return console.log(error);
  if (data) return data;
}
