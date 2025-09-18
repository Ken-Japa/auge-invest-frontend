const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing SSR compatibility issues...');

// Files that need 'use client' directive based on browser API usage
const filesToFix = [
  'src/theme/ThemeContext.tsx',
  'src/utils/auth.ts',
  'src/components/Effects/MatrixRainText/index.tsx',
  'src/components/Layout/components/Header/Navbar/NavDropdown.tsx',
  'src/pagesComponents/Blog/components/BlogPost/components/ShareSection.tsx',
  'src/pagesComponents/Logado/Analise Fundamentalista/index.tsx',
  'src/pagesComponents/Logado/Visao-Economia/index.tsx',
  'src/pagesComponents/Nao-Logado/Home/Welcome/index.tsx',
  'src/pagesComponents/Nao-Logado/Embaixadores/index.tsx',
  'src/pagesComponents/Logado/components/EmpresaView/Elementos/ModoVisualizacao/MapaArvore/index.tsx'
];

let fixedCount = 0;

filesToFix.forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Check if 'use client' already exists
    if (!content.includes('use client')) {
      // Add 'use client' at the top after initial comments
      const lines = content.split('\n');
      let insertIndex = 0;
      
      // Skip initial comments and imports to find the right place
      while (insertIndex < lines.length) {
        const line = lines[insertIndex].trim();
        if (line.startsWith('//') || line.startsWith('/*') || line === '') {
          insertIndex++;
        } else {
          break;
        }
      }
      
      lines.splice(insertIndex, 0, "'use client';", '');
      content = lines.join('\n');
      
      fs.writeFileSync(fullPath, content);
      console.log(`✅ Added 'use client' to ${filePath}`);
      fixedCount++;
    } else {
      console.log(`✓ ${filePath} already has 'use client'`);
    }
  } else {
    console.log(`⚠️ File not found: ${filePath}`);
  }
});

// Create a dynamic import wrapper for problematic components
const dynamicWrapperPath = path.join(process.cwd(), 'src', 'components', 'Utils', 'DynamicImport.tsx');
const dynamicWrapperContent = `'use client';

import { ComponentType, Suspense } from 'react';
import dynamic from 'next/dynamic';

interface DynamicImportProps {
  loader: () => Promise<{ default: ComponentType<any> }>;
  loading?: ComponentType;
  error?: ComponentType<{ error: Error }>;
  ssr?: boolean;
}

const DefaultLoading = () => (
  <div className="flex items-center justify-center p-4" role="status" aria-label="Loading">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    <span className="sr-only">Loading...</span>
  </div>
);

const DefaultError = ({ error }: { error: Error }) => (
  <div className="text-red-500 p-4" role="alert">
    <h3>Something went wrong</h3>
    <p className="text-sm">{error.message}</p>
  </div>
);

export function createDynamicComponent<T = any>({
  loader,
  loading: Loading = DefaultLoading,
  error: ErrorComponent = DefaultError,
  ssr = false
}: DynamicImportProps) {
  const DynamicComponent = dynamic(loader, {
    ssr,
    loading: () => <Loading />,
  });

  return function DynamicWrapper(props: T) {
    return (
      <Suspense fallback={<Loading />}>
        <DynamicComponent {...props} />
      </Suspense>
    );
  };
}

// Helper for chart components that commonly have SSR issues
export const DynamicChart = createDynamicComponent({
  loader: () => import('../Data-Display/Charts/LineChart'),
  ssr: false
});
`;

// Ensure the directory exists
const utilsDir = path.dirname(dynamicWrapperPath);
if (!fs.existsSync(utilsDir)) {
  fs.mkdirSync(utilsDir, { recursive: true });
}

fs.writeFileSync(dynamicWrapperPath, dynamicWrapperContent);
console.log('✅ Created dynamic import utility');

// Fix the CustomButton component focus styles
const buttonPath = path.join(process.cwd(), 'src', 'components', 'Core', 'Button', 'index.tsx');
if (fs.existsSync(buttonPath)) {
  let buttonContent = fs.readFileSync(buttonPath, 'utf8');
  
  // Add focus styles to the customStyles object
  if (!buttonContent.includes('focus-visible')) {
    const focusStyles = `
        '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: '2px',
        },
        '&:focus': {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: '2px',
        },`;
    
    buttonContent = buttonContent.replace(
      'textTransform: \'none\',',
      `textTransform: 'none',${focusStyles}`
    );
    
    fs.writeFileSync(buttonPath, buttonContent);
    console.log('✅ Added focus styles to CustomButton');
    fixedCount++;
  }
}

console.log(`\n🎉 SSR fixes complete! Fixed ${fixedCount} files.`);
console.log('\n🔧 Additional recommendations:');
console.log('1. Test the build to ensure no more SSR errors');
console.log('2. Use the DynamicImport utility for future client-only components');
console.log('3. Consider using React.lazy() for code splitting');
console.log('4. Ensure all interactive components have proper focus management');