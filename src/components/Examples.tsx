import React from 'react';
import type { Example } from '../types/grammar';

interface ExamplesProps {
  examples: Example[];
}

export function Examples({ examples }: ExamplesProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Similar Examples
      </h3>
      <div className="space-y-4">
        {examples.map((example, index) => (
          <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
            <p className="font-medium text-gray-800 dark:text-gray-200 mb-2">
              {example.similar}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {example.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}