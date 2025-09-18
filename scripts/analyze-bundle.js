const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create reports directory
const reportsDir = path.join(process.cwd(), 'benchmark-reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

console.log('🔍 Building project for bundle analysis...');

try {
  // Build the project
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('📊 Analyzing bundle...');
  
  // Generate bundle report
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportPath = path.join(reportsDir, `bundle-analysis-${timestamp}.html`);
  
  // Use webpack-bundle-analyzer directly on the built files
  execSync(`npx webpack-bundle-analyzer .next/static/chunks/*.js -r "${reportPath}" -m static`, { 
    stdio: 'inherit',
    timeout: 60000 // 60 seconds timeout
  });
  
  console.log(`✅ Bundle analysis complete! Report saved to: ${reportPath}`);
  
  // Also create a JSON report for programmatic access
  const jsonReportPath = path.join(reportsDir, `bundle-analysis-${timestamp}.json`);
  try {
    execSync(`npx webpack-bundle-analyzer .next/static/chunks/*.js -r "${jsonReportPath}" -m json`, { 
      stdio: 'pipe',
      timeout: 30000
    });
    console.log(`📄 JSON report saved to: ${jsonReportPath}`);
  } catch (error) {
    console.warn('⚠️ Could not generate JSON report, but HTML report is available');
  }
  
} catch (error) {
  console.error('❌ Bundle analysis failed:', error.message);
  process.exit(1);
}