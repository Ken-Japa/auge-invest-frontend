// Accessibility utilities for consistent implementation

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
    return `${text} - ${context}`;
  }
  return text;
};

export const generateId = (prefix: string): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

// Skip link component props
export interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}
