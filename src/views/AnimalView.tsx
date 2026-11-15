import React, { useState } from 'react';
import { animalItems } from '../data/animalData';
import { AnimalItem } from '../types';
import { useSound } from '../context/SoundContext';
import { Volume2, Sparkles, Music2 } from 'lucide-react';
import { AudioWave } from '../components/AudioWave';
import { HelpGuideModal } from '../components/HelpGuideModal';
import { KidButton } from '../components/KidButton';

export const AnimalView: React.FC = () => {
  const { dialect, playVoice, isVoicePlaying } = useSound();
  const [activeAnimal, setActiveAnimal] = useState<AnimalItem>(animalItems[0]);
  const [isBouncing, setIsBouncing] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(() => {
    return !sessionStorage.getItem('animal_guide_viewed');
  });

  const playAnimalSFX = (soundPath?: string) => {
    if (!soundPath) return;
    try {
      const audio = new Audio(soundPath);
      audio.volume = 0.4;
      audio.play().catch(() => {});
    } catch {}
  };

  const handleSelectAnimal = (animal: AnimalItem) => {
    setActiveAnimal(animal);
    setIsBouncing(true);

    // Play animal sound effect (e.g. bark, meow)
    if (animal.sound) {
      playAnimalSFX(animal.sound);
    }

    // Play Karen pronunciation
    const voiceUrl = dialect === 'sakaw' ? animal.sakaw : animal.pow;
    setTimeout(() => {
      playVoice(voiceUrl);
    }, 150);

    setTimeout(() => {
      setIsBouncing(false);
    }, 800);
  };

  const handleReplayVoice = () => {
    const voiceUrl = dialect === 'sakaw' ? activeAnimal.sakaw : activeAnimal.pow;
    playVoice(voiceUrl);
  };

  const handleCloseGuide = () => {
    sessionStorage.setItem('animal_guide_viewed', 'true');
    setShowGuide(false);
  };

  return (
    <div className="relative min-h-[calc(100vh-70px)] w-full py-6 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Background Decor */}
      <div
        className="fixed inset-0 pointer-events-none opacity-25 bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('/desktop_images/animal_background.webp')" }}
      />

      {/* Guide Modal */}
      <HelpGuideModal
        isOpen={showGuide}
        onClose={handleCloseGuide}
        title="တိရစ္ဆာန်လေးများကို လေ့လာခြင်း"
        description="တိရစ္ဆာန်ပုံလေးများကို နှိပ်ပြီး အသံမြည်သံနှင့် ကရင်အသံထွက်ကို နားထောင်လေ့လာနိုင်ပါသည်!"
        guideImage="/desktop_images/animal_guide.webp"
      />

      {/* Header Info */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 font-bold px-4 py-1 rounded-full border border-emerald-300 text-sm mb-1">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>တိရစ္ဆာန် (၈ ကောင်)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-myanmar text-emerald-950">
          ကရင်လေးချစ်တဲ့ တိရစ္ဆာန်လေးများ
        </h2>
        <p className="text-slate-600 font-myanmar text-sm sm:text-base mt-1">
          တိရစ္ဆာန်လေးတွေကို နှိပ်ပြီး ခြင်းတောင်းထဲ ထည့်ကစားကြစို့!
        </p>
      </div>

      {/* Main Layout: Basket Display & Animal Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Side (4 Animals on desktop, or grid on mobile) */}
        <div className="order-2 lg:order-1 lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
          {animalItems.slice(0, 4).map(animal => {
            const isSelected = activeAnimal.id === animal.id;

            return (
              <button
                key={animal.id}
                onClick={() => handleSelectAnimal(animal)}
                className={`
                  flex items-center gap-3 p-3 rounded-2xl border-4 transition-all duration-200 cursor-pointer text-left
                  ${isSelected
                    ? 'bg-emerald-50 border-emerald-500 shadow-lg scale-105'
                    : 'bg-white/90 border-emerald-100 hover:border-emerald-300 shadow-sm hover:scale-102'
                  }
                `}
              >
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="w-14 h-14 object-contain animate-bounce-gentle shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="font-myanmar font-extrabold text-base sm:text-lg text-emerald-950 truncate">
                    {animal.name}
                  </h4>
                  <span className="text-xs text-emerald-600 font-semibold">နှိပ်ပါ</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Center: Interactive Basket Stage */}
        <div className="order-1 lg:order-2 lg:col-span-6 bg-white/90 backdrop-blur rounded-3xl p-6 border-4 border-emerald-300 shadow-2xl flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-myanmar font-extrabold text-2xl sm:text-3xl text-emerald-950">
              {activeAnimal.name}
            </h3>
            {activeAnimal.sound && (
              <button
                onClick={() => playAnimalSFX(activeAnimal.sound)}
                className="w-9 h-9 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 flex items-center justify-center transition-transform active:scale-90"
                title="တိရစ္ဆာန်အော်သံနားထောင်မည်"
              >
                <Music2 className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="h-8 flex items-center justify-center mb-2">
            <AudioWave isPlaying={isVoicePlaying} />
          </div>

          {/* Basket Container with Animal dropping in */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center my-2">
            {/* Basket Base */}
            <img
              src="/animals/basket.webp"
              alt="Toy Basket"
              className="absolute bottom-0 w-56 sm:w-64 object-contain filter drop-shadow-xl z-10 pointer-events-none select-none"
            />

            {/* Animal bouncing out of basket */}
            <div
              className={`
                relative z-20 w-36 h-36 sm:w-44 sm:h-44 -mb-12 flex items-center justify-center
                transition-all duration-500
                ${isBouncing ? 'animate-[bounce_0.8s_ease-out] scale-125' : 'scale-100'}
              `}
            >
              <img
                src={activeAnimal.image}
                alt={activeAnimal.name}
                className="max-w-full max-h-full object-contain filter drop-shadow-lg"
              />
            </div>
          </div>

          {/* Replay voice button */}
          <div className="mt-4 flex gap-3">
            <KidButton
              variant="green"
              size="md"
              icon={<Volume2 className="w-5 h-5" />}
              onClick={handleReplayVoice}
            >
              ကရင်အသံထွက် နားထောင်မည်
            </KidButton>
          </div>
        </div>

        {/* Right Side (Remaining 4 Animals) */}
        <div className="order-3 lg:order-3 lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
          {animalItems.slice(4, 8).map(animal => {
            const isSelected = activeAnimal.id === animal.id;

            return (
              <button
                key={animal.id}
                onClick={() => handleSelectAnimal(animal)}
                className={`
                  flex items-center gap-3 p-3 rounded-2xl border-4 transition-all duration-200 cursor-pointer text-left
                  ${isSelected
                    ? 'bg-emerald-50 border-emerald-500 shadow-lg scale-105'
                    : 'bg-white/90 border-emerald-100 hover:border-emerald-300 shadow-sm hover:scale-102'
                  }
                `}
              >
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="w-14 h-14 object-contain animate-bounce-gentle shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="font-myanmar font-extrabold text-base sm:text-lg text-emerald-950 truncate">
                    {animal.name}
                  </h4>
                  <span className="text-xs text-emerald-600 font-semibold">နှိပ်ပါ</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
