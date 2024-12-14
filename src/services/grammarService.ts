import { Groq } from 'groq-sdk';
import { GROQ_API_KEY, GRAMMAR_CHECK_CONFIG } from '../config/constants';
import type { GrammarResponse } from '../types/grammar';
import { validateInput, validateApiKey } from './validation';
import { sanitizeResponse } from './responseParser';
import { handleGrammarError } from './errorHandler';
import { isValidJSONString, cleanAndTrimText } from '../utils/stringUtils';

const TIMEOUT_MS = 30000;

async function makeGrammarRequest(text: string): Promise<string> {
  const groq = new Groq({
    apiKey: GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
    timeout: TIMEOUT_MS,
  });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const userMessage = `Analyze and correct this text:

${text}

Return ONLY a JSON object with corrections and improvements. No additional text.`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: GRAMMAR_CHECK_CONFIG.systemPrompt
        },
        {
          role: 'user',
          content: userMessage
        }
      ],
      model: GRAMMAR_CHECK_CONFIG.model,
      temperature: GRAMMAR_CHECK_CONFIG.temperature,
      response_format: { type: "json_object" }
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error('No correction received from the service');
    }

    const cleanResponse = cleanAndTrimText(response);
    
    if (!isValidJSONString(cleanResponse)) {
      console.error('Invalid JSON response:', cleanResponse);
      throw new Error('Invalid JSON response from the grammar service');
    }

    return cleanResponse;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function checkGrammar(text: string): Promise<GrammarResponse> {
  try {
    validateApiKey(GROQ_API_KEY);
    validateInput(text);

    const response = await makeGrammarRequest(text);
    
    try {
      const parsedResponse = JSON.parse(response);
      return sanitizeResponse(parsedResponse);
    } catch (parseError) {
      console.error('Failed to parse API response:', response);
      throw new Error('Invalid response format from the grammar service');
    }
  } catch (error) {
    return handleGrammarError(error);
  }
}