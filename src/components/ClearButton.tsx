import React from 'react';
import { Eraser } from 'lucide-react';

interface ClearButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export function ClearButton({ onClick, disabled }: ClearButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 
        disabled:bg-gray-300 dark:disabled:bg-gray-800 text-white font-medium 
        rounded-lg transition-colors"
    >
      <Eraser className="w-5 h-5 mr-2" />
      Clear
    </button>
  );
}