import React from 'react';
import { RefreshCw } from 'lucide-react';
import { ChineseWord } from '../types/chinese';

interface TargetWordProps {
  word: ChineseWord;
  onRefresh: () => void;
}

export function TargetWord({ word, onRefresh }: TargetWordProps) {
  return (
    <div className="bg-blue-50 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold text-gray-600">Target Word</h2>
        <button
          onClick={onRefresh}
          className="p-2 hover:bg-blue-100 rounded-full transition-colors"
          title="Generate new word"
        >
          <RefreshCw size={16} className="text-blue-600" />
        </button>
      </div>
      <p className="text-2xl text-gray-800 mb-1">{word.word}</p>
      <p className="text-sm text-gray-600">{word.pinyin}</p>
      <p className="text-sm text-gray-500 mt-1">Meaning: {word.meaning}</p>
    </div>
  );
}