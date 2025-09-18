'use client';

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
// Note: Uncomment and adjust the path when you have a LineChart component
// export const DynamicChart = createDynamicComponent({
//   loader: () => import('../Data-Display/Charts/LineChart'),
//   ssr: false
// });
