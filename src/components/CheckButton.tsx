import React from 'react';
import { Wand2, Loader2 } from 'lucide-react';

interface CheckButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
  text: string;
}

export function CheckButton({ onClick, isLoading, disabled, text }: CheckButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 
        disabled:bg-indigo-300 dark:disabled:bg-indigo-800 text-white font-medium 
        rounded-lg transition-colors"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <Wand2 className="w-5 h-5 mr-2" />
          {text}
        </>
      )}
    </button>
  );
}