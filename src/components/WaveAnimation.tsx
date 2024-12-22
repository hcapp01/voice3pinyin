import { type FC } from 'react';

interface WaveAnimationProps {
  isActive: boolean;
}

export const WaveAnimation: FC<WaveAnimationProps> = ({ isActive }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-1 h-16">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={`w-1.5 h-12 rounded-full bg-blue-500 transform transition-all duration-200 ${
            isActive 
              ? 'animate-wave scale-y-100 opacity-80' 
              : 'scale-y-[0.3] opacity-30'
          }`}
          style={{
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};