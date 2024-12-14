export interface Correction {
  original: string;
  corrected: string;
  type: 'spelling' | 'grammar' | 'punctuation' | 'structure' | 'style';
  explanation: string;
}

export interface StyleAlternatives {
  formal: string;
  informal: string;
}

export interface Example {
  similar: string;
  explanation: string;
}

export interface Variants {
  british: string;
  american: string;
}

export interface GrammarResponse {
  correctedText: string;
  corrections: Correction[];
  styleAlternatives: StyleAlternatives;
  examples: Example[];
  variants: Variants;
}

export interface GrammarState {
  inputText: string;
  correctedText: string;
  corrections: Correction[];
  styleAlternatives: StyleAlternatives;
  examples: Example[];
  variants: Variants;
  isLoading: boolean;
  error: string;
  selectedVariant: 'british' | 'american';
}</content>