import React from 'react';
import { EmailHeader } from '../components/email/EmailHeader';
import { EmailInterface } from '../components/email/EmailInterface';
import { useEmailWriter } from '../hooks/useEmailWriter';

export function EmailWriter() {
  const {
    state,
    handleInputChange,
    handleGenerate,
    handleClear,
    handleToneChange,
    dismissError
  } = useEmailWriter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 
      dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 transition-colors py-8">
      <div className="container mx-auto px-4 min-h-[calc(100vh-4rem)] flex flex-col">
        <EmailHeader />
        <EmailInterface
          state={state}
          onInputChange={handleInputChange}
          onGenerate={handleGenerate}
          onClear={handleClear}
          onToneChange={handleToneChange}
          onDismissError={dismissError}
        />
      </div>
    </div>
  );
}