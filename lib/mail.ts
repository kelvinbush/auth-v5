import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA Code",
    html: `
    <p>Here is your code: <b>${token}</b>.</p>
    `,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Please verify your email",
    html: `
      <p>Click the link below to verify your email address:</p>
      <a href="${confirmationUrl}">Verify email</a>
    `,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Please reset your password",
    html: `
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">reset password</a>
    `,
  });
};
