'use client';

import Link from 'next/link';

export const SkipLinks = () => {
  return (
    <div className="skip-links">
      <Link 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:no-underline"
      >
        Skip to main content
      </Link>
      <Link 
        href="#navigation"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:no-underline"
      >
        Skip to navigation
      </Link>
    </div>
  );
};
