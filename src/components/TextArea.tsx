import React from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import { TextDisplay } from './TextDisplay';

interface TextAreaProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  label: string;
  readOnly?: boolean;
}

export function TextArea({ value, onChange, placeholder, label, readOnly }: TextAreaProps) {
  const { displayText, isTyping } = useTypewriter(readOnly ? value : '', {
    speed: 30,
    initialDelay: 100
  });

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          {label}
        </h2>
        {readOnly && isTyping && (
          <div className="text-sm text-indigo-600 dark:text-indigo-400 animate-pulse">
            Typing...
          </div>
        )}
      </div>
      <div className="flex-1 min-h-0">
        <TextDisplay
          value={readOnly ? displayText : value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
}