import React from 'react';
import { TranslationState, MatchResult } from '../types/chinese';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { WaveAnimation } from './WaveAnimation';

interface TranslationBoxProps {
  translation: TranslationState;
  isListening: boolean;
}

export function TranslationBox({ translation, isListening }: TranslationBoxProps) {
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
      <div className="space-y-4">
        <TranslationSection
          title="Chinese"
          content={text}
          matchResult={matchResult}
        />
        <TranslationSection
          title="Pinyin"
          content={pinyin}
        />
      </div>
      <WaveAnimation isActive={isListening} />
    </div>
  );
}

interface TranslationSectionProps {
  title: string;
  content: string;
  matchResult?: MatchResult;
}

function TranslationSection({ title, content, matchResult }: TranslationSectionProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-600">{title}</h2>
        {matchResult !== undefined && <StatusIcon matchResult={matchResult} />}
      </div>
      <p className="text-2xl text-gray-800 min-h-[2.5rem]">{content}</p>
    </div>
  );
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