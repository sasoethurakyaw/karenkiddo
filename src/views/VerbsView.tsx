import React, { useState } from 'react';
import { verbsData } from '../data/verbsData';
import { VerbItem } from '../types';
import { useSound } from '../context/SoundContext';
import { Volume2, Sparkles, Smile } from 'lucide-react';
import { AudioWave } from '../components/AudioWave';
import { KidButton } from '../components/KidButton';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const VerbsView: React.FC = () => {
  const { dialect, playVoice, isVoicePlaying, playSfx } = useSound();
  const [activeVerb, setActiveVerb] = useState<VerbItem>(verbsData[0]);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  const handleSelectVerb = (verb: VerbItem) => {
    setActiveVerb(verb);
    const voiceUrl = dialect === 'sakaw' ? verb.sakaw : verb.pow;
    playVoice(voiceUrl);
  };

  const handleToothClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    playSfx('content');

    const newBubbles: Bubble[] = Array.from({ length: 4 }).map(() => ({
      id: Date.now() + Math.random(),
      x: clickX + (Math.random() * 60 - 30),
      y: clickY + (Math.random() * 60 - 30),
      size: Math.floor(Math.random() * 30) + 20,
    }));

    setBubbles(prev => [...prev.slice(-20), ...newBubbles]);

    setTimeout(() => {
      setBubbles(prev => prev.filter(b => !newBubbles.some(nb => nb.id === b.id)));
    }, 1500);

    const voiceUrl = dialect === 'sakaw' ? activeVerb.sakaw : activeVerb.pow;
    playVoice(voiceUrl);
  };

  const handleReplay = () => {
    const voiceUrl = dialect === 'sakaw' ? activeVerb.sakaw : activeVerb.pow;
    playVoice(voiceUrl);
  };

  return (
    <div className="relative min-h-[calc(100vh-70px)] w-full py-6 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header Info */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-900 font-bold px-4 py-1 rounded-full border border-pink-300 text-sm mb-1">
          <Smile className="w-4 h-4 text-pink-600" />
          <span>နေ့စဉ်လှုပ်ရှားမှုများ</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-myanmar text-pink-950">
          ချစ်စရာ နေ့စဉ်လှုပ်ရှားမှုများ
        </h2>
        <p className="text-slate-600 font-myanmar text-sm sm:text-base mt-1">
          သွားတိုက်ခြင်း၊ စားသောက်ခြင်း၊ ဆော့ကစားခြင်း စသည့် လှုပ်ရှားမှုအသံထွက်များကို လေ့လာပါ
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Stage: Interactive Toothbrushing / Activity Canvas */}
        <div className="lg:col-span-6 bg-white/90 backdrop-blur rounded-3xl p-6 border-4 border-pink-300 shadow-xl flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-myanmar font-extrabold text-2xl sm:text-3xl text-pink-950">
              {activeVerb.name}
            </h3>
            <AudioWave isPlaying={isVoicePlaying} />
          </div>

          <p className="text-xs sm:text-sm text-slate-500 font-semibold mb-4">
            {activeVerb.id === 'toothbrush'
              ? 'သွားပုံလေးပေါ်ကို နှိပ်ပြီး ဆပ်ပြာပူဖောင်းလေးများ ထွက်အောင်တိုက်ကြည့်ပါ!'
              : 'အသံထွက်ကို သေချာနားထောင်ပြီး လိုက်ဆိုကြည့်ပါ'
            }
          </p>

          {/* Interactive Tooth Area for Toothbrushing */}
          {activeVerb.id === 'toothbrush' ? (
            <div
              onClick={handleToothClick}
              className="relative w-64 h-64 sm:w-72 sm:h-72 bg-gradient-to-b from-sky-100 to-blue-50 rounded-3xl border-4 border-dashed border-sky-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden select-none hover:shadow-lg transition-all"
            >
              {/* Cute Tooth Character */}
              <div className="w-36 h-44 bg-white rounded-t-[3rem] rounded-b-[2rem] border-4 border-slate-300 shadow-md flex flex-col items-center justify-center relative p-3">
                {/* Tooth Eyes */}
                <div className="flex gap-6 mb-2">
                  <span className="w-3 h-3 bg-slate-800 rounded-full"></span>
                  <span className="w-3 h-3 bg-slate-800 rounded-full"></span>
                </div>
                {/* Tooth Smile */}
                <div className="w-8 h-4 border-b-4 border-slate-800 rounded-full"></div>
                {/* Toothbrush icon */}
                <span className="absolute -bottom-3 text-4xl transform rotate-45">🪥</span>
              </div>

              {/* Bubbles */}
              {bubbles.map(b => (
                <span
                  key={b.id}
                  style={{
                    left: `${b.x}px`,
                    top: `${b.y}px`,
                    width: `${b.size}px`,
                    height: `${b.size}px`,
                  }}
                  className="pointer-events-none absolute rounded-full bg-gradient-to-tr from-sky-200 via-white to-pink-200 border-2 border-white/80 shadow-md animate-pop opacity-90"
                />
              ))}

              <span className="mt-3 text-xs font-bold text-sky-700 bg-white/80 px-3 py-1 rounded-full">
                နှိပ်ပါ (ဆပ်ပြာမြှုပ်ထွက်မည်)
              </span>
            </div>
          ) : (
            <div className="w-64 h-64 sm:w-72 sm:h-72 bg-pink-50 rounded-3xl border-4 border-pink-200 flex flex-col items-center justify-center p-6 shadow-inner">
              <span className="text-7xl sm:text-8xl mb-4 animate-bounce-gentle">
                {activeVerb.icon}
              </span>
              <span className="text-2xl font-bold font-myanmar text-pink-900">
                {activeVerb.name}
              </span>
            </div>
          )}

          <div className="mt-6">
            <KidButton
              variant="pink"
              size="md"
              icon={<Volume2 className="w-5 h-5" />}
              onClick={handleReplay}
            >
              ကရင်အသံထွက် နားထောင်မည်
            </KidButton>
          </div>
        </div>

        {/* Right Stage: Verbs Selection List */}
        <div className="lg:col-span-6 bg-white/80 backdrop-blur rounded-3xl p-5 sm:p-6 border-4 border-pink-200 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-pink-500" />
            <h4 className="font-myanmar font-bold text-lg text-slate-800">
              နေ့စဉ်ပြုမူလှုပ်ရှားမှုများ ရွေးချယ်ပါ
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {verbsData.map(verb => {
              const isSelected = activeVerb.id === verb.id;

              return (
                <button
                  key={verb.id}
                  onClick={() => handleSelectVerb(verb)}
                  className={`
                    flex items-center gap-4 p-4 rounded-2xl border-4 transition-all duration-200 cursor-pointer text-left
                    ${isSelected
                      ? 'bg-pink-50 border-pink-500 shadow-lg scale-102'
                      : 'bg-white border-pink-100 hover:border-pink-300 hover:scale-101 shadow-sm'
                    }
                  `}
                >
                  <span className="text-3xl sm:text-4xl shrink-0">
                    {verb.icon}
                  </span>
                  <div className="min-w-0">
                    <h5 className="font-myanmar font-extrabold text-base sm:text-lg text-slate-800 truncate">
                      {verb.name}
                    </h5>
                    <span className="text-xs text-pink-600 font-semibold">
                      နှိပ်ပြီးနားထောင်ပါ
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
