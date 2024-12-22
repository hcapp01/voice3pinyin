import { type FC } from 'react';
import { Mic, Square } from 'lucide-react';

interface MicButtonProps {
  isListening: boolean;
  onStart: () => void;
  onStop: () => void;
}

export const MicButton: FC<MicButtonProps> = ({ isListening, onStart, onStop }) => {
  return (
    <button
      onMouseDown={onStart}
      onMouseUp={onStop}
      onTouchStart={onStart}
      onTouchEnd={onStop}
      className={`p-6 rounded-full transition-all duration-200 select-none ${
        isListening
          ? 'bg-red-500 scale-110 shadow-lg'
          : 'bg-blue-500 hover:bg-blue-600'
      }`}
    >
      {isListening ? (
        <Square
          size={32}
          className="text-white transition-all duration-200 animate-pulse"
        />
      ) : (
        <Mic
          size={32}
          className="text-white transition-all duration-200"
        />
      )}
    </button>
  );
};