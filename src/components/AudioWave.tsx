import React from 'react';
import { Volume2 } from 'lucide-react';

export const AudioWave: React.FC<{ isPlaying: boolean; className?: string }> = ({
  isPlaying,
  className = '',
}) => {
  if (!isPlaying) return null;

  return (
    <div className={`inline-flex items-center gap-1 bg-amber-100/90 text-amber-800 px-2.5 py-1 rounded-full border border-amber-300 animate-pulse ${className}`}>
      <Volume2 className="w-4 h-4 text-amber-600 animate-bounce" />
      <div className="flex items-center gap-0.5 h-3">
        <span className="w-1 bg-amber-500 rounded-full h-2 animate-[bounce_0.6s_infinite_100ms]"></span>
        <span className="w-1 bg-amber-600 rounded-full h-3 animate-[bounce_0.6s_infinite_200ms]"></span>
        <span className="w-1 bg-amber-500 rounded-full h-1.5 animate-[bounce_0.6s_infinite_300ms]"></span>
        <span className="w-1 bg-amber-600 rounded-full h-2.5 animate-[bounce_0.6s_infinite_400ms]"></span>
      </div>
    </div>
  );
};
