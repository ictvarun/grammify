export interface EmailWriterState {
  prompt: string;
  tone: string;
  generatedEmail: string;
  isLoading: boolean;
  error: string;
}

export interface EmailRequest {
  prompt: string;
  tone: string;
}

export interface EmailResponse {
  email: string;
}