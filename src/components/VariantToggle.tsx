import React from 'react';
import { Flag, FlagTriangleRight } from 'lucide-react';

interface VariantToggleProps {
  selected: 'british' | 'american';
  onChange: (variant: 'british' | 'american') => void;
}

export function VariantToggle({ selected, onChange }: VariantToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-md">
      <button
        onClick={() => onChange('british')}
        className={`flex items-center gap-2 px-3 py-2 rounded ${
          selected === 'british'
            ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        <Flag className="w-4 h-4" />
        British
      </button>
      <button
        onClick={() => onChange('american')}
        className={`flex items-center gap-2 px-3 py-2 rounded ${
          selected === 'american'
            ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        <FlagTriangleRight className="w-4 h-4" />
        American
      </button>
    </div>
  );
}