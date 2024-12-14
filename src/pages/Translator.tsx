import React from 'react';
import { TranslatorHeader } from '../components/translator/TranslatorHeader';
import { TranslatorInterface } from '../components/translator/TranslatorInterface';
import { useTranslator } from '../hooks/useTranslator';

export function Translator() {
  const {
    state,
    handleInputChange,
    handleTranslate,
    handleClear,
    handleLanguageChange,
    dismissError
  } = useTranslator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 
      dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 transition-colors py-8">
      <div className="container mx-auto px-4 min-h-[calc(100vh-4rem)] flex flex-col">
        <TranslatorHeader />
        <TranslatorInterface
          state={state}
          onInputChange={handleInputChange}
          onTranslate={handleTranslate}
          onClear={handleClear}
          onLanguageChange={handleLanguageChange}
          onDismissError={dismissError}
        />
      </div>
    </div>
  );
}