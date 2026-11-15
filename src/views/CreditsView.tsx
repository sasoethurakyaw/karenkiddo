import React, { useState } from 'react';
import { contributors } from '../data/creditsData';
import { useSound } from '../context/SoundContext';
import { Heart, Sparkles, Award, ArrowLeft, Users } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CreditsViewProps {
  onBack: () => void;
}

export const CreditsView: React.FC<CreditsViewProps> = ({ onBack }) => {
  const { playSfx } = useSound();
  const [thankCount, setThankCount] = useState<Record<string, number>>({});

  const handleThank = (id: string) => {
    playSfx('correct');
    setThankCount(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  return (
    <div className="relative min-h-[calc(100vh-70px)] w-full py-8 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col justify-between">
      {/* Top Banner */}
      <div>
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-800 font-bold px-4 py-1.5 rounded-full border border-rose-300 text-sm mb-2 shadow-sm">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>ဂုဏ်ပြုမှတ်တမ်းနှင့် ကျေးဇူးတင်လွှာ</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black font-myanmar text-amber-950">
            Karen Kiddo ကို ဖန်တီးကူညီပေးသူများ
          </h1>
          <p className="text-slate-600 font-myanmar text-sm sm:text-base max-w-2xl mx-auto mt-2">
            ကလေးငယ်များ ကရင်တိုင်းရင်းသားဘာသာစကားကို ပျော်ရွှင်လွယ်ကူစွာ လေ့လာသင်ယူနိုင်ရန် အဖိုးတန်သော အချိန်နှင့် စွမ်းရည်များဖြင့် မေတ္တာရှေ့ထား ကူညီပေးခဲ့ကြသော အဓိက ပံ့ပိုးသူ (၃) ဦးအား လှိုက်လှဲစွာ ဂုဏ်ပြုမှတ်တမ်းတင်အပ်ပါသည်။
          </p>
        </div>

        {/* 3 Contributor Tribute Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contributors.map(c => {
            const thanks = thankCount[c.id] || 0;

            return (
              <div
                key={c.id}
                className={`
                  relative bg-white/95 backdrop-blur rounded-3xl p-6 border-4 ${c.borderColor}
                  shadow-chunky hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5
                  flex flex-col justify-between text-center
                `}
              >
                {/* Top Avatar Ring with Emoji */}
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      w-24 h-24 rounded-3xl bg-gradient-to-tr ${c.colorTheme} text-white
                      flex items-center justify-center text-5xl shadow-lg border-4 border-white mb-4
                      animate-bounce-gentle
                    `}
                  >
                    {c.icon}
                  </div>

                  {/* Role Badges */}
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border mb-2 ${c.tagColor}`}>
                    {c.role}
                  </span>

                  <h3 className="font-myanmar font-black text-xl text-slate-900 leading-snug mb-1">
                    {c.roleBurmese}
                  </h3>

                  <p className="text-slate-600 font-myanmar text-sm leading-relaxed mt-2 text-justify sm:text-center">
                    {c.description}
                  </p>
                </div>

                {/* Bottom Interactive "Thank You" Button */}
                <div className="pt-6 border-t border-slate-100 mt-6 flex flex-col items-center gap-2">
                  <button
                    onClick={() => handleThank(c.id)}
                    className="w-full py-3 px-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold font-myanmar text-sm rounded-2xl shadow-play-pink active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>ကျေးဇူးတင်ပါတယ် ({thanks})</span>
                  </button>
                  <span className="text-xs text-slate-400 font-myanmar">နှိပ်ပြီး ကျေးဇူးစကားဆိုပါ ❤️</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Appreciation Message */}
        <div className="bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-100 rounded-3xl p-6 border-2 border-amber-300 shadow-sm text-center max-w-3xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 text-amber-800 font-bold text-base">
            <Users className="w-5 h-5 text-amber-600" />
            <span>မိဘများ၊ ဆရာ/ဆရာမများနှင့် ကလေးငယ်များထံသို့</span>
          </div>
          <p className="text-amber-950 font-myanmar text-sm sm:text-base leading-relaxed">
            တိုင်းရင်းသားရိုးရာ ယဉ်ကျေးမှုနှင့် ဘာသာစကားအမွေအနှစ်များကို ဆက်လက်ထိန်းသိမ်းကာ သားငယ်သမီးငယ်များ ရင်ထဲတွင် မျိုးစေ့ချပေးနိုင်ပါစေကြောင်း ဆုမွန်ကောင်းတောင်းအပ်ပါသည်။
          </p>
        </div>
      </div>

      {/* Back to Home Button */}
      <div className="pt-8 text-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold font-myanmar rounded-2xl shadow-play-orange active:translate-y-1 active:shadow-none transition-all cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>ပင်မစာမျက်နှာသို့ ပြန်သွားမည်</span>
        </button>
      </div>
    </div>
  );
};
