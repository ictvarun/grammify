import { Groq } from 'groq-sdk';
import { GROQ_API_KEY, EMAIL_WRITER_CONFIG } from '../config/constants';
import type { EmailRequest, EmailResponse } from '../types/email';
import { validateApiKey } from './validation';
import { cleanAndTrimText } from '../utils/stringUtils';

const TIMEOUT_MS = 30000;

async function makeEmailRequest(prompt: string, tone: string): Promise<string> {
  const groq = new Groq({
    apiKey: GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
    timeout: TIMEOUT_MS,
  });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const userMessage = `Generate an email with a ${tone} tone based on this description:

${prompt}

Return ONLY the email text, no additional explanations.`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: EMAIL_WRITER_CONFIG.systemPrompt
        },
        {
          role: 'user',
          content: userMessage
        }
      ],
      model: EMAIL_WRITER_CONFIG.model,
      temperature: EMAIL_WRITER_CONFIG.temperature
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error('No email generated from the service');
    }

    return cleanAndTrimText(response);
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function generateEmail({ prompt, tone }: EmailRequest): Promise<EmailResponse> {
  try {
    validateApiKey(GROQ_API_KEY);
    
    if (!prompt.trim()) {
      throw new Error('Please provide a description for the email');
    }

    const email = await makeEmailRequest(prompt, tone);
    return { email };
  } catch (error) {
    console.error('Email generation error:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Failed to generate email. Please try again.'
    );
  }
}