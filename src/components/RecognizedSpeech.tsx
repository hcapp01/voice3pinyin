import React from 'react';
import { TranslationState, MatchResult } from '../types/chinese';
import { WaveAnimation } from './WaveAnimation';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface RecognizedSpeechProps {
  translation: TranslationState;
  isListening: boolean;
}

function StatusIcon({ matchResult }: { matchResult: MatchResult }) {
  const iconProps = {
    size: 24,
    strokeWidth: 2,
    className: "absolute top-4 right-4"
  };

  switch (matchResult) {
    case MatchResult.Full:
      return <CheckCircle2 {...iconProps} className={`${iconProps.className} text-green-500`} />;
    case MatchResult.Partial:
      return <AlertCircle {...iconProps} className={`${iconProps.className} text-yellow-500`} />;
    case MatchResult.None:
      return <XCircle {...iconProps} className={`${iconProps.className} text-red-500`} />;
  }
}

export function RecognizedSpeech({ translation, isListening }: RecognizedSpeechProps) {
  const { text, pinyin, matchResult } = translation;

  const getBorderColor = () => {
    switch (matchResult) {
      case MatchResult.Full:
        return 'border-green-500';
      case MatchResult.Partial:
        return 'border-yellow-500';
      case MatchResult.None:
        return 'border-red-500';
    }
  };

  if (!text) {
    return (
      <div className="h-full bg-white rounded-lg p-4 shadow-sm relative border-2 border-transparent select-none">
        <div className="text-center text-gray-500 mt-8">
          <p>Hold the microphone button and speaking</p>
        </div>
        <WaveAnimation isActive={isListening} />
      </div>
    );
  }

  return (
    <div className={`h-full bg-white rounded-lg p-4 shadow-sm relative border-2 transition-colors duration-200 select-none ${getBorderColor()}`}>
      <div className="space-y-2 mb-12">
        <p className="text-lg text-gray-600">{pinyin}</p>
        <p className="text-3xl text-gray-800">{text}</p>
      </div>
      {matchResult !== undefined && <StatusIcon matchResult={matchResult} />}
      <WaveAnimation isActive={isListening} />
    </div>
  );
}