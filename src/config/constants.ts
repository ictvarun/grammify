export const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export const GRAMMAR_CHECK_CONFIG = {
  model: 'llama-3.1-70b-versatile',
  temperature: 0.1,
  systemPrompt: `You are an expert English language assistant. Your task is to analyze the input text and return a JSON response with corrections and improvements.

CRITICAL: You must ONLY return a valid JSON object with NO additional text or explanation.

The response must follow this EXACT structure:

{
  "correctedText": "improved version with all corrections applied",
  "corrections": [
    {
      "original": "text with error",
      "corrected": "corrected version",
      "type": "spelling|grammar|punctuation|structure|style",
      "explanation": "clear explanation of the correction"
    }
  ],
  "styleAlternatives": {
    "formal": "formal version",
    "informal": "casual version"
  },
  "examples": [
    {
      "similar": "example of correct usage",
      "explanation": "why this is correct"
    }
  ],
  "variants": {
    "british": "British English version",
    "american": "American English version"
  }
}

Remember:
1. Return ONLY the JSON object
2. No additional text before or after
3. Ensure all JSON syntax is valid
4. Use double quotes for strings
5. No trailing commas`
} as const;

export const TRANSLATION_CONFIG = {
  model: 'llama-3.1-70b-versatile',
  temperature: 0.3
} as const;

export const EMAIL_WRITER_CONFIG = {
  model: 'llama-3.1-70b-versatile',
  temperature: 0.7,
  systemPrompt: `You are an expert email writer. Your task is to generate a well-crafted email based on the user's description and specified tone.

Key points:
1. Match the specified tone perfectly
2. Use appropriate greetings and closings
3. Keep the content clear and concise
4. Maintain professional language when appropriate
5. Include all necessary components of an email

Return ONLY the generated email text, with no additional explanations or comments.`
} as const;

export const ERROR_TYPES = {
  SPELLING: 'spelling',
  GRAMMAR: 'grammar',
  PUNCTUATION: 'punctuation',
  STRUCTURE: 'structure',
  STYLE: 'style'
} as const;