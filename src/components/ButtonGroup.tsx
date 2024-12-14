import React from 'react';
import { CheckButton } from './CheckButton';
import { ClearButton } from './ClearButton';

interface ButtonGroupProps {
  onCheck: () => void;
  onClear: () => void;
  isLoading: boolean;
  disabled: boolean;
  checkButtonText?: string;
}

export function ButtonGroup({ 
  onCheck, 
  onClear, 
  isLoading, 
  disabled,
  checkButtonText = 'Check Grammar'
}: ButtonGroupProps) {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <CheckButton
        onClick={onCheck}
        isLoading={isLoading}
        disabled={disabled}
        text={checkButtonText}
      />
      <ClearButton
        onClick={onClear}
        disabled={isLoading}
      />
    </div>
  );
}