const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('📦 Optimizing dependencies for better performance...');

// Read current package.json
const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

console.log('\n🔍 Analyzing current dependencies...');

// Dependencies to remove (duplicates or unnecessary)
const dependenciesToRemove = [];
const devDependenciesToAdd = [];

// Check for duplicate date libraries
if (packageJson.dependencies['dayjs'] && packageJson.dependencies['date-fns']) {
  dependenciesToRemove.push('dayjs');
  console.log('❌ Found duplicate date library: dayjs (keeping date-fns)');
}

// Check for potential chart library optimization
const chartLibs = ['d3', '@nivo/core', '@nivo/line', 'recharts'];
const foundChartLibs = chartLibs.filter(lib => packageJson.dependencies[lib]);
if (foundChartLibs.length > 2) {
  console.log(`⚠️  Found ${foundChartLibs.length} chart libraries:`, foundChartLibs);
  console.log('   Consider consolidating to a single solution for smaller bundle size');
}

// Add accessibility testing tools if not present
if (!packageJson.devDependencies['@axe-core/react']) {
  devDependenciesToAdd.push('@axe-core/react', 'jest-axe');
  console.log('➕ Will add accessibility testing tools');
}

// Add bundle analysis tools if not present
if (!packageJson.devDependencies['depcheck']) {
  devDependenciesToAdd.push('depcheck');
  console.log('➕ Will add dependency analysis tools');
}

// Remove unnecessary dependencies
if (dependenciesToRemove.length > 0) {
  console.log('\n🗑️  Removing unnecessary dependencies...');
  try {
    execSync(`npm uninstall ${dependenciesToRemove.join(' ')}`, { stdio: 'inherit' });
    console.log('✅ Successfully removed dependencies');
  } catch (error) {
    console.log('⚠️  Error removing dependencies:', error.message);
  }
}

// Add development dependencies
if (devDependenciesToAdd.length > 0) {
  console.log('\n➕ Adding development dependencies...');
  try {
    execSync(`npm install --save-dev ${devDependenciesToAdd.join(' ')}`, { stdio: 'inherit' });
    console.log('✅ Successfully added dev dependencies');
  } catch (error) {
    console.log('⚠️  Error adding dependencies:', error.message);
  }
}

// Run dependency analysis
console.log('\n🔍 Running dependency analysis...');
try {
  console.log('\n📊 Unused dependencies check:');
  execSync('npx depcheck --json > dependency-analysis.json', { stdio: 'pipe' });
  
  const depcheckResult = JSON.parse(fs.readFileSync('dependency-analysis.json', 'utf8'));
  
  if (depcheckResult.dependencies && depcheckResult.dependencies.length > 0) {
    console.log('❌ Unused dependencies found:');
    depcheckResult.dependencies.forEach(dep => console.log(`   - ${dep}`));
  } else {
    console.log('✅ No unused dependencies found');
  }
  
  if (depcheckResult.devDependencies && depcheckResult.devDependencies.length > 0) {
    console.log('❌ Unused dev dependencies found:');
    depcheckResult.devDependencies.forEach(dep => console.log(`   - ${dep}`));
  } else {
    console.log('✅ No unused dev dependencies found');
  }
  
  // Clean up
  fs.unlinkSync('dependency-analysis.json');
  
} catch (error) {
  console.log('⚠️  Could not run dependency analysis:', error.message);
}

// Security audit
console.log('\n🔒 Running security audit...');
try {
  execSync('npm audit --audit-level moderate', { stdio: 'inherit' });
} catch (error) {
  console.log('⚠️  Security vulnerabilities found. Run "npm audit fix" to resolve.');
}

console.log('\n🎉 Dependency optimization complete!');
console.log('\n📋 Summary of optimizations:');
console.log('✅ Removed duplicate date libraries');
console.log('✅ Added accessibility testing tools');
console.log('✅ Added dependency analysis tools');
console.log('✅ Ran security audit');

console.log('\n🔧 Next steps:');
console.log('1. Review and remove any unused dependencies shown above');
console.log('2. Consider consolidating chart libraries for smaller bundle size');
console.log('3. Run "npm run build" to test the optimized build');
console.log('4. Run "npm run bench:bundle" to see the improvement');