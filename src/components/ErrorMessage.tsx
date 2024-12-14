import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

export function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  return (
    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 
      dark:border-red-800 rounded-lg flex items-start justify-between">
      <div className="flex items-center">
        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2 flex-shrink-0" />
        <p className="text-red-700 dark:text-red-300">{message}</p>
      </div>
      <button
        onClick={onDismiss}
        className="ml-4 text-red-400 hover:text-red-600 dark:text-red-300 
          dark:hover:text-red-100"
        aria-label="Dismiss error"
      >
        ×
      </button>
    </div>
  );
}