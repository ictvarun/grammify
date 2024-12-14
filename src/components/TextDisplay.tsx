import React from 'react';
import { CopyButton } from './CopyButton';

interface TextDisplayProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  readOnly?: boolean;
}

export function TextDisplay({ value, onChange, placeholder, readOnly }: TextDisplayProps) {
  return (
    <div className="relative h-full">
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full h-full min-h-[300px] p-4 border border-gray-200 dark:border-gray-700 
          rounded-lg ${
            readOnly 
              ? 'bg-gray-50 dark:bg-gray-900 dark:text-gray-300' 
              : 'dark:bg-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
          } resize-none transition-colors text-base leading-relaxed`}
      />
      {readOnly && value && (
        <div className="absolute top-2 right-2">
          <CopyButton text={value} />
        </div>
      )}
    </div>
  );
}