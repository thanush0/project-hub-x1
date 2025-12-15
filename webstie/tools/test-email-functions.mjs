#!/usr/bin/env node
/**
 * Email Functions Test Script
 * Tests the serverless email functionality
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function header(message) {
  console.log('\n' + '='.repeat(60));
  log(message, 'bright');
  console.log('='.repeat(60) + '\n');
}

// Check if URL is provided
const siteUrl = process.argv[2];

if (!siteUrl) {
  header('📧 Email Functions Test Script');
  log('Usage: node test-email-functions.mjs <SITE_URL>', 'yellow');
  log('\nExamples:', 'cyan');
  log('  node test-email-functions.mjs http://localhost:8888', 'cyan');
  log('  node test-email-functions.mjs https://your-site.netlify.app', 'cyan');
  console.log('');
  process.exit(1);
}

header('📧 Email Functions Test Script');
log(`Testing site: ${siteUrl}`, 'cyan');

// Test data
const contactFormData = {
  name: 'Test User',
  email: 'test@example.com',
  subject: 'Test Contact Form',
  message: 'This is a test message from the automated test script. If you receive this, the contact form email is working correctly!',
};

const customRequestData = {
  clientName: 'Test Client',
  clientEmail: 'client@example.com',
  projectTitle: 'Test Project Request',
  projectDescription: 'This is a test project request from the automated test script. It includes all the required fields and some optional ones.',
  projectType: 'Web Application',
  desiredFeatures: 'User authentication, Dashboard, API integration',
  preferredTechStack: 'React, Node.js, PostgreSQL',
  budgetRange: '$5,000 - $10,000',
  deadline: '3 months',
};

// Test functions
async function testContactForm() {
  header('Test 1: Contact Form');
  
  try {
    log('Sending test contact form submission...', 'yellow');
    
    const response = await fetch(`${siteUrl}/.netlify/functions/contact-form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactFormData),
    });

    const data = await response.json();

    if (response.ok) {
      log('✓ Contact form submitted successfully', 'green');
      log(`  Status: ${response.status}`, 'green');
      log(`  Message: ${data.message}`, 'green');
      return { success: true, test: 'contact-form' };
    } else {
      log('✗ Contact form failed', 'red');
      log(`  Status: ${response.status}`, 'red');
      log(`  Error: ${data.error || 'Unknown error'}`, 'red');
      return { success: false, test: 'contact-form', error: data.error };
    }
  } catch (error) {
    log('✗ Contact form test failed with exception', 'red');
    log(`  Error: ${error.message}`, 'red');
    return { success: false, test: 'contact-form', error: error.message };
  }
}

async function testCustomRequest() {
  header('Test 2: Custom Project Request');
  
  try {
    log('Sending test custom project request...', 'yellow');
    
    const response = await fetch(`${siteUrl}/.netlify/functions/custom-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customRequestData),
    });

    const data = await response.json();

    if (response.ok) {
      log('✓ Custom request submitted successfully', 'green');
      log(`  Status: ${response.status}`, 'green');
      log(`  Request ID: ${data.requestId}`, 'green');
      log(`  Message: ${data.message}`, 'green');
      return { success: true, test: 'custom-request', requestId: data.requestId };
    } else {
      log('✗ Custom request failed', 'red');
      log(`  Status: ${response.status}`, 'red');
      log(`  Error: ${data.error || 'Unknown error'}`, 'red');
      return { success: false, test: 'custom-request', error: data.error };
    }
  } catch (error) {
    log('✗ Custom request test failed with exception', 'red');
    log(`  Error: ${error.message}`, 'red');
    return { success: false, test: 'custom-request', error: error.message };
  }
}

async function testValidation() {
  header('Test 3: Input Validation');
  
  const results = [];
  
  // Test 1: Missing required fields
  try {
    log('Testing missing required fields...', 'yellow');
    const response = await fetch(`${siteUrl}/.netlify/functions/contact-form`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test' }), // Missing email and message
    });
    
    if (response.status === 400) {
      log('✓ Correctly rejected missing fields', 'green');
      results.push({ success: true });
    } else {
      log('✗ Should have rejected missing fields', 'red');
      results.push({ success: false });
    }
  } catch (error) {
    log(`✗ Validation test error: ${error.message}`, 'red');
    results.push({ success: false });
  }
  
  // Test 2: Invalid email
  try {
    log('Testing invalid email format...', 'yellow');
    const response = await fetch(`${siteUrl}/.netlify/functions/contact-form`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test',
        email: 'invalid-email',
        message: 'Test message',
      }),
    });
    
    if (response.status === 400) {
      log('✓ Correctly rejected invalid email', 'green');
      results.push({ success: true });
    } else {
      log('✗ Should have rejected invalid email', 'red');
      results.push({ success: false });
    }
  } catch (error) {
    log(`✗ Validation test error: ${error.message}`, 'red');
    results.push({ success: false });
  }
  
  // Test 3: Wrong HTTP method
  try {
    log('Testing wrong HTTP method (GET)...', 'yellow');
    const response = await fetch(`${siteUrl}/.netlify/functions/contact-form`, {
      method: 'GET',
    });
    
    if (response.status === 405) {
      log('✓ Correctly rejected GET request', 'green');
      results.push({ success: true });
    } else {
      log('✗ Should have rejected GET request', 'red');
      results.push({ success: false });
    }
  } catch (error) {
    log(`✗ Validation test error: ${error.message}`, 'red');
    results.push({ success: false });
  }
  
  const allPassed = results.every(r => r.success);
  return {
    success: allPassed,
    test: 'validation',
    passed: results.filter(r => r.success).length,
    total: results.length,
  };
}

// Run all tests
async function runTests() {
  const results = [];
  
  results.push(await testContactForm());
  results.push(await testCustomRequest());
  results.push(await testValidation());
  
  // Summary
  header('Test Summary');
  
  const passed = results.filter(r => r.success).length;
  const total = results.length;
  
  log(`Tests passed: ${passed}/${total}`, passed === total ? 'green' : 'yellow');
  
  console.log('\nTest Results:');
  results.forEach((result, index) => {
    const status = result.success ? '✓' : '✗';
    const color = result.success ? 'green' : 'red';
    log(`  ${status} ${result.test}`, color);
    if (result.requestId) {
      log(`    Request ID: ${result.requestId}`, 'cyan');
    }
    if (result.passed !== undefined) {
      log(`    Passed: ${result.passed}/${result.total}`, 'cyan');
    }
    if (result.error) {
      log(`    Error: ${result.error}`, 'red');
    }
  });
  
  console.log('\n' + '='.repeat(60));
  
  if (passed === total) {
    log('\n🎉 All tests passed!', 'green');
    log('\nNext steps:', 'cyan');
    log('  1. Check your email inbox (ADMIN_EMAIL)', 'cyan');
    log('  2. Check client email inbox (for custom requests)', 'cyan');
    log('  3. Review function logs in your deployment dashboard', 'cyan');
    console.log('');
  } else {
    log('\n⚠️  Some tests failed', 'yellow');
    log('\nTroubleshooting:', 'cyan');
    log('  1. Check environment variables are set correctly', 'cyan');
    log('  2. Verify EMAIL_PROVIDER configuration', 'cyan');
    log('  3. Review function logs for errors', 'cyan');
    log('  4. Check EMAIL_SETUP_GUIDE.md for help', 'cyan');
    console.log('');
  }
  
  process.exit(passed === total ? 0 : 1);
}

// Run tests
runTests().catch(error => {
  log(`\n✗ Test suite failed: ${error.message}`, 'red');
  process.exit(1);
});
