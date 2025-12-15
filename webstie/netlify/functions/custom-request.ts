import { Handler, HandlerEvent } from '@netlify/functions';
import { sendEmail, formatCustomRequestEmail, formatClientConfirmationEmail } from './services/email-service';

interface CustomRequestData {
  clientName: string;
  clientEmail: string;
  projectTitle: string;
  projectDescription: string;
  projectType: string;
  desiredFeatures: string;
  preferredTechStack: string;
  budgetRange: string;
  deadline: string;
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
    const data: CustomRequestData = JSON.parse(event.body || '{}');

    // Validate required fields
    if (!data.clientName || !data.clientEmail || !data.projectTitle || !data.projectDescription) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.clientEmail)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email address' }),
      };
    }

    // Create request ID
    const requestId = `REQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Log the request (for auditing and development)
    console.log('Custom project request:', {
      requestId,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      projectTitle: data.projectTitle,
      timestamp: new Date().toISOString(),
    });

    // Email configuration
    const adminEmail = process.env.ADMIN_EMAIL || process.env.TO_EMAIL;
    const fromEmail = process.env.FROM_EMAIL || process.env.ADMIN_EMAIL;

    // Send emails if configured
    if (adminEmail && fromEmail) {
      // 1. Send notification email to admin
      const adminEmailContent = formatCustomRequestEmail({
        ...data,
        requestId,
      });
      
      const adminResult = await sendEmail({
        to: adminEmail,
        from: fromEmail,
        replyTo: data.clientEmail,
        subject: `🚀 New Project Request: ${data.projectTitle}`,
        text: adminEmailContent.text,
        html: adminEmailContent.html,
      });

      if (!adminResult.success) {
        console.error('Failed to send admin notification:', adminResult.error);
      } else {
        console.log('Admin notification sent:', {
          provider: adminResult.provider,
          messageId: adminResult.messageId,
        });
      }

      // 2. Send confirmation email to client
      const clientEmailContent = formatClientConfirmationEmail({
        name: data.clientName,
        requestId,
        projectTitle: data.projectTitle,
      });
      
      const clientResult = await sendEmail({
        to: data.clientEmail,
        from: fromEmail,
        subject: '✅ Your Project Request Has Been Received',
        text: clientEmailContent.text,
        html: clientEmailContent.html,
      });

      if (!clientResult.success) {
        console.error('Failed to send client confirmation:', clientResult.error);
      } else {
        console.log('Client confirmation sent:', {
          provider: clientResult.provider,
          messageId: clientResult.messageId,
        });
      }
    } else {
      console.warn('Email not configured: ADMIN_EMAIL and FROM_EMAIL environment variables are not set');
    }

    // Optional: Save to content/requests/ for Git-based CMS integration
    // This can be enabled by setting SAVE_REQUESTS_TO_GIT=true
    if (process.env.SAVE_REQUESTS_TO_GIT === 'true') {
      try {
        const fs = await import('fs/promises');
        const path = await import('path');
        
        const content = `---
clientName: ${data.clientName}
clientEmail: ${data.clientEmail}
projectTitle: ${data.projectTitle}
projectDescription: ${data.projectDescription}
projectType: ${data.projectType || 'N/A'}
desiredFeatures: ${data.desiredFeatures || 'N/A'}
preferredTechStack: ${data.preferredTechStack || 'N/A'}
budgetRange: ${data.budgetRange || 'N/A'}
deadline: ${data.deadline || 'N/A'}
requestStatus: pending
submittedDate: ${new Date().toISOString()}
requestId: ${requestId}
---

${data.projectDescription}
`;

        const filename = `${requestId}.md`;
        const filepath = path.join(process.cwd(), 'content', 'requests', filename);
        await fs.writeFile(filepath, content, 'utf-8');
        
        console.log('Request saved to Git:', filepath);
      } catch (fsError) {
        console.error('Failed to save request to Git:', fsError);
        // Don't fail the request if file save fails
      }
    }

    // Send response
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        requestId,
        message: 'Your custom project request has been submitted successfully! We will contact you within 24-48 hours.',
      }),
    };
  } catch (error) {
    console.error('Custom request error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'An error occurred while processing your request',
      }),
    };
  }
};
