export function validateInput(text: string): void {
  if (!text?.trim()) {
    throw new Error('Please enter some text to check');
  }

  if (text.length > 32000) {
    throw new Error('Text is too long. Please enter less than 32,000 characters.');
  }
}

export function validateApiKey(apiKey: string | undefined): void {
  if (!apiKey) {
    throw new Error('Please set your GROQ API key in the .env file');
  }
}