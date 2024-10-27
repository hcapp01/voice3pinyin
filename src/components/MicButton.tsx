import React from 'react';
import { Mic } from 'lucide-react';

interface MicButtonProps {
  isListening: boolean;
  onStart: () => void;
  onStop: () => void;
}

export function MicButton({ isListening, onStart, onStop }: MicButtonProps) {
  return (
    <button
      onMouseDown={onStart}
      onMouseUp={onStop}
      onTouchStart={onStart}
      onTouchEnd={onStop}
      className={`p-6 rounded-full transition-all duration-200 ${
        isListening
          ? 'bg-red-500 scale-110 shadow-lg'
          : 'bg-blue-500 hover:bg-blue-600'
      }`}
    >
      <Mic
        size={32}
        className={`text-white transition-all duration-200 ${
          isListening ? 'animate-pulse' : ''
        }`}
      />
    </button>
  );
}