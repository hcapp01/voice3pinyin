import React from 'react';
import { MicButton } from './MicButton';
import { RecognizedSpeech } from './RecognizedSpeech';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { MatchResult } from '../types/chinese';

interface SpeechInputProps {
  targetWord: string;
  targetPinyin: string;
  onMatch: (matchResult: MatchResult | undefined) => void;
  onListeningChange?: (isListening: boolean) => void;
}

export function SpeechInput({ targetWord, targetPinyin, onMatch, onListeningChange }: SpeechInputProps) {
  const { isListening, translation, startListening, stopListening } = useSpeechRecognition(
    targetWord,
    targetPinyin,
    onMatch,
    onListeningChange
  );

  return (
    <div className="relative h-full pointer-events-none">
      <div className="absolute inset-x-0 top-0 h-1/2  pointer-events-auto">
        {(isListening || translation.matchResult !== undefined) && (
          <RecognizedSpeech 
            translation={translation}
            isListening={isListening}
          />
        )}
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
        <MicButton
          isListening={isListening}
          onStart={startListening}
          onStop={stopListening}
        />
      </div>
    </div>
  );
}