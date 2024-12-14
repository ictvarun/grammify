import React from 'react';
import { ButtonGroup } from '../ButtonGroup';

interface TranslationControlsProps {
  onTranslate: () => void;
  onClear: () => void;
  isLoading: boolean;
  disabled: boolean;
}

export function TranslationControls({
  onTranslate,
  onClear,
  isLoading,
  disabled
}: TranslationControlsProps) {
  return (
    <div className="flex items-center justify-center mt-6">
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