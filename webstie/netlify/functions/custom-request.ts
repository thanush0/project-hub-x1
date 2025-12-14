import { Handler, HandlerEvent } from '@netlify/functions';

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

    // Log the request
    console.log('Custom project request:', {
      requestId,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      projectTitle: data.projectTitle,
      timestamp: new Date().toISOString(),
    });

    // TODO: In production, you would:
    // 1. Save to a database or create a file in content/requests/
    // 2. Send confirmation email to client
    // 3. Send notification email to admin

    /*
    // Example: Create markdown file for the request
    const fs = require('fs');
    const path = require('path');
    
    const content = `---
clientName: ${data.clientName}
clientEmail: ${data.clientEmail}
projectTitle: ${data.projectTitle}
projectDescription: ${data.projectDescription}
projectType: ${data.projectType}
desiredFeatures: ${data.desiredFeatures}
preferredTechStack: ${data.preferredTechStack}
budgetRange: ${data.budgetRange}
deadline: ${data.deadline}
requestStatus: pending
submittedDate: ${new Date().toISOString()}
requestId: ${requestId}
---
`;

    const filename = `${requestId}.md`;
    const filepath = path.join(__dirname, '../../content/requests/', filename);
    fs.writeFileSync(filepath, content);
    
    // Commit to git and trigger rebuild
    */

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
