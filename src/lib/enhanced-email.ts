import nodemailer from 'nodemailer';

// Enhanced email configuration to prevent spam
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  // Anti-spam configurations
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  rateDelta: 20000,
  rateLimit: 5,
  // DKIM configuration (if available)
  dkim: {
    domainName: 'devxsubh.com',
    keySelector: 'default',
    privateKey: process.env.DKIM_PRIVATE_KEY || '',
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  context: Record<string, any>;
  template: 'thank-you' | 'contact-notification' | 'project-discussion-notification';
}

// Creative Thank You Email Template
const thankYouTemplate = (context: Record<string, any>) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You - Subham Mahapatra</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      margin: 0;
    }
    
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
    
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
      padding: 40px 30px;
      position: relative;
      overflow: hidden;
    }
    
    .header::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
      animation: float 6s ease-in-out infinite;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    .header h1 {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 10px;
      position: relative;
      z-index: 1;
    }
    
    .header p {
      font-size: 18px;
      opacity: 0.9;
      position: relative;
      z-index: 1;
    }
    
    .content {
      padding: 40px 30px;
    }
    
    .greeting {
      font-size: 24px;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 20px;
    }
    
    .message {
      font-size: 16px;
      color: #4a5568;
      margin-bottom: 30px;
      line-height: 1.8;
    }
    
    .highlight-box {
      background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
      border-left: 4px solid #667eea;
      padding: 25px;
      border-radius: 10px;
      margin: 30px 0;
      position: relative;
    }
    
    .highlight-box::before {
      content: '✨';
      position: absolute;
      top: -10px;
      left: 20px;
      background: white;
      padding: 0 10px;
      font-size: 20px;
    }
    
    .cta-section {
      text-align: center;
      margin: 40px 0;
    }
    
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-decoration: none;
      padding: 15px 30px;
      border-radius: 50px;
      font-weight: 600;
      font-size: 16px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
    
    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
    }
    
    .social-links {
      text-align: center;
      margin: 30px 0;
    }
    
    .social-links a {
      display: inline-block;
      margin: 0 10px;
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }
    
    .social-links a:hover {
      color: #764ba2;
    }
    
    .footer {
      background: #f8fafc;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
    }
    
    .footer p {
      color: #718096;
      font-size: 14px;
      margin-bottom: 10px;
    }
    
    .signature {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
    }
    
    .signature h3 {
      color: #2d3748;
      font-size: 18px;
      margin-bottom: 5px;
    }
    
    .signature p {
      color: #4a5568;
      font-size: 14px;
    }
    
    .emoji {
      font-size: 20px;
      margin: 0 5px;
    }
    
    @media (max-width: 600px) {
      .email-container {
        margin: 10px;
        border-radius: 15px;
      }
      
      .header, .content, .footer {
        padding: 20px;
      }
      
      .header h1 {
        font-size: 24px;
      }
      
      .greeting {
        font-size: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Thank You! <span class="emoji">🎉</span></h1>
      <p>Your message has been received</p>
    </div>
    
    <div class="content">
      <div class="greeting">Hi ${context.name}! <span class="emoji">👋</span></div>
      
      <div class="message">
        Thank you for reaching out to me! I'm genuinely excited to hear from you and learn about your project or ideas. Your message has been successfully delivered, and I've already started thinking about how I can help bring your vision to life.
      </div>
      
      <div class="highlight-box">
        <p><strong>What happens next?</strong></p>
        <p>I'll review your message carefully and get back to you within <strong>24 hours</strong> with a detailed response. I believe in quick, meaningful communication, so you won't have to wait long!</p>
      </div>
      
      <div class="message">
        In the meantime, feel free to explore my portfolio and check out some of my recent work. I'm passionate about creating exceptional digital experiences, and I'd love to discuss how we can work together.
      </div>
      
      <div class="cta-section">
        <a href="https://www.devxsubh.com/projects" class="cta-button">
          View My Portfolio <span class="emoji">🚀</span>
        </a>
      </div>
      
      <div class="social-links">
        <a href="https://www.linkedin.com/in/devxsubh/">LinkedIn</a>
        <a href="https://github.com/devxsubh">GitHub</a>
        <a href="https://www.instagram.com/devxsubh/">Instagram</a>
      </div>
    </div>
    
    <div class="footer">
      <div class="signature">
        <h3>Subham Mahapatra <span class="emoji">💻</span></h3>
        <p>Full Stack Developer & Tech Strategist</p>
        <p>Building the future, one line of code at a time</p>
      </div>
      
      <p>This email was sent from my portfolio website. If you have any questions, feel free to reply directly!</p>
      <p>© 2024 Subham Mahapatra. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

// Contact Notification Template (for you)
const contactNotificationTemplate = (context: Record<string, any>) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      background: #f8fafc;
      padding: 20px;
      margin: 0;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
      padding: 30px;
    }
    
    .header h1 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    
    .content {
      padding: 30px;
    }
    
    .contact-details {
      background: #f7fafc;
      border-radius: 10px;
      padding: 25px;
      margin: 20px 0;
      border-left: 4px solid #667eea;
    }
    
    .contact-details h3 {
      color: #2d3748;
      margin-bottom: 15px;
      font-size: 18px;
    }
    
    .contact-details p {
      margin-bottom: 10px;
      color: #4a5568;
    }
    
    .contact-details strong {
      color: #2d3748;
    }
    
    .message-content {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 20px;
      margin: 15px 0;
      font-style: italic;
      color: #4a5568;
    }
    
    .action-buttons {
      text-align: center;
      margin: 30px 0;
    }
    
    .action-button {
      display: inline-block;
      background: #667eea;
      color: white;
      text-decoration: none;
      padding: 12px 25px;
      border-radius: 25px;
      font-weight: 600;
      margin: 0 10px;
      transition: all 0.3s ease;
    }
    
    .action-button:hover {
      background: #5a67d8;
      transform: translateY(-1px);
    }
    
    .footer {
      background: #f8fafc;
      padding: 20px;
      text-align: center;
      color: #718096;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 New Contact Form Submission</h1>
      <p>Someone wants to work with you!</p>
    </div>
    
    <div class="content">
      <p>Hi Subham,</p>
      <p>You've received a new contact form submission from your portfolio website. Here are the details:</p>
      
      <div class="contact-details">
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${context.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${context.email}">${context.email}</a></p>
        <p><strong>Subject:</strong> ${context.subject}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      </div>
      
      <div class="message-content">
        <strong>Message:</strong><br>
        ${context.message}
      </div>
      
      <div class="action-buttons">
        <a href="mailto:${context.email}?subject=Re: ${context.subject}" class="action-button">
          Reply via Email
        </a>
        <a href="https://www.devxsubh.com/contact" class="action-button">
          View Contact Page
        </a>
      </div>
      
      <p><strong>Quick Response Tips:</strong></p>
      <ul>
        <li>Reply within 24 hours for best conversion rates</li>
        <li>Personalize your response based on their specific needs</li>
        <li>Include relevant portfolio links if applicable</li>
        <li>Ask clarifying questions to better understand their project</li>
      </ul>
    </div>
    
    <div class="footer">
      <p>This notification was sent from your portfolio website contact form.</p>
      <p>© 2024 Subham Mahapatra</p>
    </div>
  </div>
</body>
</html>
`;

// Project Discussion Notification Template
const projectDiscussionTemplate = (context: Record<string, any>) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Project Discussion Request</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      background: #f8fafc;
      padding: 20px;
      margin: 0;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
      padding: 30px;
    }
    
    .header h1 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    
    .content {
      padding: 30px;
    }
    
    .project-details {
      background: #f7fafc;
      border-radius: 10px;
      padding: 25px;
      margin: 20px 0;
      border-left: 4px solid #667eea;
    }
    
    .project-details h3 {
      color: #2d3748;
      margin-bottom: 15px;
      font-size: 18px;
    }
    
    .project-details p {
      margin-bottom: 10px;
      color: #4a5568;
    }
    
    .project-details strong {
      color: #2d3748;
    }
    
    .message-content {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 20px;
      margin: 15px 0;
      font-style: italic;
      color: #4a5568;
    }
    
    .action-buttons {
      text-align: center;
      margin: 30px 0;
    }
    
    .action-button {
      display: inline-block;
      background: #667eea;
      color: white;
      text-decoration: none;
      padding: 12px 25px;
      border-radius: 25px;
      font-weight: 600;
      margin: 0 10px;
      transition: all 0.3s ease;
    }
    
    .action-button:hover {
      background: #5a67d8;
      transform: translateY(-1px);
    }
    
    .footer {
      background: #f8fafc;
      padding: 20px;
      text-align: center;
      color: #718096;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>💼 New Project Discussion Request</h1>
      <p>Potential client wants to discuss their project!</p>
    </div>
    
    <div class="content">
      <p>Hi Subham,</p>
      <p>You've received a new project discussion request from your portfolio website. This looks like a potential client!</p>
      
      <div class="project-details">
        <h3>Project Information</h3>
        <p><strong>Name:</strong> ${context.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${context.email}">${context.email}</a></p>
        <p><strong>Company:</strong> ${context.company || 'Not provided'}</p>
        <p><strong>Project Type:</strong> ${context.projectType || 'Not specified'}</p>
        <p><strong>Timeline:</strong> ${context.timeline || 'Not specified'}</p>
        <p><strong>Budget:</strong> ${context.budget || 'Not specified'}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      </div>
      
      <div class="message-content">
        <strong>Project Description:</strong><br>
        ${context.message}
      </div>
      
      <div class="action-buttons">
        <a href="mailto:${context.email}?subject=Re: Project Discussion - ${context.projectType || 'Your Project'}" class="action-button">
          Reply via Email
        </a>
        <a href="https://www.devxsubh.com/discuss-project" class="action-button">
          View Discussion Form
        </a>
      </div>
      
      <p><strong>Next Steps:</strong></p>
      <ul>
        <li>Reply within 24 hours to maintain engagement</li>
        <li>Schedule a call to discuss project details</li>
        <li>Prepare relevant portfolio examples</li>
        <li>Create a project proposal if interested</li>
      </ul>
    </div>
    
    <div class="footer">
      <p>This notification was sent from your portfolio website project discussion form.</p>
      <p>© 2024 Subham Mahapatra</p>
    </div>
  </div>
</body>
</html>
`;

const templates = {
  'thank-you': thankYouTemplate,
  'contact-notification': contactNotificationTemplate,
  'project-discussion-notification': projectDiscussionTemplate,
};

export async function sendEnhancedEmail({ to, subject, context, template }: EmailOptions) {
  if (!process.env.SMTP_HOST) {
    throw new Error('SMTP configuration not found');
  }

  const html = templates[template](context);

  // Enhanced email headers to prevent spam
  const mailOptions = {
    from: {
      name: 'Subham Mahapatra',
      address: process.env.SMTP_FROM || process.env.SMTP_USER || '',
    },
    to,
    subject,
    html,
    // Anti-spam headers
    headers: {
      'X-Mailer': 'Subham Mahapatra Portfolio',
      'X-Priority': '3',
      'X-MSMail-Priority': 'Normal',
      'Importance': 'Normal',
      'X-Report-Abuse': 'Please report abuse to abuse@devxsubh.com',
      'List-Unsubscribe': '<mailto:unsubscribe@devxsubh.com>',
      'X-Entity-Ref-ID': `contact-${Date.now()}`,
    },
    // Email authentication
    dkim: {
      domainName: 'devxsubh.com',
      keySelector: 'default',
      privateKey: process.env.DKIM_PRIVATE_KEY || '',
    },
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export default sendEnhancedEmail;
