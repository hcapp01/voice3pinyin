import React from 'react';
import { TranslationState } from '../types/chinese';
import { CheckCircle2, XCircle } from 'lucide-react';

interface TranslationResultProps {
  translation: TranslationState;
}

export function TranslationResult({ translation }: TranslationResultProps) {
  const { text, pinyin, isCorrect } = translation;

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
          {isCorrect !== undefined && (
            isCorrect ? (
              <CheckCircle2 className="text-green-500" size={20} />
            ) : (
              <XCircle className="text-red-500" size={20} />
            )
          )}
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