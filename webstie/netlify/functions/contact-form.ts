import { Handler, HandlerEvent } from '@netlify/functions';
import { sendEmail, formatContactFormEmail } from './services/email-service';

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

    // Log submission (for development and auditing)
    console.log('Contact form submission:', {
      name: data.name,
      email: data.email,
      subject: data.subject,
      timestamp: new Date().toISOString(),
    });

    // Send email notification to admin
    const adminEmail = process.env.ADMIN_EMAIL || process.env.TO_EMAIL;
    const fromEmail = process.env.FROM_EMAIL || process.env.ADMIN_EMAIL;

    if (adminEmail && fromEmail) {
      const emailContent = formatContactFormEmail(data);
      
      const result = await sendEmail({
        to: adminEmail,
        from: fromEmail,
        replyTo: data.email,
        subject: data.subject ? `Contact Form: ${data.subject}` : 'New Contact Form Submission',
        text: emailContent.text,
        html: emailContent.html,
      });

      if (!result.success) {
        console.error('Failed to send email notification:', result.error);
        // Don't fail the request if email fails, just log it
        // The form submission is still recorded in logs
      } else {
        console.log('Email sent successfully:', {
          provider: result.provider,
          messageId: result.messageId,
        });
      }
    } else {
      console.warn('Email not configured: ADMIN_EMAIL and FROM_EMAIL environment variables are not set');
    }

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
