import React, { useState } from 'react';
import { SoundProvider } from './context/SoundContext';
import { Screen } from './types';
import { Navbar } from './components/Navbar';
import { HomeView } from './views/HomeView';
import { CategoryHubView } from './views/CategoryHubView';
import { FamilyView } from './views/FamilyView';
import { FoodView } from './views/FoodView';
import { AnimalView } from './views/AnimalView';
import { BodyView } from './views/BodyView';
import { NumbersView } from './views/NumbersView';
import { QuizView } from './views/QuizView';
import { VerbsView } from './views/VerbsView';
import { CreditsView } from './views/CreditsView';

const screenTitles: Record<Screen, string> = {
  home: 'ပင်မစာမျက်နှာ',
  categories: 'ကဏ္ဍများ',
  family: 'မိသားစု',
  food: 'အစားအစာ',
  animal: 'တိရစ္ဆာန်များ',
  body: 'ခန္ဓာကိုယ်',
  number: 'အရေအတွက်',
  quiz: 'Quiz ဂိမ်း',
  verbs: 'လှုပ်ရှားမှုများ',
  credits: 'ဂုဏ်ပြုမှတ်တမ်း',
};

export const AppContent: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBEB] text-slate-800 font-myanmar selection:bg-amber-300">
      {/* Top Navigation Bar */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        title={screenTitles[currentScreen]}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full">
        {currentScreen === 'home' && <HomeView onNavigate={handleNavigate} />}
        {currentScreen === 'categories' && <CategoryHubView onNavigate={handleNavigate} />}
        {currentScreen === 'family' && <FamilyView />}
        {currentScreen === 'food' && <FoodView />}
        {currentScreen === 'animal' && <AnimalView />}
        {currentScreen === 'body' && <BodyView />}
        {currentScreen === 'number' && <NumbersView />}
        {currentScreen === 'quiz' && <QuizView onExit={() => handleNavigate('categories')} />}
        {currentScreen === 'verbs' && <VerbsView />}
        {currentScreen === 'credits' && <CreditsView onBack={() => handleNavigate('home')} />}
      </main>

      {/* Footer with Credits Link */}
      <footer className="w-full bg-white/85 border-t border-amber-200/80 py-4 px-4 text-center text-xs sm:text-sm text-slate-500 font-myanmar flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto gap-2">
        <p>Karen Kiddo | ကရင်လေးတို့အတွက် ပျော်စရာ ဘာသာစကားသင်ယူရာ</p>
        <button
          onClick={() => handleNavigate('credits')}
          className="text-amber-800 hover:text-amber-950 font-bold underline hover:no-underline cursor-pointer transition-colors"
        >
          ❤️ ဖန်တီးပံ့ပိုးသူများ ဂုဏ်ပြုမှတ်တမ်း (Credits)
        </button>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <SoundProvider>
      <AppContent />
    </SoundProvider>
  );
};

export default App;
