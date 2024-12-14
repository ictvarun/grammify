export const EMAIL_TONES = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'formal', label: 'Formal' },
  { value: 'casual', label: 'Casual' },
  { value: 'persuasive', label: 'Persuasive' },
  { value: 'urgent', label: 'Urgent' }
] as const;

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