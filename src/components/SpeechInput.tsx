import React from 'react';
import { MicButton } from './MicButton';
import { RecognizedSpeech } from './RecognizedSpeech';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

interface SpeechInputProps {
  targetWord: string;
  targetPinyin: string;
}

export function SpeechInput({ targetWord, targetPinyin }: SpeechInputProps) {
  const { isListening, translation, startListening, stopListening } = useSpeechRecognition(
    targetWord,
    targetPinyin
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