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
    <>
      <div className="h-[180px]">
        {(isListening || translation.matchResult !== undefined) && (
          <RecognizedSpeech 
            translation={translation}
            isListening={isListening}
          />
        )}
      </div>

      <div className="flex justify-center">
        <MicButton
          isListening={isListening}
          onStart={startListening}
          onStop={stopListening}
        />
      </div>
    </>
  );
}