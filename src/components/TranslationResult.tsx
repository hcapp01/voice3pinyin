import React from 'react';

interface TranslationResultProps {
  text: string;
  pinyin: string;
}

export function TranslationResult({ text, pinyin }: TranslationResultProps) {
  if (!text) {
    return (
      <div className="text-center text-gray-500">
        <p>Hold the microphone button to start speaking</p>
        <p className="text-sm mt-2">Make sure to allow microphone access</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-50 rounded-lg p-4">
        <h2 className="text-sm font-semibold text-gray-600 mb-2">Chinese</h2>
        <p className="text-2xl text-gray-800">{text}</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h2 className="text-sm font-semibold text-gray-600 mb-2">Pinyin</h2>
        <p className="text-xl text-gray-700">{pinyin}</p>
      </div>
    </>
  );
}