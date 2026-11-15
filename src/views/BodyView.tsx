import React, { useState } from 'react';
import { bodyParts } from '../data/bodyData';
import { BodyPart } from '../types';
import { useSound } from '../context/SoundContext';
import { Volume2, Sparkles, User } from 'lucide-react';
import { AudioWave } from '../components/AudioWave';
import { HelpGuideModal } from '../components/HelpGuideModal';
import { KidButton } from '../components/KidButton';

export const BodyView: React.FC = () => {
  const { dialect, playVoice, isVoicePlaying } = useSound();
  const [activePart, setActivePart] = useState<BodyPart>(bodyParts[0]);
  const [showGuide, setShowGuide] = useState<boolean>(() => {
    return !sessionStorage.getItem('body_guide_viewed');
  });

  const handleSelectPart = (part: BodyPart) => {
    setActivePart(part);
    const voiceUrl = dialect === 'sakaw' ? part.sakaw : part.pow;
    playVoice(voiceUrl);
  };

  const handleSelectByPartId = (partId: string) => {
    const found = bodyParts.find(p => p.partIds.includes(partId) || p.id === partId);
    if (found) {
      handleSelectPart(found);
    }
  };

  const handleReplay = () => {
    const voiceUrl = dialect === 'sakaw' ? activePart.sakaw : activePart.pow;
    playVoice(voiceUrl);
  };

  const handleCloseGuide = () => {
    sessionStorage.setItem('body_guide_viewed', 'true');
    setShowGuide(false);
  };

  // Check if a hotspot is currently highlighted
  const isHighlighted = (partId: string) => {
    return activePart.partIds.includes(partId) || activePart.id === partId;
  };

  return (
    <div className="relative min-h-[calc(100vh-70px)] w-full py-6 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Guide Modal */}
      <HelpGuideModal
        isOpen={showGuide}
        onClose={handleCloseGuide}
        title="ခန္ဓာကိုယ်အစိတ်အပိုင်းများကို လေ့လာခြင်း"
        description="ခန္ဓာကိုယ်အစိတ်အပိုင်းကတ်လေးများ သို့မဟုတ် အရုပ်လေးပေါ်ရှိ နေရာများကို နှိပ်ပြီး ကရင်အသံထွက်ကို လေ့လာပါ!"
        guideImage="/desktop_images/body_guide.webp"
      />

      {/* Header Info */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-900 font-bold px-4 py-1 rounded-full border border-sky-300 text-sm mb-1">
          <User className="w-4 h-4 text-sky-600" />
          <span>ခန္ဓာကိုယ် (၇ နေရာ)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-myanmar text-sky-950">
          ကရင်လေးရဲ့ ခန္ဓာကိုယ်
        </h2>
        <p className="text-slate-600 font-myanmar text-sm sm:text-base mt-1">
          ကတ်လေးများကို နှိပ်ပြီး ခန္ဓာကိုယ်နေရာများနှင့် ကရင်အသံထွက်ကို လေ့လာကြည့်ရအောင်
        </p>
      </div>

      {/* Main Layout: Parts Grid & Silhouette Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Side: Body Parts List Cards */}
        <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 order-2 lg:order-1">
          {bodyParts.map(part => {
            const isSelected = activePart.id === part.id;

            return (
              <button
                key={part.id}
                onClick={() => handleSelectPart(part)}
                className={`
                  p-3 sm:p-4 rounded-2xl border-4 transition-all duration-200 cursor-pointer
                  flex flex-col items-center text-center select-none
                  ${isSelected
                    ? 'bg-sky-100 border-sky-500 shadow-xl scale-105'
                    : 'bg-white border-sky-100 hover:border-sky-300 hover:scale-102 shadow-sm'
                  }
                `}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-2">
                  <img
                    src={part.image}
                    alt={part.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <h4 className="font-myanmar font-extrabold text-base sm:text-lg text-slate-800">
                  {part.name}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Right Side: Interactive Silhouette with Scalable Percentage Hotspots */}
        <div className="lg:col-span-6 bg-white/90 backdrop-blur rounded-3xl p-6 border-4 border-sky-300 shadow-xl flex flex-col items-center text-center order-1 lg:order-2">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-myanmar font-extrabold text-2xl sm:text-3xl text-sky-950">
              {activePart.name}
            </h3>
            <AudioWave isPlaying={isVoicePlaying} />
          </div>

          {/* Interactive Scalable Silhouette Container */}
          <div className="relative w-64 h-80 sm:w-72 sm:h-96 my-2 select-none">
            {/* Background Boy Illustration */}
            <img
              src="/body/body.webp"
              alt="Kid Body Silhouette"
              className="w-full h-full object-contain pointer-events-none"
            />

            {/* Hotspot: Head */}
            <div
              onClick={() => handleSelectByPartId('head')}
              title="ခေါင်း"
              className={`
                absolute top-[5%] left-[34%] w-[32%] h-[24%] rounded-full cursor-pointer transition-all
                ${isHighlighted('head') ? 'bg-sky-500/50 ring-4 ring-sky-400 animate-pulse' : 'hover:bg-sky-400/30'}
              `}
            />

            {/* Hotspot: Eyes */}
            <div
              onClick={() => handleSelectByPartId('eye')}
              title="မျက်လုံး"
              className={`
                absolute top-[14%] left-[38%] w-[24%] h-[6%] rounded-full cursor-pointer transition-all
                ${isHighlighted('eye') ? 'bg-sky-500/50 ring-4 ring-sky-400 animate-pulse' : 'hover:bg-sky-400/30'}
              `}
            />

            {/* Hotspot: Ears */}
            <div
              onClick={() => handleSelectByPartId('ear')}
              title="နားရွက် (ဘယ်)"
              className={`
                absolute top-[13%] left-[30%] w-[8%] h-[8%] rounded-full cursor-pointer transition-all
                ${isHighlighted('ear') ? 'bg-sky-500/50 ring-4 ring-sky-400 animate-pulse' : 'hover:bg-sky-400/30'}
              `}
            />
            <div
              onClick={() => handleSelectByPartId('ear')}
              title="နားရွက် (ညာ)"
              className={`
                absolute top-[13%] right-[30%] w-[8%] h-[8%] rounded-full cursor-pointer transition-all
                ${isHighlighted('ear') ? 'bg-sky-500/50 ring-4 ring-sky-400 animate-pulse' : 'hover:bg-sky-400/30'}
              `}
            />

            {/* Hotspot: Nose */}
            <div
              onClick={() => handleSelectByPartId('nose')}
              title="နှာခေါင်း"
              className={`
                absolute top-[19%] left-[45%] w-[10%] h-[5%] rounded-full cursor-pointer transition-all
                ${isHighlighted('nose') ? 'bg-sky-500/50 ring-4 ring-sky-400 animate-pulse' : 'hover:bg-sky-400/30'}
              `}
            />

            {/* Hotspot: Mouth */}
            <div
              onClick={() => handleSelectByPartId('mouth')}
              title="ပါးစပ်"
              className={`
                absolute top-[23%] left-[43%] w-[14%] h-[5%] rounded-full cursor-pointer transition-all
                ${isHighlighted('mouth') ? 'bg-sky-500/50 ring-4 ring-sky-400 animate-pulse' : 'hover:bg-sky-400/30'}
              `}
            />

            {/* Hotspot: Hands */}
            <div
              onClick={() => handleSelectByPartId('hand')}
              title="လက် (ဘယ်)"
              className={`
                absolute top-[37%] left-[10%] w-[24%] h-[20%] rounded-2xl cursor-pointer transition-all
                ${isHighlighted('hand') ? 'bg-sky-500/50 ring-4 ring-sky-400 animate-pulse' : 'hover:bg-sky-400/30'}
              `}
            />
            <div
              onClick={() => handleSelectByPartId('hand')}
              title="လက် (ညာ)"
              className={`
                absolute top-[37%] right-[10%] w-[24%] h-[20%] rounded-2xl cursor-pointer transition-all
                ${isHighlighted('hand') ? 'bg-sky-500/50 ring-4 ring-sky-400 animate-pulse' : 'hover:bg-sky-400/30'}
              `}
            />

            {/* Hotspot: Legs */}
            <div
              onClick={() => handleSelectByPartId('leg')}
              title="ခြေထောက် (ဘယ်)"
              className={`
                absolute bottom-[3%] left-[30%] w-[18%] h-[26%] rounded-2xl cursor-pointer transition-all
                ${isHighlighted('leg') ? 'bg-sky-500/50 ring-4 ring-sky-400 animate-pulse' : 'hover:bg-sky-400/30'}
              `}
            />
            <div
              onClick={() => handleSelectByPartId('leg')}
              title="ခြေထောက် (ညာ)"
              className={`
                absolute bottom-[3%] right-[30%] w-[18%] h-[26%] rounded-2xl cursor-pointer transition-all
                ${isHighlighted('leg') ? 'bg-sky-500/50 ring-4 ring-sky-400 animate-pulse' : 'hover:bg-sky-400/30'}
              `}
            />
          </div>

          <div className="mt-4">
            <KidButton
              variant="blue"
              size="md"
              icon={<Volume2 className="w-5 h-5" />}
              onClick={handleReplay}
            >
              ကရင်အသံထွက် နားထောင်မည်
            </KidButton>
          </div>
        </div>
      </div>
    </div>
  );
};
