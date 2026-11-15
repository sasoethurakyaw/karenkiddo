import React from 'react';
import { Screen } from '../types';
import { useSound } from '../context/SoundContext';
import { Sparkles, Trophy, ArrowRight } from 'lucide-react';

interface CategoryHubViewProps {
  onNavigate: (screen: Screen) => void;
}

export const CategoryHubView: React.FC<CategoryHubViewProps> = ({ onNavigate }) => {
  const { playSfx } = useSound();

  const categories = [
    {
      id: 'family' as Screen,
      title: 'ကရင်လေးရဲ့ မိသားစု',
      englishTitle: 'Family Members',
      count: '၁၀ ယောက်',
      bgImage: '/desktop_images/Livingroom_background.webp',
      badgeColor: 'bg-purple-500 text-white',
      borderColor: 'border-purple-300 hover:border-purple-500',
      iconEmoji: '👨‍👩‍👧‍👦',
      colorTheme: 'from-purple-500/80 to-indigo-600/90',
    },
    {
      id: 'food' as Screen,
      title: 'ကရင်လေးကြိုက်တဲ့ အစားအစာ',
      englishTitle: 'Delicious Foods',
      count: '၁၈ မျိုး',
      bgImage: '/desktop_images/food_background.webp',
      badgeColor: 'bg-orange-500 text-white',
      borderColor: 'border-orange-300 hover:border-orange-500',
      iconEmoji: '🍎',
      colorTheme: 'from-orange-500/80 to-amber-600/90',
    },
    {
      id: 'animal' as Screen,
      title: 'ကရင်လေးချစ်တဲ့ တိရစ္ဆာန်လေးတွေ',
      englishTitle: 'Lovely Animals',
      count: '၈ မျိုး',
      bgImage: '/desktop_images/animal_background.webp',
      badgeColor: 'bg-emerald-500 text-white',
      borderColor: 'border-emerald-300 hover:border-emerald-500',
      iconEmoji: '🐶',
      colorTheme: 'from-emerald-500/80 to-teal-600/90',
    },
    {
      id: 'body' as Screen,
      title: 'ကရင်လေးရဲ့ ခန္ဓာကိုယ်',
      englishTitle: 'My Body Parts',
      count: '၇ နေရာ',
      bgImage: '/body/body.webp',
      badgeColor: 'bg-sky-500 text-white',
      borderColor: 'border-sky-300 hover:border-sky-500',
      iconEmoji: '🧒',
      colorTheme: 'from-sky-500/80 to-blue-600/90',
    },
    {
      id: 'number' as Screen,
      title: 'အရေအတွက်လေးများ',
      englishTitle: 'Numbers (1 to 10)',
      count: '၁ မှ ၁၀',
      bgImage: '/desktop_images/no_background3.webp',
      badgeColor: 'bg-amber-500 text-white',
      borderColor: 'border-amber-300 hover:border-amber-500',
      iconEmoji: '🔢',
      colorTheme: 'from-amber-500/80 to-yellow-600/90',
    },
    {
      id: 'verbs' as Screen,
      title: 'နေ့စဉ်လှုပ်ရှားမှုများ',
      englishTitle: 'Daily Activities',
      count: '၇ မျိုး',
      bgImage: '/mobile_images/toothbrush.webp',
      badgeColor: 'bg-pink-500 text-white',
      borderColor: 'border-pink-300 hover:border-pink-500',
      iconEmoji: '🪥',
      colorTheme: 'from-pink-500/80 to-rose-600/90',
    },
  ];

  const handleSelect = (screen: Screen) => {
    playSfx('content');
    onNavigate(screen);
  };

  return (
    <div className="min-h-[calc(100vh-70px)] max-w-6xl mx-auto px-4 py-6 sm:py-8">
      {/* Header Banner */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 font-bold px-4 py-1.5 rounded-full border border-amber-300 mb-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>ကဏ္ဍများကို ရွေးချယ်ပါ</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-myanmar text-amber-950">
          ကရင်လေးနဲ့အတူ အသံထွက်လေ့လာကြမယ်
        </h1>
        <p className="text-slate-600 font-myanmar text-sm sm:text-base mt-1">
          မိမိစိတ်ဝင်စားရာ ခေါင်းစဉ်တစ်ခုချင်းစီကို နှိပ်ပြီး ဝင်ရောက်လေ့လာနိုင်ပါတယ်
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {categories.map(cat => (
          <div
            key={cat.id}
            onClick={() => handleSelect(cat.id)}
            className={`
              group relative h-56 sm:h-64 rounded-3xl overflow-hidden border-4 ${cat.borderColor}
              shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2
              cursor-pointer flex flex-col justify-end p-5 select-none
            `}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${cat.bgImage})` }}
            />

            {/* Gradient Overlay for Readability */}
            <div className={`absolute inset-0 bg-gradient-to-t ${cat.colorTheme} opacity-75 group-hover:opacity-65 transition-opacity`} />

            {/* Top Badge (Item Count & Emoji) */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="text-3xl sm:text-4xl filter drop-shadow-md group-hover:animate-wiggle">
                {cat.iconEmoji}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-md ${cat.badgeColor}`}>
                {cat.count}
              </span>
            </div>

            {/* Card Content & Action Button */}
            <div className="relative z-10 text-white space-y-1">
              <span className="text-xs uppercase tracking-wider font-semibold opacity-90">
                {cat.englishTitle}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-myanmar drop-shadow leading-tight">
                {cat.title}
              </h2>

              <div className="pt-2 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-amber-200 text-sm font-bold group-hover:text-white transition-colors">
                  <span>လေ့လာမည်</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quiz Banner at Bottom */}
      <div className="mt-8 sm:mt-12 bg-gradient-to-r from-rose-500 via-amber-500 to-orange-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm font-bold">
            <Trophy className="w-4 h-4 text-yellow-300" />
            <span>ဉာဏ်စမ်းဂိမ်းကစားမယ်</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-myanmar">
            ကရင်အသံထွက် Quiz မေးခွန်းတွေ ဖြေကြမလား?
          </h3>
          <p className="text-white/90 font-myanmar text-sm sm:text-base">
            မေးခွန်း ၄၀ ကို လွယ်ကူ/ခက်ခဲ အဆင့် ၂ မျိုးနဲ့ စမ်းသပ်ဖြေဆိုပြီး ရွှေဖလားများ စုဆောင်းလိုက်ပါ!
          </p>
        </div>

        <button
          onClick={() => {
            playSfx('click');
            onNavigate('quiz');
          }}
          className="px-8 py-4 bg-white text-rose-600 hover:bg-amber-100 font-extrabold font-myanmar text-lg sm:text-xl rounded-2xl shadow-lg border-4 border-yellow-300 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          Quiz စတင်ကစားမည် 🏆
        </button>
      </div>
    </div>
  );
};
