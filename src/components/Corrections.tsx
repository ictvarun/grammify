import React from 'react';
import type { Correction } from '../types/grammar';
import { ERROR_TYPES } from '../config/constants';

interface CorrectionsProps {
  corrections: Correction[];
}

export function Corrections({ corrections }: CorrectionsProps) {
  const getTypeColor = (type: Correction['type']) => {
    switch (type) {
      case ERROR_TYPES.SPELLING:
        return 'text-red-600 dark:text-red-400';
      case ERROR_TYPES.GRAMMAR:
        return 'text-blue-600 dark:text-blue-400';
      case ERROR_TYPES.PUNCTUATION:
        return 'text-yellow-600 dark:text-yellow-400';
      case ERROR_TYPES.STRUCTURE:
        return 'text-purple-600 dark:text-purple-400';
      case ERROR_TYPES.STYLE:
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Corrections Made
      </h3>
      <div className="space-y-4">
        {corrections.map((correction, index) => (
          <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className={`font-medium capitalize ${getTypeColor(correction.type)}`}>
                {correction.type}:
              </span>
              <div className="flex-1">
                <span className="line-through text-gray-500 dark:text-gray-400">
                  {correction.original}
                </span>
                {' → '}
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {correction.corrected}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {correction.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}