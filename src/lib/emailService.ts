import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  context: Record<string, any>;
  template: 'booking-confirmation';
}

const templates = {
  'booking-confirmation': (context: Record<string, any>) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f4f6f8;
          padding: 20px;
          margin: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        .header {
          background-color: #007bff;
          color: white;
          text-align: center;
          padding: 30px 20px;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .content {
          padding: 30px 20px;
        }
        .content p {
          margin-bottom: 16px;
        }
        .details {
          background-color: #f1f3f5;
          border-left: 4px solid #007bff;
          padding: 15px;
          border-radius: 6px;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          font-size: 0.85em;
          color: #777;
          background-color: #fafafa;
          padding: 15px 20px;
          border-top: 1px solid #eee;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Contact Form Submission</h1>
        </div>
        <div class="content">
          <p>Hi Subham,</p>
          <p>You’ve received a new message via your contact form. Here are the details:</p>
          <div class="details">
            <p><strong>Name:</strong> ${context.name}</p>
            <p><strong>Email:</strong> ${context.email}</p>
            <p><strong>Meeting Type:</strong> ${context.meetingType}</p>
            <p><strong>Subject:</strong> ${context.subject}</p>
            <p><strong>Message:</strong><br>${context.message}</p>
          </div>
          <p>You can respond directly to <a href="mailto:${context.email}">${context.email}</a> if necessary.</p>
          <p>Best,<br>The System</p>
        </div>
        <div class="footer">
          <p>This is an automated notification from your website contact form.</p>
        </div>
      </div>
    </body>
    </html>
  `
};

export async function sendEmail({ to, subject, context, template }: EmailOptions) {
  if (!process.env.SMTP_HOST) {
    throw new Error('SMTP configuration not found');
  }

  const html = templates[template](context);

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    html,
  });
}

// Email templates
export const emailTemplates = {
  bookingConfirmation: {
    subject: 'Booking Confirmation - Pending Payment',
    template: 'booking-confirmation',
  }
} as const;