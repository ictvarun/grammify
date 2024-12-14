import React from 'react';
import { ErrorMessage } from '../ErrorMessage';
import { EmailPromptInput } from './EmailPromptInput';
import { EmailOutput } from './EmailOutput';
import { EmailControls } from './EmailControls';
import type { EmailWriterState } from '../../types/email';

interface EmailInterfaceProps {
  state: EmailWriterState;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onGenerate: () => void;
  onClear: () => void;
  onToneChange: (tone: string) => void;
  onDismissError: () => void;
}

export function EmailInterface({
  state,
  onInputChange,
  onGenerate,
  onClear,
  onToneChange,
  onDismissError
}: EmailInterfaceProps) {
  return (
    <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full">
      {state.error && (
        <div className="mb-4">
          <ErrorMessage message={state.error} onDismiss={onDismissError} />
        </div>
      )}

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <EmailPromptInput
          prompt={state.prompt}
          tone={state.tone}
          onChange={onInputChange}
          onToneChange={onToneChange}
        />

        <EmailOutput
          email={state.generatedEmail}
          isLoading={state.isLoading}
        />
      </div>

      <EmailControls
        onGenerate={onGenerate}
        onClear={onClear}
        isLoading={state.isLoading}
        disabled={state.isLoading || !state.prompt.trim()}
      />
    </div>
  );
}