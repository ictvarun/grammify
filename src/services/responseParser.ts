import type { GrammarResponse, Correction, Example, StyleAlternatives, Variants } from '../types/grammar';
import { ERROR_TYPES } from '../config/constants';
import { cleanAndTrimText } from '../utils/stringUtils';

function isValidErrorType(type: string): type is keyof typeof ERROR_TYPES {
  return Object.values(ERROR_TYPES).includes(type as any);
}

function isValidCorrection(c: any): c is Correction {
  return (
    c &&
    typeof c === 'object' &&
    typeof c.original === 'string' &&
    typeof c.corrected === 'string' &&
    isValidErrorType(c.type) &&
    typeof c.explanation === 'string' &&
    c.original.trim() !== '' &&
    c.corrected.trim() !== '' &&
    c.explanation.trim() !== ''
  );
}

function isValidExample(e: any): e is Example {
  return (
    e &&
    typeof e === 'object' &&
    typeof e.similar === 'string' &&
    typeof e.explanation === 'string' &&
    e.similar.trim() !== '' &&
    e.explanation.trim() !== ''
  );
}

function isValidStyleAlternatives(s: any): s is StyleAlternatives {
  return (
    s &&
    typeof s === 'object' &&
    typeof s.formal === 'string' &&
    typeof s.informal === 'string'
  );
}

function isValidVariants(v: any): v is Variants {
  return (
    v &&
    typeof v === 'object' &&
    typeof v.british === 'string' &&
    typeof v.american === 'string'
  );
}

function sanitizeText(text: string | undefined): string {
  return typeof text === 'string' ? cleanAndTrimText(text) : '';
}

export function sanitizeResponse(response: any): GrammarResponse {
  const defaultResponse: GrammarResponse = {
    correctedText: '',
    corrections: [],
    styleAlternatives: { formal: '', informal: '' },
    examples: [],
    variants: { british: '', american: '' }
  };

  if (!response || typeof response !== 'object') {
    return defaultResponse;
  }

  const sanitizedResponse: GrammarResponse = {
    correctedText: sanitizeText(response.correctedText),
    corrections: Array.isArray(response.corrections)
      ? response.corrections.filter(isValidCorrection)
      : [],
    styleAlternatives: isValidStyleAlternatives(response.styleAlternatives)
      ? {
          formal: sanitizeText(response.styleAlternatives.formal),
          informal: sanitizeText(response.styleAlternatives.informal)
        }
      : defaultResponse.styleAlternatives,
    examples: Array.isArray(response.examples)
      ? response.examples.filter(isValidExample)
      : [],
    variants: isValidVariants(response.variants)
      ? {
          british: sanitizeText(response.variants.british),
          american: sanitizeText(response.variants.american)
        }
      : defaultResponse.variants
  };

  // If no valid corrected text is provided, use the original text
  if (!sanitizedResponse.correctedText && response.correctedText) {
    sanitizedResponse.correctedText = sanitizeText(response.correctedText);
  }

  return sanitizedResponse;
}