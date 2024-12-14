import type { GrammarResponse } from '../types/grammar';

interface GrammarError extends Error {
  code?: string;
  status?: number;
  response?: {
    status?: number;
    data?: any;
  };
}

const DEFAULT_RESPONSE: GrammarResponse = {
  correctedText: '',
  corrections: [],
  styleAlternatives: { formal: '', informal: '' },
  examples: [],
  variants: { british: '', american: '' }
};

export function handleGrammarError(error: unknown): GrammarResponse {
  const err = error as GrammarError;
  let errorMessage: string;
  
  if (err.name === 'AbortError') {
    errorMessage = 'Request timed out. Please try again.';
  } else if (err.code === 'ECONNREFUSED' || err.code === 'ECONNRESET') {
    errorMessage = 'Unable to connect to the grammar service. Please check your internet connection.';
  } else if (err.response?.status === 401 || err.status === 401) {
    errorMessage = 'Authentication failed. Please check your API key.';
  } else if (err.response?.status === 429 || err.status === 429) {
    errorMessage = 'Too many requests. Please wait a moment and try again.';
  } else if (err.response?.status === 413) {
    errorMessage = 'Text is too long. Please enter a shorter text.';
  } else {
    console.error('Grammar check error details:', {
      name: err.name,
      message: err.message,
      code: err.code,
      status: err.status || err.response?.status,
      response: err.response
    });
    errorMessage = 'Unable to check grammar at the moment. Please try again later.';
  }

  return {
    ...DEFAULT_RESPONSE,
    corrections: [{
      original: '',
      corrected: '',
      type: 'grammar',
      explanation: errorMessage
    }]
  };
}