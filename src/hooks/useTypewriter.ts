import { useState, useEffect, useRef } from 'react';
import { TypewriterOptions, TypewriterState } from '../types/typewriter';

export function useTypewriter(text: string, options: TypewriterOptions = {}): TypewriterState {
  const {
    speed = 30,
    initialDelay = 100,
  } = options;

  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!text) {
      setDisplayText('');
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    setDisplayText('');

    const chars = text.split('');
    let currentIndex = 0;

    const typeChar = () => {
      if (currentIndex < chars.length) {
        setDisplayText(text.substring(0, currentIndex + 1));
        currentIndex++;
        timeoutRef.current = setTimeout(typeChar, speed);
      } else {
        setIsTyping(false);
      }
    };

    timeoutRef.current = setTimeout(typeChar, initialDelay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsTyping(false);
    };
  }, [text, speed, initialDelay]);

  return {
    displayText,
    isTyping,
    isComplete: displayText === text
  };
}