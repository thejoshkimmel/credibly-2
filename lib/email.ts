import { Resend } from 'resend';

const resend = new Resend(process.env.EMAIL_SERVER_PASSWORD);

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  try {
    console.log('Sending email with params:', { to, subject, html });
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to,
      subject,
      html,
    });
    console.log('Resend API response:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
} 