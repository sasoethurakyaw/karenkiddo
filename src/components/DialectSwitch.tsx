import React from 'react';
import { useSound } from '../context/SoundContext';

export const DialectSwitch: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { dialect, setDialect } = useSound();

  return (
    <div
      className={`inline-flex items-center bg-white/90 backdrop-blur p-1.5 rounded-full border-4 border-amber-300 shadow-md ${className}`}
      role="group"
      aria-label="Dialect Selection"
    >
      <button
        type="button"
        onClick={() => setDialect('pow')}
        className={`
          relative px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-bold font-myanmar text-sm sm:text-base
          transition-all duration-200 select-none
          ${dialect === 'pow'
            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md scale-105'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
          }
        `}
      >
        ပိုးကရင်
      </button>

      <button
        type="button"
        onClick={() => setDialect('sakaw')}
        className={`
          relative px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-bold font-myanmar text-sm sm:text-base
          transition-all duration-200 select-none
          ${dialect === 'sakaw'
            ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md scale-105'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
          }
        `}
      >
        စကောကရင်
      </button>
    </div>
  );
};
