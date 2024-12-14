import React, { useMemo } from 'react';
import { LANGUAGES, LANGUAGE_GROUPS } from '../config/languages';
import { Search } from 'lucide-react';

interface LanguageSelectProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  includeAuto?: boolean;
}

export function LanguageSelect({ value, onChange, label, includeAuto = false }: LanguageSelectProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  const filteredLanguages = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return Object.entries(LANGUAGES).filter(([code, name]) => 
      name.toLowerCase().includes(query) || code.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const selectedLanguage = value === 'auto' ? 'Auto Detect' : LANGUAGES[value as keyof typeof LANGUAGES];

  return (
    <div className="w-full relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 flex items-center justify-between bg-white dark:bg-gray-800 
          text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 
          rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
      >
        <span>{selectedLanguage}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 
          dark:border-gray-700 rounded-lg shadow-lg max-h-96 overflow-hidden">
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 
                text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search languages..."
                className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 
                  dark:border-gray-600 rounded-md text-sm text-gray-900 dark:text-gray-100 
                  placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none 
                  focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />
            </div>
          </div>

          <div className="overflow-y-auto max-h-80">
            {includeAuto && (
              <button
                onClick={() => {
                  onChange('auto');
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 
                  text-gray-900 dark:text-gray-100
                  ${value === 'auto' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : ''}`}
              >
                Auto Detect
              </button>
            )}

            {searchQuery ? (
              // Show search results
              filteredLanguages.map(([code, name]) => (
                <button
                  key={code}
                  onClick={() => {
                    onChange(code);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700
                    text-gray-900 dark:text-gray-100
                    ${value === code ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : ''}`}
                >
                  {name}
                </button>
              ))
            ) : (
              // Show grouped languages
              <>
                <div className="px-4 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 
                  bg-gray-50 dark:bg-gray-750">
                  Popular Languages
                </div>
                {LANGUAGE_GROUPS.popular.map(code => (
                  <button
                    key={code}
                    onClick={() => {
                      onChange(code);
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700
                      text-gray-900 dark:text-gray-100
                      ${value === code ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : ''}`}
                  >
                    {LANGUAGES[code as keyof typeof LANGUAGES]}
                  </button>
                ))}

                <div className="px-4 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 
                  bg-gray-50 dark:bg-gray-750">
                  All Languages
                </div>
                {Object.entries(LANGUAGES)
                  .sort(([, a], [, b]) => a.localeCompare(b))
                  .map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => {
                        onChange(code);
                        setIsOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700
                        text-gray-900 dark:text-gray-100
                        ${value === code ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : ''}`}
                    >
                      {name}
                    </button>
                  ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}