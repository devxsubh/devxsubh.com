import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  template: string;
  context: Record<string, any>;
}

// Create a transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail(options: EmailOptions): Promise<void> {
  const { to, subject, template, context } = options;
  
  if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    throw new Error('SMTP configuration not found');
  }

  // TODO: Implement template rendering logic
  const html = `Template: ${template}\nContext: ${JSON.stringify(context, null, 2)}`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject,
    html,
  });
} 