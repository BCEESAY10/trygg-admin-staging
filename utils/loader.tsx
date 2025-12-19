import React from 'react';

export const Loader: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}> = ({ size = 'md', fullScreen = false }) => {
  const sizeClasses: Record<'sm' | 'md' | 'lg', string> = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  const spinner = (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} border-gray-200 border-t-[#fbbf24] rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-3">
          <div
            className={`${sizeClasses.lg} border-gray-200 border-t-[#fbbf24] rounded-full animate-spin`}
          />
          <p className="text-gray-600 text-sm font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return spinner;
};
