#!/usr/bin/env node
/**
 * Test Script for Content Generator
 * 
 * Validates the generator output without needing frontend dependencies
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

console.log('🧪 Testing Content Generator Output...\n');

// Read the generated file
const mockDataPath = path.join(rootDir, 'project-hub-x', 'integrations', 'cms', 'mock-data.ts');

if (!fs.existsSync(mockDataPath)) {
  console.error('❌ Error: mock-data.ts not found!');
  console.error('   Run: node tools/generate-mockdata-from-content.mjs');
  process.exit(1);
}

const content = fs.readFileSync(mockDataPath, 'utf-8');

// Validation checks
const checks = {
  'Has TypeScript interface': /interface MockCollection/.test(content),
  'Has mockDataStore': /const mockDataStore: MockCollection/.test(content),
  'Exports getMockCollection': /export const getMockCollection/.test(content),
  'Exports setMockCollection': /export const setMockCollection/.test(content),
  'Exports mockDataStore': /export { mockDataStore }/.test(content),
  'Has auto-generated comment': /AUTO-GENERATED FILE/.test(content),
  'Has timestamp': /Last generated:/.test(content),
  'Has readymadeprojects collection': /"readymadeprojects":/.test(content),
  'Has faq collection': /"faq":/.test(content),
  'Has clienttestimonials collection': /"clienttestimonials":/.test(content),
  'Has howitworkssteps collection': /"howitworkssteps":/.test(content),
  'Has developerprofiles collection': /"developerprofiles":/.test(content),
  'Valid JSON structure': (() => {
    try {
      const match = content.match(/const mockDataStore: MockCollection = ({[\s\S]+?});/);
      if (match) {
        JSON.parse(match[1]);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  })()
};

// Display results
console.log('✅ Validation Results:\n');
let passed = 0;
let failed = 0;

Object.entries(checks).forEach(([check, result]) => {
  if (result) {
    console.log(`  ✅ ${check}`);
    passed++;
  } else {
    console.log(`  ❌ ${check}`);
    failed++;
  }
});

// Count items
const projectsMatch = content.match(/"readymadeprojects":\s*\[([\s\S]*?)\]/);
const faqMatch = content.match(/"faq":\s*\[([\s\S]*?)\]/);
const testimonialsMatch = content.match(/"clienttestimonials":\s*\[([\s\S]*?)\]/);
const stepsMatch = content.match(/"howitworkssteps":\s*\[([\s\S]*?)\]/);
const devsMatch = content.match(/"developerprofiles":\s*\[([\s\S]*?)\]/);

const countItems = (match) => {
  if (!match || !match[1].trim()) return 0;
  return (match[1].match(/"_id":/g) || []).length;
};

console.log('\n📊 Content Statistics:\n');
console.log(`  • Projects: ${countItems(projectsMatch)} items`);
console.log(`  • FAQ: ${countItems(faqMatch)} items`);
console.log(`  • Testimonials: ${countItems(testimonialsMatch)} items`);
console.log(`  • Steps: ${countItems(stepsMatch)} items`);
console.log(`  • Developers: ${countItems(devsMatch)} items`);

console.log('\n📏 File Statistics:\n');
const lines = content.split('\n').length;
const size = fs.statSync(mockDataPath).size;
console.log(`  • Lines: ${lines}`);
console.log(`  • Size: ${(size / 1024).toFixed(2)} KB`);

// Summary
console.log('\n' + '='.repeat(60));
if (failed === 0) {
  console.log('✅ All checks passed! Generator is working perfectly.');
  console.log('🎉 Ready for deployment!');
} else {
  console.log(`⚠️  ${failed} check(s) failed. Please review the output.`);
}
console.log('='.repeat(60) + '\n');

process.exit(failed === 0 ? 0 : 1);
