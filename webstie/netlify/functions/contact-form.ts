import { Handler, HandlerEvent } from '@netlify/functions';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const handler: Handler = async (event: HandlerEvent) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const data: ContactFormData = JSON.parse(event.body || '{}');

    // Validate input
    if (!data.name || !data.email || !data.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email address' }),
      };
    }

    // TODO: Send email using SendGrid, Mailgun, or SMTP
    // For now, we'll use Netlify Forms as a backup
    
    // Log submission (for development)
    console.log('Contact form submission:', {
      name: data.name,
      email: data.email,
      subject: data.subject,
      timestamp: new Date().toISOString(),
    });

    // In production, integrate with email service:
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const msg = {
      to: process.env.ADMIN_EMAIL,
      from: process.env.FROM_EMAIL,
      subject: `Contact Form: ${data.subject}`,
      text: `From: ${data.name} (${data.email})\n\n${data.message}`,
      html: `<strong>From:</strong> ${data.name} (${data.email})<br><br>${data.message}`,
    };
    
    await sgMail.send(msg);
    */

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.',
      }),
    };
  } catch (error) {
    console.error('Contact form error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'An error occurred while processing your request',
      }),
    };
  }
};
