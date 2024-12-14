import React from 'react';

export function TranslatorHeader() {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
        AI-Powered Translation
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Translate between 100+ languages with high accuracy
      </p>
    </div>
  );
}