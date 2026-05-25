"use client";

import React, { useState, useEffect, useRef } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|:;<>,.?/~';

export default function DecryptedText({ text, speed = 20, delay = 0, onComplete }: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(() => 
    text.split('').map(char => char === ' ' ? ' ' : '\u00A0').join('')
  );
  const [hasStarted, setHasStarted] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Handle the initial delay before starting the animation
    const delayTimeout = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    let iteration = 0;
    let interval: NodeJS.Timeout;

    const updateText = () => {
      setDisplayText((currentText) =>
        text
          .split('')
          .map((letter, index) => {
            // If the letter is a space, leave it as a space
            if (letter === ' ') return ' ';
            
            // If the iteration has passed this index, show the actual letter
            if (index < iteration) {
              return text[index];
            }
            
            // Otherwise, show a random character
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join('')
      );

      // Stop the interval once the whole string is revealed
      if (iteration >= text.length) {
        clearInterval(interval);
        if (onCompleteRef.current) onCompleteRef.current();
      }

      // Increase iteration (lower number = longer scramble time per letter)
      iteration += 1 / 2; 
    };

    // Run the first update immediately to prevent 1-tick delay/flicker
    updateText();
    interval = setInterval(updateText, speed);

    return () => clearInterval(interval);
  }, [text, speed, hasStarted]);

  return <span>{displayText}</span>;
}
