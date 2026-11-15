import React, { useState, useEffect, useRef } from 'react';
import { quizQuestions } from '../data/quizData';
import { QuizQuestion, Dialect } from '../types';
import { useSound } from '../context/SoundContext';
import { Volume2, RotateCcw, Star, Trophy, ArrowLeft, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { KidButton } from '../components/KidButton';
import confetti from 'canvas-confetti';

type QuizLevel = 'easy' | 'hard';
type QuizStep = 'level-select' | 'dialect-select' | 'playing' | 'trophy-modal';

export const QuizView: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const { dialect, setDialect, playVoice, stopVoice, playSfx, isVoicePlaying, trophies, addTrophy } = useSound();

  const [step, setStep] = useState<QuizStep>('level-select');
  const [level, setLevel] = useState<QuizLevel>('easy');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);
  const [stars, setStars] = useState<number>(0);
  const [isAnswerChecking, setIsAnswerChecking] = useState<boolean>(false);
  const [lastSelectedOption, setLastSelectedOption] = useState<string | null>(null);
  const [wrongOption, setWrongOption] = useState<string | null>(null);

  const bgAudioRef = useRef<HTMLAudioElement | null>(null);

  // Background music management for quiz
  useEffect(() => {
    try {
      const bgAudio = new Audio('/sounds/background_music.wav');
      bgAudio.loop = true;
      bgAudio.volume = 0.25;
      bgAudioRef.current = bgAudio;
      bgAudio.play().catch(() => {});
    } catch {}

    return () => {
      if (bgAudioRef.current) {
        bgAudioRef.current.pause();
        bgAudioRef.current = null;
      }
      stopVoice();
    };
  }, []);

  // Shuffle question pool on start
  useEffect(() => {
    const indices = Array.from({ length: quizQuestions.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setShuffledIndices(indices);
    setCurrentQuestionIndex(0);
  }, []);

  const currentQuestion: QuizQuestion | undefined =
    shuffledIndices.length > 0 ? quizQuestions[shuffledIndices[currentQuestionIndex % shuffledIndices.length]] : undefined;

  const burmeseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextQuestionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopAllAudio = () => {
    if (burmeseTimerRef.current) {
      clearTimeout(burmeseTimerRef.current);
      burmeseTimerRef.current = null;
    }
    if (nextQuestionTimerRef.current) {
      clearTimeout(nextQuestionTimerRef.current);
      nextQuestionTimerRef.current = null;
    }
    stopVoice();
  };

  // Play audio for question (accepts explicit question to prevent stale closure)
  const playQuestionAudio = (questionToPlay?: QuizQuestion) => {
    const q = (questionToPlay && 'pow' in questionToPlay) ? questionToPlay : currentQuestion;
    if (!q) return;

    stopAllAudio();

    const karenAudioUrl = dialect === 'sakaw' ? q.sakaw : q.pow;

    if (level === 'easy') {
      // Easy: Karen first, then Burmese
      playVoice(karenAudioUrl, () => {
        burmeseTimerRef.current = setTimeout(() => {
          if (q.burmese) {
            playVoice(q.burmese);
          }
        }, 250);
      });
    } else {
      // Hard: Karen only
      playVoice(karenAudioUrl);
    }
  };

  // Start question
  const handleSelectLevel = (selectedLevel: QuizLevel) => {
    setLevel(selectedLevel);
    playSfx('click');
    setStep('dialect-select');
  };

  const handleSelectDialect = (selectedDialect: Dialect) => {
    setDialect(selectedDialect);
    playSfx('click');
    setStep('playing');
    const firstQ = shuffledIndices.length > 0 ? quizQuestions[shuffledIndices[0]] : undefined;
    // Prompt audio shortly after opening
    setTimeout(() => {
      playQuestionAudio(firstQ);
    }, 400);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const triggerTrophyConfetti = () => {
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#FFA500', '#FF4500'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD700', '#FFA500', '#FF4500'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleOptionClick = (optionSrc: string) => {
    if (!currentQuestion || isAnswerChecking) return;

    setLastSelectedOption(optionSrc);
    setIsAnswerChecking(true);

    const isCorrect = optionSrc === currentQuestion.correct;

    if (isCorrect) {
      stopAllAudio();
      playSfx('correct');
      setWrongOption(null);
      triggerConfetti();

      const nextStars = stars + 1;
      setStars(nextStars);

      if (nextStars >= 3) {
        // Won a trophy!
        setTimeout(() => {
          playSfx('yayy');
          triggerTrophyConfetti();
          addTrophy();
          setStep('trophy-modal');
          setIsAnswerChecking(false);
        }, 1000);
      } else {
        // Next question
        nextQuestionTimerRef.current = setTimeout(() => {
          stopAllAudio();
          setLastSelectedOption(null);
          setIsAnswerChecking(false);

          const nextIndex = (currentQuestionIndex + 1) % shuffledIndices.length;
          setCurrentQuestionIndex(nextIndex);

          const nextQ = quizQuestions[shuffledIndices[nextIndex]];
          playQuestionAudio(nextQ);
        }, 1200);
      }
    } else {
      playSfx('ohno');
      setWrongOption(optionSrc);
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(200);
      }

      setTimeout(() => {
        setIsAnswerChecking(false);
      }, 1000);
    }
  };

  const handleContinueAfterTrophy = () => {
    stopAllAudio();
    setStars(0);
    setLastSelectedOption(null);
    setWrongOption(null);
    setStep('playing');

    const nextIndex = (currentQuestionIndex + 1) % shuffledIndices.length;
    setCurrentQuestionIndex(nextIndex);

    const nextQ = quizQuestions[shuffledIndices[nextIndex]];
    setTimeout(() => {
      playQuestionAudio(nextQ);
    }, 300);
  };

  return (
    <div className="relative min-h-[calc(100vh-70px)] w-full py-6 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col justify-between">
      {/* Top Header Bar with Stars & Trophy Score */}
      <div className="flex items-center justify-between bg-white/90 backdrop-blur px-4 py-3 rounded-2xl border-4 border-amber-300 shadow-sm mb-6">
        <button
          onClick={() => {
            if (step === 'playing') setStep('dialect-select');
            else if (step === 'dialect-select') setStep('level-select');
            else onExit();
          }}
          className="flex items-center gap-1.5 text-amber-800 font-bold font-myanmar hover:text-amber-950 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>နောက်သို့</span>
        </button>

        {/* Stars Progress (0 to 3) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {[1, 2, 3].map(starIndex => (
            <Star
              key={starIndex}
              className={`w-6 h-6 sm:w-8 sm:h-8 transition-all ${
                stars >= starIndex
                  ? 'text-yellow-400 fill-yellow-400 scale-110 drop-shadow-md animate-pop'
                  : 'text-slate-300 fill-slate-100'
              }`}
            />
          ))}
        </div>

        {/* Trophies badge */}
        <div className="flex items-center gap-1.5 bg-amber-100 px-3 py-1 rounded-xl border border-amber-300 text-amber-900 font-bold text-sm sm:text-base">
          <Trophy className="w-5 h-5 text-amber-500 fill-amber-400" />
          <span>{trophies}</span>
        </div>
      </div>

      {/* STEP 1: Level Selection Screen */}
      {step === 'level-select' && (
        <div className="my-auto text-center space-y-8 animate-fadeIn">
          <div>
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-800 font-bold px-4 py-1.5 rounded-full border border-rose-300 text-sm mb-2">
              <Sparkles className="w-4 h-4 text-rose-600" />
              <span>Quiz ကစားရန် အဆင့်ရွေးချယ်ပါ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-myanmar text-amber-950">
              အဆင့် (Difficulty) ရွေးချယ်ပါ
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            {/* Easy Mode */}
            <div
              onClick={() => handleSelectLevel('easy')}
              className="group bg-gradient-to-b from-emerald-400 to-green-500 hover:from-emerald-300 hover:to-green-400 text-white rounded-3xl p-6 border-6 border-white shadow-play-green hover:scale-105 transition-all cursor-pointer flex flex-col items-center justify-between min-h-[260px]"
            >
              <img
                src="/desktop_images/easy.webp"
                alt="Easy Level"
                className="w-24 h-24 object-contain group-hover:rotate-6 transition-transform"
              />
              <div className="space-y-1">
                <span className="text-sm font-bold bg-white/30 px-3 py-1 rounded-full">
                  ကရင်အသံ + ဗမာအသံ
                </span>
                <h3 className="text-3xl font-black font-myanmar">လွယ်ကူ</h3>
              </div>
            </div>

            {/* Hard Mode */}
            <div
              onClick={() => handleSelectLevel('hard')}
              className="group bg-gradient-to-b from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white rounded-3xl p-6 border-6 border-white shadow-play-pink hover:scale-105 transition-all cursor-pointer flex flex-col items-center justify-between min-h-[260px]"
            >
              <img
                src="/desktop_images/logo.webp"
                alt="Hard Level"
                className="w-24 h-24 object-contain group-hover:rotate-6 transition-transform"
              />
              <div className="space-y-1">
                <span className="text-sm font-bold bg-white/30 px-3 py-1 rounded-full">
                  ကရင်အသံ သီးသန့်
                </span>
                <h3 className="text-3xl font-black font-myanmar">နည်းနည်းခက်</h3>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Dialect Selection Screen */}
      {step === 'dialect-select' && (
        <div className="my-auto text-center space-y-8 animate-fadeIn">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black font-myanmar text-amber-950">
              ကရင်ဘာသာစကား အသံထွက်ရွေးပါ
            </h2>
            <p className="text-slate-600 font-myanmar mt-2">
              မည်သည့် ကရင်အသံထွက်ဖြင့် Quiz မေးခွန်းများ ဖြေဆိုလိုပါသလဲ?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto">
            <button
              onClick={() => handleSelectDialect('pow')}
              className="bg-gradient-to-b from-amber-400 to-orange-500 text-white font-myanmar font-black text-2xl sm:text-3xl py-8 px-6 rounded-3xl border-6 border-white shadow-play-orange hover:scale-105 active:scale-95 transition-all cursor-pointer flex flex-col items-center gap-3"
            >
              <span className="text-4xl">🌻</span>
              <span>ပိုးကရင်</span>
              <span className="text-xs font-normal opacity-90">Pwo Karen Pronunciation</span>
            </button>

            <button
              onClick={() => handleSelectDialect('sakaw')}
              className="bg-gradient-to-b from-teal-400 to-emerald-600 text-white font-myanmar font-black text-2xl sm:text-3xl py-8 px-6 rounded-3xl border-6 border-white shadow-play-green hover:scale-105 active:scale-95 transition-all cursor-pointer flex flex-col items-center gap-3"
            >
              <span className="text-4xl">🌿</span>
              <span>စကောကရင်</span>
              <span className="text-xs font-normal opacity-90">S'gaw Karen Pronunciation</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Active Question Screen */}
      {step === 'playing' && currentQuestion && (
        <div className="my-auto space-y-6 animate-fadeIn">
          {/* Audio Prompt Player Button */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center">
              <button
                onClick={() => playQuestionAudio()}
                className={`
                  w-24 h-24 sm:w-28 sm:h-28 rounded-full border-6 border-white shadow-2xl flex items-center justify-center transition-all cursor-pointer
                  ${isVoicePlaying
                    ? 'bg-amber-500 text-white animate-bounce-gentle scale-110 shadow-amber-300'
                    : 'bg-gradient-to-b from-amber-400 to-orange-500 text-white hover:scale-105 shadow-play-orange'
                  }
                `}
                title="အသံထပ်မံနားထောင်မည်"
              >
                <Volume2 className="w-12 h-12 stroke-[2.5]" />
              </button>
            </div>

            <div>
              <p className="font-myanmar font-extrabold text-xl sm:text-2xl text-amber-950">
                {isVoicePlaying ? 'အသံကို သေချာနားထောင်ပါ...' : 'အသံနားထောင်ရန် အဝါရောင်ခလုတ်ကို နှိပ်ပါ'}
              </p>
              <span className="text-xs sm:text-sm font-semibold text-slate-500">
                ({dialect === 'pow' ? 'ပိုးကရင်' : 'စကောကရင်'} အသံထွက်)
              </span>
            </div>
          </div>

          {/* 3 Choices Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto pt-4">
            {[
              { src: currentQuestion.image1, id: 'opt1' },
              { src: currentQuestion.image2, id: 'opt2' },
              { src: currentQuestion.image3, id: 'opt3' },
            ].map(opt => {
              const isSelected = lastSelectedOption === opt.src;
              const isWrong = wrongOption === opt.src;

              return (
                <button
                  key={opt.id}
                  disabled={isAnswerChecking}
                  onClick={() => handleOptionClick(opt.src)}
                  className={`
                    group relative aspect-square bg-white rounded-3xl p-4 border-6 transition-all duration-200 cursor-pointer flex items-center justify-center shadow-chunky
                    ${isSelected && !isWrong ? 'border-emerald-500 bg-emerald-50 scale-105 ring-4 ring-emerald-300' : ''}
                    ${isWrong ? 'border-rose-500 bg-rose-50 animate-shake ring-4 ring-rose-300' : ''}
                    ${!isSelected && !isWrong ? 'border-white hover:border-amber-300 hover:scale-105' : ''}
                  `}
                >
                  <img
                    src={opt.src}
                    alt="Quiz Option"
                    className="max-w-[80%] max-h-[80%] object-contain group-hover:scale-110 transition-transform"
                  />

                  {/* Visual Feedback Badges */}
                  {isSelected && !isWrong && (
                    <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-1.5 shadow animate-pop">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                  )}

                  {isWrong && (
                    <div className="absolute top-2 right-2 bg-rose-500 text-white rounded-full p-1.5 shadow animate-pop">
                      <XCircle className="w-7 h-7" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Replay Sound CTA */}
          <div className="text-center pt-2">
            <button
              onClick={() => playQuestionAudio()}
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-amber-800 font-myanmar text-sm sm:text-base font-bold underline cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>အသံပြန်လည်နားထောင်လိုပါက နှိပ်ပါ</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Trophy Celebration Modal */}
      {step === 'trophy-modal' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-gradient-to-b from-amber-200 via-white to-amber-100 rounded-3xl p-8 shadow-2xl border-8 border-amber-400 text-center animate-pop space-y-5">
            <div className="w-24 h-24 mx-auto bg-amber-400 text-amber-950 rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-bounce">
              <Trophy className="w-14 h-14 text-white fill-amber-300" />
            </div>

            <div>
              <span className="text-amber-600 font-black text-sm uppercase tracking-wider">
                ဂုဏ်ယူပါတယ်!
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-myanmar text-amber-950 mt-1">
                ရွှေဖလား ရရှိပါပြီ! 🏆
              </h2>
              <p className="text-slate-600 font-myanmar text-sm sm:text-base mt-2">
                ကြိုးစားမှုကြောင့် နောက်ထပ် ရွှေဖလားတစ်လုံး ထပ်မံရရှိခဲ့ပါပြီ။ ဆက်လက်ဖြေဆိုမလား?
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <KidButton
                variant="white"
                size="md"
                onClick={onExit}
                className="w-full"
              >
                ပြီးပါပြီ
              </KidButton>

              <KidButton
                variant="green"
                size="md"
                onClick={handleContinueAfterTrophy}
                className="w-full"
              >
                ဆက်လက်ကစားမည်
              </KidButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
