import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
        transition-colors ${className}`}
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
      ) : (
        <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      )}
    </button>
  );
}