import React from 'react';
import { TextArea } from '../TextArea';
import { ToneSelect } from './ToneSelect';

interface EmailPromptInputProps {
  prompt: string;
  tone: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onToneChange: (tone: string) => void;
}

export function EmailPromptInput({
  prompt,
  tone,
  onChange,
  onToneChange
}: EmailPromptInputProps) {
  return (
    <div className="h-full bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm 
      border border-gray-100 dark:border-gray-700 flex flex-col">
      <div className="mb-4">
        <ToneSelect value={tone} onChange={onToneChange} />
      </div>
      <div className="flex-1">
        <TextArea
          value={prompt}
          onChange={onChange}
          placeholder="Describe the email you want to write..."
          label="Email Description"
        />
      </div>
    </div>
  );
}