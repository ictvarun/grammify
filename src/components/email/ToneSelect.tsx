import React from 'react';
import { EMAIL_TONES } from '../../config/email';

interface ToneSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function ToneSelect({ value, onChange }: ToneSelectProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Email Tone
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 
          dark:border-gray-600 rounded-lg shadow-sm text-gray-900 dark:text-gray-100
          focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      >
        {EMAIL_TONES.map((tone) => (
          <option key={tone.value} value={tone.value}>
            {tone.label}
          </option>
        ))}
      </select>
    </div>
  );
}