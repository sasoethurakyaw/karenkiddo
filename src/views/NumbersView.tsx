import React, { useState } from 'react';
import { numbersData } from '../data/numbersData';
import { NumberItem } from '../types';
import { useSound } from '../context/SoundContext';
import { Volume2, Sparkles, RotateCcw } from 'lucide-react';
import { AudioWave } from '../components/AudioWave';
import { HelpGuideModal } from '../components/HelpGuideModal';
import { KidButton } from '../components/KidButton';

export const NumbersView: React.FC = () => {
  const { dialect, playVoice, isVoicePlaying, playSfx } = useSound();
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [activeNumber, setActiveNumber] = useState<NumberItem | null>(null);
  const [showGuide, setShowGuide] = useState<boolean>(() => {
    return !sessionStorage.getItem('numbers_guide_viewed');
  });

  const handleCardClick = (numItem: NumberItem) => {
    setActiveNumber(numItem);
    setFlippedCards(prev => ({
      ...prev,
      [numItem.id]: !prev[numItem.id],
    }));

    playSfx('content');
    const voiceUrl = dialect === 'sakaw' ? numItem.sakaw : numItem.pow;
    playVoice(voiceUrl);
  };

  const handleResetFlipped = () => {
    playSfx('click');
    setFlippedCards({});
  };

  const handleCloseGuide = () => {
    sessionStorage.setItem('numbers_guide_viewed', 'true');
    setShowGuide(false);
  };

  const cardColors = [
    'from-rose-400 to-red-500 border-rose-300',
    'from-amber-400 to-orange-500 border-amber-300',
    'from-yellow-400 to-amber-500 border-yellow-300',
    'from-emerald-400 to-green-600 border-emerald-300',
    'from-teal-400 to-cyan-600 border-teal-300',
    'from-sky-400 to-blue-600 border-sky-300',
    'from-indigo-400 to-violet-600 border-indigo-300',
    'from-purple-400 to-fuchsia-600 border-purple-300',
    'from-pink-400 to-rose-500 border-pink-300',
    'from-orange-400 to-red-600 border-orange-300',
  ];

  return (
    <div className="relative min-h-[calc(100vh-70px)] w-full py-6 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Background Decor */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('/desktop_images/no_background3.webp')" }}
      />

      {/* Guide Modal */}
      <HelpGuideModal
        isOpen={showGuide}
        onClose={handleCloseGuide}
        title="အရေအတွက်လေးများကို လေ့လာခြင်း"
        description="ကတ်လေးများကို နှိပ်လိုက်လျှင် ကတ်လှန်သွားပြီး ကရင်အသံထွက်နှင့်အတူ အရေအတွက်ပုံလေးများကို တွေ့မြင်ရပါမည်!"
        guideImage="/desktop_images/no_guide.webp"
      />

      {/* Header Info */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 font-bold px-4 py-1 rounded-full border border-amber-300 text-sm mb-1">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>ဂဏန်း (၁ မှ ၁၀ အထိ)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-myanmar text-amber-950">
          အရေအတွက်လေးများ ရေတွက်ကြမယ်
        </h2>
        <p className="text-slate-600 font-myanmar text-sm sm:text-base mt-1">
          ကတ်လေးများကို နှိပ်ပြီး လှန်ကြည့်ကာ အသံထွက်ကို နားထောင်လေ့လာပါ
        </p>

        <div className="mt-4 flex items-center justify-center gap-3">
          <KidButton
            variant="white"
            size="sm"
            icon={<RotateCcw className="w-4 h-4 text-amber-700" />}
            onClick={handleResetFlipped}
          >
            ကတ်များပြန်သိမ်းမည်
          </KidButton>
          <AudioWave isPlaying={isVoicePlaying} />
        </div>
      </div>

      {/* 3D Tactile Flip Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
        {numbersData.map((item, index) => {
          const isFlipped = flippedCards[item.id] || false;
          const colorClass = cardColors[index % cardColors.length];

          return (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              className="group h-48 sm:h-56 perspective-1000 cursor-pointer select-none"
            >
              <div
                className={`
                  relative w-full h-full duration-500 transform-style-3d rounded-3xl transition-transform
                  ${isFlipped ? 'rotate-y-180' : ''}
                `}
              >
                {/* FRONT SIDE (Myanmar Numeral Digit) */}
                <div
                  className={`
                    absolute inset-0 backface-hidden w-full h-full rounded-3xl p-4
                    bg-gradient-to-br ${colorClass} text-white
                    border-4 shadow-chunky flex flex-col items-center justify-between
                    group-hover:scale-105 transition-transform
                  `}
                >
                  <div className="w-full flex justify-between items-center text-xs font-bold opacity-80">
                    <span>No. {item.num}</span>
                    <Volume2 className="w-4 h-4" />
                  </div>

                  <span className="text-6xl sm:text-7xl font-myanmar font-black drop-shadow-md my-auto">
                    {item.myanmarDigit}
                  </span>

                  <span className="font-myanmar font-bold text-sm sm:text-base bg-white/25 px-3 py-1 rounded-full backdrop-blur-sm">
                    {item.burmeseName}
                  </span>
                </div>

                {/* BACK SIDE (Illustration graphic) */}
                <div
                  className="absolute inset-0 backface-hidden rotate-y-180 w-full h-full rounded-3xl p-3 bg-white border-4 border-amber-300 shadow-chunky flex flex-col items-center justify-between"
                >
                  <div className="w-full flex justify-between items-center text-xs text-amber-800 font-bold">
                    <span>{item.myanmarDigit}</span>
                    <span>{item.burmeseName}</span>
                  </div>

                  <div className="w-full flex-1 flex items-center justify-center p-1">
                    <img
                      src={item.imageSrc}
                      alt={`Number ${item.num}`}
                      className="max-h-28 sm:max-h-32 w-auto object-contain"
                    />
                  </div>

                  <span className="text-xs font-myanmar font-bold text-amber-700">
                    နှိပ်လျှင်ပြန်လှန်မည်
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
