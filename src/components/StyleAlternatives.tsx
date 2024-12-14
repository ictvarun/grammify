import React from 'react';
import type { StyleAlternatives as StyleAlternativesType } from '../types/grammar';
import type { Example } from '../types/grammar';

interface StyleAlternativesProps {
  alternatives: StyleAlternativesType;
  examples: Example[];
}

export function StyleAlternatives({ alternatives, examples }: StyleAlternativesProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Style Alternatives & Examples
      </h3>
      <div className="space-y-6">
        {/* Style Alternatives Section */}
        <div className="space-y-4">
          {alternatives.formal && (
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                Formal:
              </h4>
              <p className="text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 p-3 rounded">
                {alternatives.formal}
              </p>
            </div>
          )}
          {alternatives.informal && (
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                Informal:
              </h4>
              <p className="text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 p-3 rounded">
                {alternatives.informal}
              </p>
            </div>
          )}
        </div>

        {/* Examples Section */}
        {examples.length > 0 && (
          <div className="border-t dark:border-gray-700 pt-4 mt-4">
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
              Similar Examples:
            </h4>
            <div className="space-y-3">
              {examples.map((example, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-900 p-3 rounded">
                  <p className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                    {example.similar}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {example.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}