import { useState, useCallback } from 'react';
import { translateText, detectLanguage } from '../services/translationService';
import type { TranslationState } from '../types/translation';

const initialState: TranslationState = {
  inputText: '',
  translatedText: '',
  fromLanguage: 'auto',
  toLanguage: 'en', // Changed from 'es' to 'en'
  isLoading: false,
  error: '',
  isDetecting: false
};

const DETECTION_DEBOUNCE_MS = 1000;
const MIN_DETECTION_LENGTH = 4;

export function useTranslator() {
  const [state, setState] = useState<TranslationState>(initialState);

  const handleDetectLanguage = useCallback(async (text: string) => {
    if (!text.trim() || text.length < MIN_DETECTION_LENGTH) return;
    
    setState(prev => ({ ...prev, isDetecting: true, error: '' }));
    
    try {
      const detected = await detectLanguage(text);
      setState(prev => ({ 
        ...prev, 
        fromLanguage: detected.code,
        isDetecting: false 
      }));
    } catch (err) {
      setState(prev => ({ 
        ...prev, 
        error: (err as Error).message,
        isDetecting: false,
        fromLanguage: 'auto'
      }));
    }
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setState(prev => ({ ...prev, inputText: text, error: '' }));
    
    if (state.fromLanguage === 'auto' && text.length >= MIN_DETECTION_LENGTH) {
      const debounceId = setTimeout(() => handleDetectLanguage(text), DETECTION_DEBOUNCE_MS);
      return () => clearTimeout(debounceId);
    }
  }, [state.fromLanguage, handleDetectLanguage]);

  const handleTranslate = async () => {
    if (!state.inputText.trim()) {
      setState(prev => ({ ...prev, error: 'Please enter text to translate' }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: '' }));

    try {
      let fromLang = state.fromLanguage;
      if (fromLang === 'auto') {
        try {
          const detected = await detectLanguage(state.inputText);
          fromLang = detected.code;
        } catch (err) {
          console.warn('Language detection failed during translation:', err);
          fromLang = 'en';
        }
      }

      const result = await translateText({
        text: state.inputText,
        from: fromLang,
        to: state.toLanguage
      });
      
      setState(prev => ({
        ...prev,
        translatedText: result.translatedText,
        error: ''
      }));
    } catch (err) {
      setState(prev => ({ ...prev, error: (err as Error).message }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleClear = () => setState(initialState);

  const handleLanguageChange = (type: 'from' | 'to', value: string) => {
    setState(prev => ({
      ...prev,
      [type === 'from' ? 'fromLanguage' : 'toLanguage']: value,
      error: ''
    }));
  };

  const dismissError = () => setState(prev => ({ ...prev, error: '' }));

  return {
    state,
    handleInputChange,
    handleTranslate,
    handleClear,
    handleLanguageChange,
    dismissError
  };
}