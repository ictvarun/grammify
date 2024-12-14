import React from 'react';
import { ButtonGroup } from '../ButtonGroup';

interface EmailControlsProps {
  onGenerate: () => void;
  onClear: () => void;
  isLoading: boolean;
  disabled: boolean;
}

export function EmailControls({
  onGenerate,
  onClear,
  isLoading,
  disabled
}: EmailControlsProps) {
  return (
    <div className="flex items-center justify-center mt-6">
      <ButtonGroup
        onCheck={onGenerate}
        onClear={onClear}
        isLoading={isLoading}
        disabled={disabled}
        checkButtonText="Generate Email"
      />
    </div>
  );
}