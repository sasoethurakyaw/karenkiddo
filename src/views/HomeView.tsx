import React, { useState } from 'react';
import { Sparkles, Play, Award, Compass, Heart } from 'lucide-react';
import { Screen } from '../types';
import { KidButton } from '../components/KidButton';
import { useSound } from '../context/SoundContext';

interface HomeViewProps {
  onNavigate: (screen: Screen) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const { playSfx } = useSound();
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleCreateHeart = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();
    setHearts(prev => [...prev.slice(-15), { id, x, y }]);
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== id));
    }, 1200);
  };

  return (
    <div
      onClick={handleCreateHeart}
      className="relative min-h-[calc(100vh-65px)] w-full overflow-hidden flex flex-col items-center justify-between pb-12"
    >
      {/* Floating Hearts from interaction */}
      {hearts.map(h => (
        <span
          key={h.id}
          style={{ left: `${h.x}px`, top: `${h.y}px` }}
          className="pointer-events-none absolute text-3xl animate-[floatUp_1.2s_ease-out_forwards] select-none z-50"
        >
          ❤️
        </span>
      ))}

      {/* Hero Top Banner with Karen Flag Inspired Wave Gradient */}
      <section className="w-full bg-gradient-to-r from-blue-600 via-sky-500 to-teal-400 text-white py-10 sm:py-16 px-4 sm:px-8 rounded-b-[3rem] shadow-xl relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-amber-300/20 rounded-full blur-xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          {/* Welcome Text Content */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-amber-200 text-sm sm:text-base font-bold border border-white/30 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>ကလေးတို့အတွက် ကရင်ဘာသာစကား</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-myanmar leading-tight tracking-tight drop-shadow-md">
              မင်္ဂလာပါ၊ သားသားကတော့ <span className="text-amber-300">ကရင်လေး</span> ပါ!
            </h1>

            <p className="text-white/95 text-base sm:text-xl font-myanmar leading-relaxed max-w-xl mx-auto md:mx-0">
              သားသားအကြောင်းလေ့လာပြီး ကရင်အသံထွက်လေးတွေ (စကောကရင်ရော ပိုးကရင်ပါ) အတူတူ ပျော်ပျော်ပါးပါး လေ့လာကြရအောင်နော်။
            </p>

            <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-4">
              <KidButton
                variant="yellow"
                size="xl"
                icon={<Play className="w-7 h-7 fill-amber-950" />}
                onClick={() => onNavigate('categories')}
                className="scale-105 hover:scale-110 shadow-chunky"
              >
                စတင်မည်
              </KidButton>

              <KidButton
                variant="white"
                size="lg"
                icon={<Award className="w-6 h-6 text-amber-600" />}
                onClick={() => onNavigate('quiz')}
              >
                Quiz မေးခွန်းများ
              </KidButton>
            </div>
          </div>

          {/* Mascot Image with Bouncy Animation */}
          <div className="relative shrink-0 flex items-center justify-center">
            <div className="w-52 h-52 sm:w-72 sm:h-72 bg-white/30 rounded-full p-4 backdrop-blur-sm shadow-2xl border-4 border-white/60 animate-bounce-gentle flex items-center justify-center">
              <img
                src="/redkid.webp"
                alt="Karen Kiddo Mascot"
                className="w-full h-full object-cover rounded-full shadow-inner border-4 border-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Navigation Tiles Grid */}
      <section className="w-full max-w-5xl px-4 sm:px-6 mt-8 sm:mt-12">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-myanmar text-amber-950">
            ဘာတွေလေ့လာကြမလဲ? ✨
          </h2>
          <p className="text-slate-600 font-myanmar text-sm sm:text-base mt-1">
            နှစ်သက်ရာ ခေါင်းစဉ်တစ်ခုကို ရွေးချယ်ပြီး အသံထွက်များ နားထောင်ကြည့်ရအောင်
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5">
          {/* Family */}
          <div
            onClick={() => onNavigate('family')}
            className="group bg-purple-50 hover:bg-purple-100 border-4 border-purple-200 hover:border-purple-400 p-4 rounded-3xl shadow-sm hover:shadow-xl transition-all cursor-pointer text-center flex flex-col items-center transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-200 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-inner mb-3 group-hover:scale-110 transition-transform">
              👨‍👩‍👧‍👦
            </div>
            <h3 className="font-myanmar font-bold text-base sm:text-lg text-purple-900">
              မိသားစု
            </h3>
            <span className="text-xs sm:text-sm text-purple-600 font-myanmar">Family (၁၀ ယောက်)</span>
          </div>

          {/* Food */}
          <div
            onClick={() => onNavigate('food')}
            className="group bg-orange-50 hover:bg-orange-100 border-4 border-orange-200 hover:border-orange-400 p-4 rounded-3xl shadow-sm hover:shadow-xl transition-all cursor-pointer text-center flex flex-col items-center transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-200 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-inner mb-3 group-hover:scale-110 transition-transform">
              🍉
            </div>
            <h3 className="font-myanmar font-bold text-base sm:text-lg text-orange-900">
              အစားအစာ
            </h3>
            <span className="text-xs sm:text-sm text-orange-600 font-myanmar">Foods (၁၈ မျိုး)</span>
          </div>

          {/* Animals */}
          <div
            onClick={() => onNavigate('animal')}
            className="group bg-emerald-50 hover:bg-emerald-100 border-4 border-emerald-200 hover:border-emerald-400 p-4 rounded-3xl shadow-sm hover:shadow-xl transition-all cursor-pointer text-center flex flex-col items-center transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-200 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-inner mb-3 group-hover:scale-110 transition-transform">
              🐶
            </div>
            <h3 className="font-myanmar font-bold text-base sm:text-lg text-emerald-900">
              တိရစ္ဆာန်လေးများ
            </h3>
            <span className="text-xs sm:text-sm text-emerald-600 font-myanmar">Animals & Sounds</span>
          </div>

          {/* Body */}
          <div
            onClick={() => onNavigate('body')}
            className="group bg-sky-50 hover:bg-sky-100 border-4 border-sky-200 hover:border-sky-400 p-4 rounded-3xl shadow-sm hover:shadow-xl transition-all cursor-pointer text-center flex flex-col items-center transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-sky-200 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-inner mb-3 group-hover:scale-110 transition-transform">
              🧒
            </div>
            <h3 className="font-myanmar font-bold text-base sm:text-lg text-sky-900">
              ခန္ဓာကိုယ်
            </h3>
            <span className="text-xs sm:text-sm text-sky-600 font-myanmar">Body Parts</span>
          </div>

          {/* Numbers */}
          <div
            onClick={() => onNavigate('number')}
            className="group bg-amber-50 hover:bg-amber-100 border-4 border-amber-200 hover:border-amber-400 p-4 rounded-3xl shadow-sm hover:shadow-xl transition-all cursor-pointer text-center flex flex-col items-center transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-200 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl font-extrabold text-amber-800 shadow-inner mb-3 group-hover:scale-110 transition-transform">
              ၁ ၂ ၃
            </div>
            <h3 className="font-myanmar font-bold text-base sm:text-lg text-amber-900">
              အရေအတွက်
            </h3>
            <span className="text-xs sm:text-sm text-amber-600 font-myanmar">Numbers (၁ မှ ၁၀)</span>
          </div>

          {/* Daily Activities / Verbs */}
          <div
            onClick={() => onNavigate('verbs')}
            className="group bg-pink-50 hover:bg-pink-100 border-4 border-pink-200 hover:border-pink-400 p-4 rounded-3xl shadow-sm hover:shadow-xl transition-all cursor-pointer text-center flex flex-col items-center transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-pink-200 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-inner mb-3 group-hover:scale-110 transition-transform">
              🪥
            </div>
            <h3 className="font-myanmar font-bold text-base sm:text-lg text-pink-900">
              လှုပ်ရှားမှုများ
            </h3>
            <span className="text-xs sm:text-sm text-pink-600 font-myanmar">Daily Activities</span>
          </div>

          {/* Quiz Game */}
          <div
            onClick={() => onNavigate('quiz')}
            className="group bg-rose-50 hover:bg-rose-100 border-4 border-rose-200 hover:border-rose-400 p-4 rounded-3xl shadow-sm hover:shadow-xl transition-all cursor-pointer text-center flex flex-col items-center transform hover:-translate-y-1 col-span-2 sm:col-span-1 md:col-span-2"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-rose-200 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-inner mb-3 group-hover:scale-110 transition-transform">
              🏆
            </div>
            <h3 className="font-myanmar font-bold text-base sm:text-lg text-rose-900">
              Quiz ဂိမ်းကစားမယ်
            </h3>
            <span className="text-xs sm:text-sm text-rose-600 font-myanmar">စမ်းသပ်ပြီး ဖလားယူကြစို့</span>
          </div>
        </div>
      </section>

      {/* Cultural Motto Banner */}
      <section className="w-full max-w-4xl px-4 mt-12 text-center">
        <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 border-2 border-amber-300 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <img
            src="/family.webp"
            alt="Family Illustration"
            className="w-24 h-24 object-contain rounded-2xl shrink-0"
          />
          <div>
            <div className="flex items-center gap-1.5 text-amber-800 font-bold text-sm mb-1">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>ယဉ်ကျေးမှုနှင့် ဘာသာစကား</span>
            </div>
            <p className="text-amber-950 font-myanmar text-base sm:text-lg leading-relaxed">
              "မိမိတို့တိုင်းရင်းသားဘာသာစကားကိုသုံးစွဲပြောဆိုပြီး ချစ်ခြင်းမေတ္တာဖြင့်ယဉ်ကျေးမှုတွေကိုထွေးပိုက်ကြမယ်နော်။"
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('credits')}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-800 hover:text-amber-950 underline cursor-pointer"
              >
                <span>ဖန်တီးပံ့ပိုးသူ ၃ ဦး၏ ဂုဏ်ပြုမှတ်တမ်း ကြည့်ရှုရန်</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
