/**
 * Email Service
 * Supports multiple email providers: SendGrid, Mailgun, and SMTP
 * Falls back to logging if no provider is configured (development mode)
 */

interface EmailOptions {
  to: string | string[];
  from: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  provider?: string;
}

/**
 * Send email using configured provider
 */
export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
  const provider = process.env.EMAIL_PROVIDER?.toLowerCase() || 'none';

  try {
    switch (provider) {
      case 'sendgrid':
        return await sendWithSendGrid(options);
      case 'mailgun':
        return await sendWithMailgun(options);
      case 'smtp':
        return await sendWithSMTP(options);
      default:
        // Development mode - just log
        console.log('📧 Email would be sent (no provider configured):', {
          to: options.to,
          from: options.from,
          subject: options.subject,
          provider: 'none (development)',
        });
        return {
          success: true,
          messageId: `dev-${Date.now()}`,
          provider: 'development',
        };
    }
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      provider,
    };
  }
}

/**
 * SendGrid Implementation
 */
async function sendWithSendGrid(options: EmailOptions): Promise<EmailResult> {
  const apiKey = process.env.SENDGRID_API_KEY;
  
  if (!apiKey) {
    throw new Error('SENDGRID_API_KEY is not configured');
  }

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: Array.isArray(options.to) 
            ? options.to.map(email => ({ email }))
            : [{ email: options.to }],
          subject: options.subject,
        },
      ],
      from: { email: options.from },
      reply_to: options.replyTo ? { email: options.replyTo } : undefined,
      content: [
        {
          type: 'text/plain',
          value: options.text,
        },
        ...(options.html ? [{
          type: 'text/html',
          value: options.html,
        }] : []),
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`SendGrid API error: ${response.status} - ${errorText}`);
  }

  return {
    success: true,
    messageId: response.headers.get('x-message-id') || undefined,
    provider: 'sendgrid',
  };
}

/**
 * Mailgun Implementation
 */
async function sendWithMailgun(options: EmailOptions): Promise<EmailResult> {
  const apiKey = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;
  
  if (!apiKey || !domain) {
    throw new Error('MAILGUN_API_KEY and MAILGUN_DOMAIN must be configured');
  }

  const formData = new URLSearchParams();
  formData.append('from', options.from);
  formData.append('subject', options.subject);
  formData.append('text', options.text);
  
  if (options.html) {
    formData.append('html', options.html);
  }
  
  if (options.replyTo) {
    formData.append('h:Reply-To', options.replyTo);
  }
  
  const toAddresses = Array.isArray(options.to) ? options.to : [options.to];
  toAddresses.forEach(email => formData.append('to', email));

  const response = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`api:${apiKey}`).toString('base64')}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Mailgun API error: ${response.status} - ${errorText}`);
  }

  const result = await response.json();

  return {
    success: true,
    messageId: result.id,
    provider: 'mailgun',
  };
}

/**
 * SMTP Implementation using Nodemailer
 */
async function sendWithSMTP(options: EmailOptions): Promise<EmailResult> {
  // Note: This requires nodemailer package
  // Dynamic import to avoid loading if not needed
  const nodemailer = await import('nodemailer');
  
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587');
  const secure = process.env.SMTP_SECURE === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  
  if (!host || !user || !pass) {
    throw new Error('SMTP configuration incomplete (SMTP_HOST, SMTP_USER, SMTP_PASSWORD required)');
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  const info = await transporter.sendMail({
    from: options.from,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
    replyTo: options.replyTo,
  });

  return {
    success: true,
    messageId: info.messageId,
    provider: 'smtp',
  };
}

/**
 * Template helpers for common email formats
 */

export function formatContactFormEmail(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): { text: string; html: string } {
  const text = `
New Contact Form Submission

From: ${data.name}
Email: ${data.email}
${data.subject ? `Subject: ${data.subject}\n` : ''}
Message:
${data.message}

---
Submitted: ${new Date().toLocaleString()}
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #4F46E5; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
    .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #4F46E5; }
    .value { margin-top: 5px; }
    .message { background: white; padding: 15px; border-left: 4px solid #4F46E5; margin-top: 10px; }
    .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">📧 New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">From:</div>
        <div class="value">${data.name}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      ${data.subject ? `
      <div class="field">
        <div class="label">Subject:</div>
        <div class="value">${data.subject}</div>
      </div>
      ` : ''}
      <div class="field">
        <div class="label">Message:</div>
        <div class="message">${data.message.replace(/\n/g, '<br>')}</div>
      </div>
      <div class="footer">
        Submitted: ${new Date().toLocaleString()}
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();

  return { text, html };
}

