import React from 'react';

interface TranslationResultProps {
  text: string;
  pinyin: string;
}

export function TranslationResult({ text, pinyin }: TranslationResultProps) {
  return (
    <div className="min-h-[200px] flex flex-col justify-center">
      {!text ? (
        <div className="text-center text-gray-500 py-8">
          <p>Hold the microphone button to start speaking</p>
          <p className="text-sm mt-2">Make sure to allow microphone access</p>
        </div>
      ) : (
        <>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h2 className="text-sm font-semibold text-gray-600 mb-2">Chinese</h2>
            <p className="text-2xl text-gray-800 min-h-[2.5rem]">{text}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-sm font-semibold text-gray-600 mb-2">Pinyin</h2>
            <p className="text-xl text-gray-700 min-h-[2.5rem]">{pinyin}</p>
          </div>
        </>
      )}
    </div>
  );
}