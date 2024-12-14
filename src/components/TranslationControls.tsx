import React from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { ButtonGroup } from './ButtonGroup';

interface TranslationControlsProps {
  onTranslate: () => void;
  onClear: () => void;
  onSwapLanguages: () => void;
  isLoading: boolean;
  disabled: boolean;
}

export function TranslationControls({
  onTranslate,
  onClear,
  onSwapLanguages,
  isLoading,
  disabled
}: TranslationControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-6">
      <button
        onClick={onSwapLanguages}
        className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 
          dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors"
        aria-label="Swap languages"
      >
        <ArrowLeftRight className="w-5 h-5" />
      </button>
      <ButtonGroup
        onCheck={onTranslate}
        onClear={onClear}
        isLoading={isLoading}
        disabled={disabled}
        checkButtonText="Translate"
      />
    </div>
  );
}