import React from 'react';
import { ArrowLeft, Music, VolumeX, HelpCircle, Trophy } from 'lucide-react';
import { Screen } from '../types';
import { useSound } from '../context/SoundContext';
import { DialectSwitch } from './DialectSwitch';

interface NavbarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onOpenHelp?: () => void;
  title?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  onOpenHelp,
  title,
}) => {
  const { bgMusicEnabled, toggleBgMusic, trophies, playSfx } = useSound();

  const handleBack = () => {
    playSfx('click');
    if (currentScreen === 'categories') {
      onNavigate('home');
    } else {
      onNavigate('categories');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-amber-200/80 px-3 py-2 sm:px-6 sm:py-3 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Left Side: Back button or Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          {currentScreen !== 'home' ? (
            <button
              onClick={handleBack}
              aria-label="Go Back"
              className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl border-2 sm:border-4 border-amber-300 shadow-play-orange active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            >
              <ArrowLeft className="w-6 h-6 stroke-[3]" />
            </button>
          ) : (
            <div
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <img
                src="/desktop_images/logo.webp"
                alt="Karen Kiddo"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-amber-400 shadow group-hover:scale-105 transition-transform"
              />
              <span className="hidden sm:inline-block font-extrabold text-xl text-amber-900 tracking-wide font-myanmar">
                Karen Kiddo
              </span>
            </div>
          )}

          {title && (
            <h1 className="font-myanmar font-bold text-base sm:text-xl text-amber-900 truncate max-w-[140px] sm:max-w-xs">
              {title}
            </h1>
          )}
        </div>

        {/* Center: Dialect Switcher (Shown on category pages) */}
        {currentScreen !== 'home' && currentScreen !== 'categories' && (
          <div className="hidden md:flex items-center">
            <DialectSwitch />
          </div>
        )}

        {/* Right Side: Trophies, Music Toggle, and Help */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Trophy Badge */}
          <div
            className="flex items-center gap-1 sm:gap-1.5 bg-amber-100 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl border-2 border-amber-300 text-amber-900 font-bold text-sm sm:text-base shadow-sm select-none"
            title="ရရှိထားသော ရွှေဖလားများ"
          >
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-amber-400 animate-bounce" />
            <span className="font-extrabold">{trophies}</span>
          </div>

          {/* Music Toggle */}
          <button
            onClick={toggleBgMusic}
            aria-label={bgMusicEnabled ? "Mute Background Music" : "Play Background Music"}
            className={`
              flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border-2 sm:border-3 transition-all active:scale-95 cursor-pointer
              ${bgMusicEnabled
                ? 'bg-emerald-100 text-emerald-700 border-emerald-300 hover:bg-emerald-200'
                : 'bg-slate-100 text-slate-400 border-slate-300 hover:bg-slate-200'
              }
            `}
          >
            {bgMusicEnabled ? (
              <Music className="w-5 h-5 animate-pulse" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button>

          {/* Help Guide Button */}
          {onOpenHelp && (
            <button
              onClick={onOpenHelp}
              aria-label="Open Guide"
              className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border-2 sm:border-3 bg-sky-100 text-sky-700 border-sky-300 hover:bg-sky-200 transition-all active:scale-95 cursor-pointer"
              title="ကစားနည်းလမ်းညွှန်"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Dialect Switcher Row */}
      {currentScreen !== 'home' && currentScreen !== 'categories' && (
        <div className="md:hidden flex justify-center mt-2 pt-2 border-t border-amber-100">
          <DialectSwitch />
        </div>
      )}
    </header>
  );
};
