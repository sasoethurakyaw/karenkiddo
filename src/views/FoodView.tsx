import React, { useState } from 'react';
import { foodItems } from '../data/foodData';
import { FoodItem } from '../types';
import { useSound } from '../context/SoundContext';
import { Volume2, Sparkles, Utensils } from 'lucide-react';
import { AudioWave } from '../components/AudioWave';
import { HelpGuideModal } from '../components/HelpGuideModal';
import { KidButton } from '../components/KidButton';

export const FoodView: React.FC = () => {
  const { dialect, playVoice, playSfx, isVoicePlaying } = useSound();
  const [activeFood, setActiveFood] = useState<FoodItem>(foodItems[0]);
  const [isDropping, setIsDropping] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(() => {
    return !sessionStorage.getItem('food_guide_viewed');
  });

  const handleSelectFood = (food: FoodItem) => {
    setActiveFood(food);
    setIsDropping(true);
    playSfx('content');

    const voiceUrl = dialect === 'sakaw' ? food.sakaw : food.pow;
    if (voiceUrl) {
      playVoice(voiceUrl);
    }

    setTimeout(() => {
      setIsDropping(false);
    }, 600);
  };

  const handleReplay = () => {
    const voiceUrl = dialect === 'sakaw' ? activeFood.sakaw : activeFood.pow;
    if (voiceUrl) {
      playVoice(voiceUrl);
    }
  };

  const handleCloseGuide = () => {
    sessionStorage.setItem('food_guide_viewed', 'true');
    setShowGuide(false);
  };

  return (
    <div className="relative min-h-[calc(100vh-70px)] w-full py-6 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Background Decor */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('/desktop_images/food_background.webp')" }}
      />

      {/* Guide Modal */}
      <HelpGuideModal
        isOpen={showGuide}
        onClose={handleCloseGuide}
        title="အစားအစာများကို လေ့လာခြင်း"
        description="အစားအစာပုံလေးများကို နှိပ်လိုက်လျှင် ပန်းကန်ထဲသို့ ကျရောက်လာပြီး ကရင်အသံထွက်ကို လေ့လာနိုင်ပါသည်!"
        guideImage="/desktop_images/food_guide.webp"
      />

      {/* Header Info */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-900 font-bold px-4 py-1 rounded-full border border-orange-300 text-sm mb-1">
          <Utensils className="w-4 h-4 text-orange-600" />
          <span>အစားအစာ (၁၈ မျိုး)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-myanmar text-orange-950">
          ကရင်လေးကြိုက်တဲ့ အစားအစာများ
        </h2>
        <p className="text-slate-600 font-myanmar text-sm sm:text-base mt-1">
          နှစ်သက်ရာ အစားအစာကို ရွေးချယ်ပြီး ပန်းကန်ထဲ ထည့်စားကြစို့!
        </p>
      </div>

      {/* Main Interactive Stage: Plate Display + Food Menu */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Top: Interactive Plate Stage */}
        <div className="lg:col-span-5 bg-white/90 backdrop-blur rounded-3xl p-6 border-4 border-amber-300 shadow-xl flex flex-col items-center text-center">
          <h3 className="font-myanmar font-extrabold text-2xl sm:text-3xl text-amber-900 mb-2">
            {activeFood.name}
          </h3>

          {/* Audio Status */}
          <div className="h-8 flex items-center justify-center mb-2">
            <AudioWave isPlaying={isVoicePlaying} />
          </div>

          {/* The Plate Container */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-2">
            {/* Plate Base Image */}
            <img
              src="/food_png/plate.webp"
              alt="Dining Plate"
              className="absolute inset-0 w-full h-full object-contain filter drop-shadow-md select-none pointer-events-none"
            />

            {/* Food item placed on top of plate */}
            <div
              className={`
                relative z-10 w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center
                transition-all duration-300
                ${isDropping ? 'animate-[bounce_0.6s_ease-out] scale-110' : 'scale-100'}
              `}
            >
              <img
                src={activeFood.largeImage}
                alt={activeFood.name}
                className="max-w-full max-h-full object-contain filter drop-shadow-lg"
              />
            </div>
          </div>

          {/* Action Replay Button */}
          <div className="mt-4 w-full flex justify-center">
            <KidButton
              variant="orange"
              size="md"
              icon={<Volume2 className="w-5 h-5" />}
              onClick={handleReplay}
              className="w-full sm:w-auto"
            >
              အသံပြန်လည်နားထောင်မည်
            </KidButton>
          </div>
        </div>

        {/* Right/Bottom: Food Selection Grid */}
        <div className="lg:col-span-7 bg-white/80 backdrop-blur rounded-3xl p-4 sm:p-6 border-4 border-amber-200 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-myanmar font-bold text-lg text-slate-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>အစားအစာ မီနူးများ</span>
            </h4>
            <span className="text-xs sm:text-sm font-semibold text-slate-500">
              နှိပ်ပြီး ရွေးချယ်ပါ
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
            {foodItems.map(food => {
              const isSelected = activeFood.id === food.id;

              return (
                <button
                  key={food.id}
                  onClick={() => handleSelectFood(food)}
                  className={`
                    group relative flex flex-col items-center justify-center p-2.5 rounded-2xl
                    border-3 sm:border-4 transition-all duration-200 cursor-pointer
                    ${isSelected
                      ? 'bg-amber-100 border-amber-500 shadow-lg scale-105'
                      : 'bg-white border-amber-100 hover:border-amber-300 hover:scale-105 shadow-sm'
                    }
                  `}
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-1">
                    <img
                      src={food.thumbnail}
                      alt={food.name}
                      className="max-w-full max-h-full object-contain group-hover:rotate-6 transition-transform"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-myanmar font-bold text-slate-800 text-center leading-tight truncate w-full">
                    {food.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
