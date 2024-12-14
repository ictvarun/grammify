export interface TranslationState {
  inputText: string;
  translatedText: string;
  fromLanguage: string;
  toLanguage: string;
  isLoading: boolean;
  error: string;
  isDetecting: boolean;
}

export interface TranslationRequest {
  text: string;
  from: string;
  to: string;
}

export interface TranslationResponse {
  translatedText: string;
}

export interface DetectedLanguage {
  code: string;
  name: string;
}