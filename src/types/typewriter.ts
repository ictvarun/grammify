export interface TypewriterOptions {
  speed?: number;
  initialDelay?: number;
}

export interface TypewriterState {
  displayText: string;
  isTyping: boolean;
  isComplete: boolean;
}