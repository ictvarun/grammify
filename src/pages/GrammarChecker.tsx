import React, { useState } from 'react';
import { TextArea } from '../components/TextArea';
import { ButtonGroup } from '../components/ButtonGroup';
import { ErrorMessage } from '../components/ErrorMessage';
import { VariantToggle } from '../components/VariantToggle';
import { Corrections } from '../components/Corrections';
import { StyleAlternatives } from '../components/StyleAlternatives';
import { GrammarHeader } from '../components/grammar/GrammarHeader';
import { checkGrammar } from '../services/grammarService';
import type { GrammarState } from '../types/grammar';

const initialState: GrammarState = {
  inputText: '',
  correctedText: '',
  corrections: [],
  styleAlternatives: { formal: '', informal: '' },
  examples: [],
  variants: { british: '', american: '' },
  isLoading: false,
  error: '',
  selectedVariant: 'american',
};

export function GrammarChecker() {
  const [state, setState] = useState<GrammarState>(initialState);

  const handleGrammarCheck = async () => {
    if (!state.inputText.trim()) {
      setState((prev) => ({
        ...prev,
        error: 'Please enter some text to check',
      }));
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: '' }));

    try {
      const result = await checkGrammar(state.inputText);
      setState((prev) => ({
        ...prev,
        correctedText: result.correctedText,
        corrections: result.corrections,
        styleAlternatives: result.styleAlternatives,
        examples: result.examples,
        variants: result.variants,
      }));
    } catch (err) {
      setState((prev) => ({ ...prev, error: (err as Error).message }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleClear = () => setState(initialState);

  const handleVariantChange = (variant: 'british' | 'american') => {
    setState((prev) => ({
      ...prev,
      selectedVariant: variant,
      correctedText: prev.variants[variant] || prev.correctedText,
    }));
  };

  const dismissError = () => setState((prev) => ({ ...prev, error: '' }));

  const hasResults = state.correctedText || state.corrections.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 
      dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 transition-colors py-8">
      <div className="container mx-auto px-4 min-h-[calc(100vh-4rem)] flex flex-col">
        <GrammarHeader />
        
        <div className="w-full h-full flex flex-col items-center p-0 m-0 overflow-hidden">
          {state.error && (
            <ErrorMessage message={state.error} onDismiss={dismissError} />
          )}

          <div className="flex flex-col md:flex-row w-full max-w-6xl justify-center items-center gap-6 px-4">
            <div className="w-full max-w-2xl">
              <TextArea
                value={state.inputText}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, inputText: e.target.value }))
                }
                placeholder="Enter your text here..."
                label="Original Text"
              />
            </div>

            <div className="w-full max-w-2xl">
              <TextArea
                value={state.correctedText}
                placeholder="Corrected text will appear here..."
                label="Corrected Text"
                readOnly
              />
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4 mt-4">
            <ButtonGroup
              onCheck={handleGrammarCheck}
              onClear={handleClear}
              isLoading={state.isLoading}
              disabled={state.isLoading || !state.inputText.trim()}
            />

            {hasResults && state.variants.british && state.variants.american && (
              <div className="w-full max-w-3xl flex justify-end mt-4">
                <VariantToggle
                  selected={state.selectedVariant}
                  onChange={handleVariantChange}
                />
              </div>
            )}
          </div>

          {hasResults && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mt-4">
              {state.corrections.length > 0 && (
                <div className="md:col-span-1">
                  <Corrections corrections={state.corrections} />
                </div>
              )}

              {(state.styleAlternatives.formal ||
                state.styleAlternatives.informal ||
                state.examples.length > 0) && (
                <div className="md:col-span-1">
                  <StyleAlternatives
                    alternatives={state.styleAlternatives}
                    examples={state.examples}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}