import { Groq } from 'groq-sdk';
import { GROQ_API_KEY, TRANSLATION_CONFIG } from '../config/constants';
import type { TranslationRequest, TranslationResponse, DetectedLanguage } from '../types/translation';
import { LANGUAGES } from '../config/languages';

const TIMEOUT_MS = 30000;

function validateLanguageCode(code: string): code is keyof typeof LANGUAGES {
  return code in LANGUAGES;
}

function normalizeLanguageCode(code: string): string {
  // Common variations mapping
  const codeMap: Record<string, string> = {
    'eng': 'en',
    'spa': 'es',
    'fra': 'fr',
    'deu': 'de',
    'english': 'en',
    'spanish': 'es',
    'french': 'fr',
    'german': 'de',
    // Add more mappings as needed
  };

  const normalized = code.toLowerCase().trim();
  return codeMap[normalized] || normalized;
}

export async function detectLanguage(text: string): Promise<DetectedLanguage> {
  if (!text.trim()) {
    throw new Error('Please enter text to detect language');
  }

  const groq = new Groq({
    apiKey: GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
    timeout: TIMEOUT_MS,
  });

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a language detection expert. Your task is to detect the language of the provided text.
            IMPORTANT: Return ONLY a valid ISO 639-1 language code (e.g., 'en', 'es', 'fr', etc.).
            Do not include any additional text, explanation, or punctuation.
            Only return codes for languages that are commonly used and well-supported.
            If unsure, default to 'en'.`
        },
        {
          role: 'user',
          content: text
        }
      ],
      model: TRANSLATION_CONFIG.model,
      temperature: 0.1,
      max_tokens: 2, // We only need a short response
    });

    const detectedCode = completion.choices[0]?.message?.content;
    
    if (!detectedCode) {
      console.warn('No language code received from API');
      throw new Error('Could not detect language');
    }

    const normalizedCode = normalizeLanguageCode(detectedCode);

    if (!validateLanguageCode(normalizedCode)) {
      console.warn(`Invalid language code received: ${detectedCode}`);
      throw new Error('Unsupported language detected');
    }

    return {
      code: normalizedCode,
      name: LANGUAGES[normalizedCode]
    };
  } catch (error: any) {
    console.error('Language detection error:', {
      error,
      message: error.message,
      status: error.status,
      response: error.response
    });

    if (error.message.includes('API key')) {
      throw new Error('Authentication failed. Please check your API configuration.');
    }

    if (error.message.includes('timeout')) {
      throw new Error('Language detection timed out. Please try again.');
    }

    throw new Error('Could not detect language. Please try again or select a language manually.');
  }
}

export async function translateText({ text, from, to }: TranslationRequest): Promise<TranslationResponse> {
  if (!text.trim()) {
    throw new Error('Please enter text to translate');
  }

  const toLanguage = LANGUAGES[to as keyof typeof LANGUAGES];
  if (!toLanguage) {
    throw new Error('Invalid target language selection');
  }

  const groq = new Groq({
    apiKey: GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
    timeout: TIMEOUT_MS,
  });

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a professional translator. Translate the given text to ${toLanguage}. 
            Return ONLY the translated text, without any additional explanations or notes.
            Maintain the original formatting and punctuation style.
            If the text is already in the target language, return it unchanged.`
        },
        {
          role: 'user',
          content: text
        }
      ],
      model: TRANSLATION_CONFIG.model,
      temperature: TRANSLATION_CONFIG.temperature,
    });

    const translatedText = completion.choices[0]?.message?.content;

    if (!translatedText?.trim()) {
      throw new Error('No translation received');
    }

    return { translatedText: translatedText.trim() };
  } catch (error: any) {
    console.error('Translation error:', {
      error,
      message: error.message,
      status: error.status,
      response: error.response
    });

    if (error.message.includes('API key')) {
      throw new Error('Authentication failed. Please check your API configuration.');
    }

    if (error.message.includes('timeout')) {
      throw new Error('Translation timed out. Please try again.');
    }

    throw new Error('Failed to translate text. Please try again.');
  }
}