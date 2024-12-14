import React from 'react';
import { TextArea } from './TextArea';
import { LanguageSelect } from './LanguageSelect';
import { Wand2 } from 'lucide-react';

interface TranslationInputProps {
  text: string;
  language: string;
  isDetecting?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onLanguageChange: (value: string) => void;
  includeAuto?: boolean;
  label: string;
  placeholder: string;
  readOnly?: boolean;
}

export function TranslationInput({
  text,
  language,
  isDetecting,
  onChange,
  onLanguageChange,
  includeAuto,
  label,
  placeholder,
  readOnly
}: TranslationInputProps) {
  return (
    <div className="h-full min-h-[400px] bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg 
      border border-gray-100 dark:border-gray-700 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <LanguageSelect
          value={language}
          onChange={onLanguageChange}
          label={label}
          includeAuto={includeAuto}
        />
        {isDetecting && (
          <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400">
            <Wand2 className="w-4 h-4 animate-pulse" />
            Detecting...
          </div>
        )}
      </div>
      <div className="flex-1">
        <TextArea
          value={text}
          onChange={onChange}
          placeholder={placeholder}
          label=""
          readOnly={readOnly}
        />
      </div>
    </div>
  );
}