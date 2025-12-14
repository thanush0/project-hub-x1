/**
 * API Service for backend communication
 * Handles all API calls to Netlify Functions
 */

const API_BASE = '/.netlify/functions';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface CustomRequestData {
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

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

/**
 * Submit contact form
 */
export async function submitContactForm(data: ContactFormData): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE}/contact-form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to submit form');
    }

    return result;
  } catch (error) {
    console.error('Contact form submission error:', error);
    throw error;
  }
}

/**
 * Submit custom project request
 */
export async function submitCustomRequest(data: CustomRequestData): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE}/custom-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to submit request');
    }

    return result;
  } catch (error) {
    console.error('Custom request submission error:', error);
    throw error;
  }
}

/**
 * Upload file to server
 */
export async function uploadFile(file: File): Promise<{ url: string }> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE}/upload-file`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to upload file');
    }

    return result;
  } catch (error) {
    console.error('File upload error:', error);
    throw error;
  }
}
