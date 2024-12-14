import React from 'react';
import { TextArea } from '../TextArea';
import { Loader2 } from 'lucide-react';

interface EmailOutputProps {
  email: string;
  isLoading: boolean;
}

export function EmailOutput({ email, isLoading }: EmailOutputProps) {
  return (
    <div className="h-full bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm 
      border border-gray-100 dark:border-gray-700 flex flex-col">
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Generating email...</span>
          </div>
        </div>
      ) : (
        <div className="flex-1 min-h-0">
          <TextArea
            value={email}
            placeholder="Generated email will appear here..."
            label="Generated Email"
            readOnly
          />
        </div>
      )}
    </div>
  );
}