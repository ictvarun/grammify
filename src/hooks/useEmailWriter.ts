import { useState, useCallback } from 'react';
import { generateEmail } from '../services/emailService';
import type { EmailWriterState } from '../types/email';

const initialState: EmailWriterState = {
  prompt: '',
  tone: 'professional',
  generatedEmail: '',
  isLoading: false,
  error: ''
};

export function useEmailWriter() {
  const [state, setState] = useState<EmailWriterState>(initialState);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState(prev => ({
      ...prev,
      prompt: e.target.value,
      error: ''
    }));
  }, []);

  const handleGenerate = async () => {
    if (!state.prompt.trim()) {
      setState(prev => ({
        ...prev,
        error: 'Please describe the email you want to generate'
      }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: '' }));

    try {
      const result = await generateEmail({
        prompt: state.prompt,
        tone: state.tone
      });
      
      setState(prev => ({
        ...prev,
        generatedEmail: result.email
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: (err as Error).message
      }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleClear = () => setState(initialState);

  const handleToneChange = (tone: string) => {
    setState(prev => ({
      ...prev,
      tone,
      error: ''
    }));
  };

  const dismissError = () => setState(prev => ({ ...prev, error: '' }));

  return {
    state,
    handleInputChange,
    handleGenerate,
    handleClear,
    handleToneChange,
    dismissError
  };
}