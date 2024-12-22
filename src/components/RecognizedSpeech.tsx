import React from 'react';
import { TranslationState, MatchResult } from '../types/chinese';
import { WaveAnimation } from './WaveAnimation';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface RecognizedSpeechProps {
  translation: TranslationState;
  isListening: boolean;
}

function StatusIcon({ matchResult }: { matchResult: MatchResult }) {
  switch (matchResult) {
    case MatchResult.Full:
      return <CheckCircle2 className="text-green-500" size={20} />;
    case MatchResult.Partial:
      return <AlertCircle className="text-yellow-500" size={20} />;
    case MatchResult.None:
      return <XCircle className="text-red-500" size={20} />;
  }
}

export function RecognizedSpeech({ translation, isListening }: RecognizedSpeechProps) {
  const { text, pinyin, matchResult } = translation;

  if (!text) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm min-h-[200px] relative">
        <div className="text-center text-gray-500 py-8">
          <p>Hold the microphone button to start speaking</p>
          <p className="text-sm mt-2">Make sure to allow microphone access</p>
        </div>
        <WaveAnimation isActive={isListening} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm min-h-[200px] relative">
      <div className="space-y-2">
        <p className="text-lg text-gray-600">{pinyin}</p>
        <div className="flex items-center justify-between">
          <p className="text-3xl text-gray-800">{text}</p>
          {matchResult !== undefined && <StatusIcon matchResult={matchResult} />}
        </div>
      </div>
      <WaveAnimation isActive={isListening} />
    </div>
  );
}