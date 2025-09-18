const fs = require('fs');
const path = require('path');

console.log('🔧 Implementing critical accessibility fixes...');

// 1. Fix Layout component semantic structure
const layoutPath = path.join(process.cwd(), 'src', 'components', 'Layout', 'index.tsx');
if (fs.existsSync(layoutPath)) {
  let layoutContent = fs.readFileSync(layoutPath, 'utf8');
  
  // Replace div with main element
  layoutContent = layoutContent.replace(
    '<div className="border-t border-b border-infoContrastText">',
    '<main role="main" className="border-t border-b border-infoContrastText">'
  );
  layoutContent = layoutContent.replace(
    '</div>',
    '</main>'
  );
  
  fs.writeFileSync(layoutPath, layoutContent);
  console.log('✅ Fixed semantic structure in Layout component');
} else {
  console.log('⚠️ Layout component not found at expected path');
}

// 2. Update Tailwind config with better contrast colors
const tailwindConfigPath = path.join(process.cwd(), 'tailwind.config.ts');
if (fs.existsSync(tailwindConfigPath)) {
  let tailwindContent = fs.readFileSync(tailwindConfigPath, 'utf8');
  
  // Update problematic colors
  tailwindContent = tailwindContent.replace(
    'primaryMain: "#00FB0A"',
    'primaryMain: "#00AA08"'
  );
  tailwindContent = tailwindContent.replace(
    'primaryContrastText: "#005203"',
    'primaryContrastText: "#FFFFFF"'
  );
  tailwindContent = tailwindContent.replace(
    'successMain: "#858080"',
    'successMain: "#2E7D32"'
  );
  tailwindContent = tailwindContent.replace(
    'errorMain: "#FF0000"',
    'errorMain: "#C62828"'
  );
  
  // Add focus ring color if not exists
  if (!tailwindContent.includes('focusRing')) {
    tailwindContent = tailwindContent.replace(
      'errorMain: "#C62828",',
      'errorMain: "#C62828",\n        focusRing: "#2196F3",'
    );
  }
  
  fs.writeFileSync(tailwindConfigPath, tailwindContent);
  console.log('✅ Updated color contrast in Tailwind config');
} else {
  console.log('⚠️ Tailwind config not found');
}

// 3. Create accessibility utilities
const utilsDir = path.join(process.cwd(), 'src', 'utils');
if (!fs.existsSync(utilsDir)) {
  fs.mkdirSync(utilsDir, { recursive: true });
}

const accessibilityUtilsPath = path.join(utilsDir, 'accessibility.ts');
const accessibilityUtilsContent = `// Accessibility utilities for consistent implementation

export const screenReaderOnly = {
  position: 'absolute' as const,
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap' as const,
  border: '0',
};

export const focusStyles = {
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: '#2196F3', // focusRing color
    outlineOffset: '2px',
    borderRadius: '4px',
  },
  '&:focus': {
    outline: '2px solid',
    outlineColor: '#2196F3',
    outlineOffset: '2px',
    borderRadius: '4px',
  },
};

// ARIA helpers
export const getAriaLabel = (text: string, context?: string): string => {
  if (context) {
    return \`\${text} - \${context}\`;
  }
  return text;
};

export const generateId = (prefix: string): string => {
  return \`\${prefix}-\${Math.random().toString(36).substr(2, 9)}\`;
};

// Skip link component props
export interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}
`;

fs.writeFileSync(accessibilityUtilsPath, accessibilityUtilsContent);
console.log('✅ Created accessibility utilities');

// 4. Create skip links component
const skipLinksPath = path.join(process.cwd(), 'src', 'components', 'Layout', 'SkipLinks.tsx');
const skipLinksContent = `'use client';

import Link from 'next/link';
import { screenReaderOnly } from '@/utils/accessibility';

export const SkipLinks = () => {
  return (
    <div className="skip-links">
      <Link 
        href="#main-content"
        className="skip-link"
        style={{
          ...screenReaderOnly,
          ':focus': {
            position: 'static',
            width: 'auto',
            height: 'auto',
            padding: '8px 16px',
            margin: '0',
            overflow: 'visible',
            clip: 'auto',
            whiteSpace: 'normal',
            backgroundColor: '#000',
            color: '#fff',
            textDecoration: 'none',
            zIndex: 9999,
          }
        }}
      >
        Skip to main content
      </Link>
      <Link 
        href="#navigation"
        className="skip-link"
        style={{
          ...screenReaderOnly,
          ':focus': {
            position: 'static',
            width: 'auto',
            height: 'auto',
            padding: '8px 16px',
            margin: '0',
            overflow: 'visible',
            clip: 'auto',
            whiteSpace: 'normal',
            backgroundColor: '#000',
            color: '#fff',
            textDecoration: 'none',
            zIndex: 9999,
          }
        }}
      >
        Skip to navigation
      </Link>
    </div>
  );
};
`;

fs.writeFileSync(skipLinksPath, skipLinksContent);
console.log('✅ Created skip links component');

console.log('\n🎉 Accessibility fixes implemented successfully!');
console.log('\nNext steps:');
console.log('1. Update your main layout to include <SkipLinks />');
console.log('2. Add id="main-content" to your main content area');
console.log('3. Add id="navigation" to your navigation component');
console.log('4. Test with screen reader and keyboard navigation');
console.log('5. Run accessibility tests: npm install --save-dev @axe-core/react');