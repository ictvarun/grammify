import React from 'react';
import { ErrorMessage } from '../ErrorMessage';
import { TranslationInput } from '../TranslationInput';
import { TranslationControls } from './TranslationControls';
import type { TranslationState } from '../../types/translation';

interface TranslatorInterfaceProps {
  state: TranslationState;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onTranslate: () => void;
  onClear: () => void;
  onLanguageChange: (type: 'from' | 'to', value: string) => void;
  onDismissError: () => void;
}

export function TranslatorInterface({
  state,
  onInputChange,
  onTranslate,
  onClear,
  onLanguageChange,
  onDismissError
}: TranslatorInterfaceProps) {
  return (
    <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full">
      {state.error && (
        <div className="mb-4">
          <ErrorMessage message={state.error} onDismiss={onDismissError} />
        </div>
      )}

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TranslationInput
          text={state.inputText}
          language={state.fromLanguage}
          isDetecting={state.isDetecting}
          onChange={onInputChange}
          onLanguageChange={(value) => onLanguageChange('from', value)}
          includeAuto={true}
          label="Translate from"
          placeholder="Enter text to translate..."
        />

        <TranslationInput
          text={state.translatedText}
          language={state.toLanguage}
          onChange={() => {}}
          onLanguageChange={(value) => onLanguageChange('to', value)}
          label="Translate to"
          placeholder="Translation will appear here..."
          readOnly={true}
        />
      </div>

      <TranslationControls
        onTranslate={onTranslate}
        onClear={onClear}
        isLoading={state.isLoading}
        disabled={state.isLoading || !state.inputText.trim()}
      />
    </div>
  );
}