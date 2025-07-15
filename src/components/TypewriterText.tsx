import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  className?: string;
  onComplete?: () => void;
  startDelay?: number;
}

export default function TypewriterText({ 
  text, 
  delay = 50, 
  className = "",
  onComplete,
  startDelay = 0
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  // Reset when text changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsTyping(false);
    
    // Start typing after delay
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [text, startDelay]);

  useEffect(() => {
    if (isTyping && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else if (isTyping && currentIndex >= text.length) {
      setIsTyping(false);
      if (onComplete) {
        onComplete();
      }
    }
  }, [currentIndex, text, delay, onComplete, isTyping]);

  return (
    <span className={className}>
      {displayedText}
      {isTyping && (
        <span 
          style={{ 
            color: '#4ecdc4', 
            animation: 'blink 1s infinite',
            fontWeight: 'bold'
          }}
        >
          |
        </span>
      )}
    </span>
  );
} 