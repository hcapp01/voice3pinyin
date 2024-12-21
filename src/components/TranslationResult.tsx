import React from 'react';
import { TranslationState, MatchResult } from '../types/chinese';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface TranslationResultProps {
  translation: TranslationState;
}

export function TranslationResult({ translation }: TranslationResultProps) {
  const { text, pinyin, matchResult } = translation;

  const getStatusIcon = () => {
    if (matchResult === undefined) return null;
    
    switch (matchResult) {
      case MatchResult.Full:
        return <CheckCircle2 className="text-green-500" size={20} />;
      case MatchResult.Partial:
        return <AlertCircle className="text-yellow-500" size={20} />;
      case MatchResult.None:
        return <XCircle className="text-red-500" size={20} />;
    }
  };

  if (!text) {
    return (
      <div className="min-h-[200px] flex flex-col justify-center">
        <div className="text-center text-gray-500 py-8">
          <p>Hold the microphone button to start speaking</p>
          <p className="text-sm mt-2">Make sure to allow microphone access</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[200px] flex flex-col justify-center">
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-gray-600">Chinese</h2>
          {getStatusIcon()}
        </div>
        <p className="text-2xl text-gray-800 min-h-[2.5rem]">{text}</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h2 className="text-sm font-semibold text-gray-600 mb-2">Pinyin</h2>
        <p className="text-xl text-gray-700 min-h-[2.5rem]">{pinyin}</p>
      </div>
    </div>
  );
}