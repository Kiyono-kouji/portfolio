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
    const delayTimeout = setTimeout(() => {
      setHasStarted(true);
    }, delay);
    return () => clearTimeout(delayTimeout);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    let iteration = 0;
    let rafId: number;
    let lastTime = 0;

    const updateText = (timestamp: number) => {
      // Throttle to `speed` ms between updates — matches original setInterval behavior
      if (timestamp - lastTime >= speed) {
        lastTime = timestamp;

        setDisplayText(
          text
            .split('')
            .map((letter, index) => {
              if (letter === ' ') return ' ';
              if (index < iteration) return text[index];
              return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            })
            .join('')
        );

        // Stop once the whole string is revealed
        if (iteration >= text.length) {
          if (onCompleteRef.current) onCompleteRef.current();
          return; // Don't re-queue — animation complete
        }

        iteration += 1 / 2;
      }

      rafId = requestAnimationFrame(updateText);
    };

    rafId = requestAnimationFrame(updateText);
    return () => cancelAnimationFrame(rafId);
  }, [text, speed, hasStarted]);

  return <span>{displayText}</span>;
}
