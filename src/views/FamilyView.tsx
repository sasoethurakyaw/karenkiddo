import React, { useState } from 'react';
import { familyMembers } from '../data/familyData';
import { FamilyMember } from '../types';
import { useSound } from '../context/SoundContext';
import { Volume2, X, Sparkles } from 'lucide-react';
import { AudioWave } from '../components/AudioWave';
import { HelpGuideModal } from '../components/HelpGuideModal';
import { KidButton } from '../components/KidButton';

export const FamilyView: React.FC = () => {
  const { dialect, playVoice, isVoicePlaying, activeVoiceUrl } = useSound();
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [showGuide, setShowGuide] = useState<boolean>(() => {
    return !sessionStorage.getItem('family_guide_viewed');
  });

  const handleMemberClick = (member: FamilyMember) => {
    setSelectedMember(member);
    const voiceUrl = dialect === 'sakaw' ? member.sakaw : member.pow;
    playVoice(voiceUrl);
  };

  const handleReplayVoice = (member: FamilyMember) => {
    const voiceUrl = dialect === 'sakaw' ? member.sakaw : member.pow;
    playVoice(voiceUrl);
  };

  const handleCloseGuide = () => {
    sessionStorage.setItem('family_guide_viewed', 'true');
    setShowGuide(false);
  };

  return (
    <div className="relative min-h-[calc(100vh-70px)] w-full py-6 px-4 sm:px-6">
      {/* Background Decor */}
      <div
        className="fixed inset-0 pointer-events-none opacity-25 bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('/desktop_images/Livingroom_background.webp')" }}
      />

      {/* Guide Modal */}
      <HelpGuideModal
        isOpen={showGuide}
        onClose={handleCloseGuide}
        title="မိသားစုဝင်များကို လေ့လာခြင်း"
        description="ဓာတ်ပုံဘောင်လေးများကို နှိပ်ပြီး မိသားစုဝင်များ၏ ကရင်အသံထွက်ကို နားထောင်ကြည့်ပါ!"
        guideImage="/desktop_images/family_guide.webp"
      />

      {/* Header Info */}
      <div className="max-w-5xl mx-auto text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-900 font-bold px-4 py-1 rounded-full border border-purple-300 text-sm mb-1">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>မိသားစု (၁၀ ယောက်)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-myanmar text-purple-950">
          ကရင်လေးရဲ့ မိသားစုဝင်များ
        </h2>
        <p className="text-slate-600 font-myanmar text-sm sm:text-base mt-1">
          ဓာတ်ပုံလေးများကို နှိပ်ပြီး ကရင်အသံထွက်ကို လေ့လာလိုက်ပါ
        </p>
      </div>

      {/* Photo Frames Wall Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {familyMembers.map(member => {
          const isSelected = selectedMember?.id === member.id;
          const isCurrentVoice = isVoicePlaying && (activeVoiceUrl === member.sakaw || activeVoiceUrl === member.pow);

          return (
            <div
              key={member.id}
              onClick={() => handleMemberClick(member)}
              className={`
                group relative bg-white rounded-3xl p-3 sm:p-4 border-4 sm:border-6
                transition-all duration-200 cursor-pointer text-center select-none
                ${isSelected || isCurrentVoice
                  ? 'border-purple-500 shadow-2xl scale-105 bg-purple-50'
                  : 'border-white hover:border-purple-300 shadow-chunky hover:scale-105'
                }
              `}
            >
              {/* Photo Area */}
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-purple-100 mb-3 flex items-center justify-center p-2 shadow-inner">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Name & Relation */}
              <h3 className="text-lg sm:text-xl font-extrabold font-myanmar text-slate-800 leading-tight">
                {member.name}
              </h3>
              <p className="text-xs sm:text-sm font-myanmar text-purple-600 font-semibold mt-0.5">
                ({member.relation})
              </p>

              {/* Sound indicator badge */}
              <div className="mt-2 flex justify-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReplayVoice(member);
                  }}
                  className={`
                    w-9 h-9 rounded-full flex items-center justify-center transition-all
                    ${isCurrentVoice
                      ? 'bg-purple-600 text-white animate-bounce'
                      : 'bg-purple-100 text-purple-700 group-hover:bg-purple-500 group-hover:text-white'
                    }
                  `}
                  title="အသံပြန်လည်နားထောင်မည်"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enlarged Inspection Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-sm bg-lime-300 rounded-3xl p-6 shadow-2xl border-8 border-white text-center animate-pop">
            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute -top-4 -right-4 w-11 h-11 bg-rose-500 hover:bg-rose-600 text-white rounded-full border-4 border-white shadow-lg flex items-center justify-center active:scale-95 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Member Photo */}
            <div className="w-48 h-48 mx-auto bg-white rounded-2xl p-3 shadow-md mb-4 flex items-center justify-center overflow-hidden border-4 border-lime-200">
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Member Name */}
            <h2 className="text-3xl font-extrabold font-myanmar text-slate-900 mb-1">
              {selectedMember.name}
            </h2>
            <p className="text-slate-700 font-myanmar font-semibold text-base mb-4">
              {selectedMember.relation}
            </p>

            {/* Audio Indicator */}
            <div className="flex justify-center mb-4">
              <AudioWave isPlaying={isVoicePlaying} />
            </div>

            {/* Replay Sound Button */}
            <KidButton
              variant="orange"
              size="lg"
              icon={<Volume2 className="w-6 h-6" />}
              onClick={() => handleReplayVoice(selectedMember)}
              className="w-full"
            >
              အသံပြန်နားထောင်မည်
            </KidButton>
          </div>
        </div>
      )}
    </div>
  );
};