export function formatCustomRequestEmail(data: {
  clientName: string;
  clientEmail: string;
  projectTitle: string;
  projectDescription: string;
  projectType?: string;
  desiredFeatures?: string;
  preferredTechStack?: string;
  budgetRange?: string;
  deadline?: string;
  requestId: string;
}): { text: string; html: string } {
  const text = `
New Custom Project Request

Request ID: ${data.requestId}

Client Information:
- Name: ${data.clientName}
- Email: ${data.clientEmail}

Project Details:
- Title: ${data.projectTitle}
- Description: ${data.projectDescription}
${data.projectType ? `- Type: ${data.projectType}` : ''}
${data.desiredFeatures ? `- Desired Features: ${data.desiredFeatures}` : ''}
${data.preferredTechStack ? `- Tech Stack: ${data.preferredTechStack}` : ''}
${data.budgetRange ? `- Budget Range: ${data.budgetRange}` : ''}
${data.deadline ? `- Deadline: ${data.deadline}` : ''}

---
Submitted: ${new Date().toLocaleString()}
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #10B981; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
    .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
    .section { margin-bottom: 20px; }
    .section-title { font-size: 18px; font-weight: bold; color: #10B981; margin-bottom: 10px; border-bottom: 2px solid #10B981; padding-bottom: 5px; }
    .field { margin-bottom: 12px; }
    .label { font-weight: bold; color: #059669; }
    .value { margin-top: 5px; }
    .description { background: white; padding: 15px; border-left: 4px solid #10B981; margin-top: 10px; }
    .request-id { background: #10B981; color: white; padding: 10px; border-radius: 5px; font-family: monospace; text-align: center; margin-bottom: 20px; }
    .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">🚀 New Custom Project Request</h2>
    </div>
    <div class="content">
      <div class="request-id">
        Request ID: <strong>${data.requestId}</strong>
      </div>
      
      <div class="section">
        <div class="section-title">Client Information</div>
        <div class="field">
          <div class="label">Name:</div>
          <div class="value">${data.clientName}</div>
        </div>
        <div class="field">
          <div class="label">Email:</div>
          <div class="value"><a href="mailto:${data.clientEmail}">${data.clientEmail}</a></div>
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">Project Details</div>
        <div class="field">
          <div class="label">Title:</div>
          <div class="value"><strong>${data.projectTitle}</strong></div>
        </div>
        <div class="field">
          <div class="label">Description:</div>
          <div class="description">${data.projectDescription.replace(/\n/g, '<br>')}</div>
        </div>
        ${data.projectType ? `
        <div class="field">
          <div class="label">Project Type:</div>
          <div class="value">${data.projectType}</div>
        </div>
        ` : ''}
        ${data.desiredFeatures ? `
        <div class="field">
          <div class="label">Desired Features:</div>
          <div class="value">${data.desiredFeatures}</div>
        </div>
        ` : ''}
        ${data.preferredTechStack ? `
        <div class="field">
          <div class="label">Preferred Tech Stack:</div>
          <div class="value">${data.preferredTechStack}</div>
        </div>
        ` : ''}
        ${data.budgetRange ? `
        <div class="field">
          <div class="label">Budget Range:</div>
          <div class="value">${data.budgetRange}</div>
        </div>
        ` : ''}
        ${data.deadline ? `
        <div class="field">
          <div class="label">Deadline:</div>
          <div class="value">${data.deadline}</div>
        </div>
        ` : ''}
      </div>
      
      <div class="footer">
        Submitted: ${new Date().toLocaleString()}
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();

  return { text, html };
}

export function formatClientConfirmationEmail(data: {
  name: string;
  requestId: string;
  projectTitle: string;
}): { text: string; html: string } {
  const text = `
Hi ${data.name},

Thank you for submitting your custom project request!

We have received your request for "${data.projectTitle}" and our team is reviewing it.

Request ID: ${data.requestId}

What happens next:
1. Our team will review your project requirements
2. We'll contact you within 24-48 hours to discuss details
3. You'll receive a detailed proposal with timeline and pricing

If you have any questions in the meantime, feel free to reply to this email.

Best regards,
The Project Hub X Team
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #4F46E5; color: white; padding: 30px; border-radius: 5px 5px 0 0; text-align: center; }
    .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
    .request-id { background: #EEF2FF; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0; }
    .steps { background: #f9fafb; padding: 20px; border-radius: 5px; margin: 20px 0; }
    .step { margin-bottom: 10px; padding-left: 30px; position: relative; }
    .step:before { content: "✓"; position: absolute; left: 0; color: #10B981; font-weight: bold; }
    .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">🎉 Request Received!</h1>
    </div>
    <div class="content">
      <p>Hi <strong>${data.name}</strong>,</p>
      
      <p>Thank you for submitting your custom project request!</p>
      
      <p>We have received your request for <strong>"${data.projectTitle}"</strong> and our team is reviewing it.</p>
      
      <div class="request-id">
        <strong>Request ID:</strong> <code>${data.requestId}</code><br>
        <small style="color: #6b7280;">Save this for your records</small>
      </div>
      
      <h3 style="color: #4F46E5;">What happens next:</h3>
      <div class="steps">
        <div class="step">Our team will review your project requirements</div>
        <div class="step">We'll contact you within 24-48 hours to discuss details</div>
        <div class="step">You'll receive a detailed proposal with timeline and pricing</div>
      </div>
      
      <p>If you have any questions in the meantime, feel free to reply to this email.</p>
      
      <div class="footer">
        <p><strong>Best regards,</strong><br>The Project Hub X Team</p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();

  return { text, html };
}
