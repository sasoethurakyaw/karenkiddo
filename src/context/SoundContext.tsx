import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Dialect } from '../types';

interface SoundContextType {
  dialect: Dialect;
  setDialect: (dialect: Dialect) => void;
  playVoice: (url: string, onEnd?: () => void) => void;
  stopVoice: () => void;
  isVoicePlaying: boolean;
  activeVoiceUrl: string | null;
  playSfx: (sound: 'click' | 'content' | 'correct' | 'ohno' | 'yayy' | string) => void;
  bgMusicEnabled: boolean;
  toggleBgMusic: () => void;
  trophies: number;
  addTrophy: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dialect, setDialectState] = useState<Dialect>(() => {
    const saved = localStorage.getItem('karenkiddo_dialect');
    return (saved === 'sakaw' || saved === 'pow') ? saved : 'pow';
  });

  const [bgMusicEnabled, setBgMusicEnabled] = useState<boolean>(() => {
    return localStorage.getItem('karenkiddo_music') !== 'false';
  });

  const [trophies, setTrophies] = useState<number>(() => {
    const saved = localStorage.getItem('cups');
    return saved ? parseInt(saved, 10) || 0 : 0;
  });

  const [isVoicePlaying, setIsVoicePlaying] = useState<boolean>(false);
  const [activeVoiceUrl, setActiveVoiceUrl] = useState<string | null>(null);

  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);

  const setDialect = (newDialect: Dialect) => {
    setDialectState(newDialect);
    localStorage.setItem('karenkiddo_dialect', newDialect);
    playSfx('click');
  };

  const addTrophy = () => {
    setTrophies(prev => {
      const next = prev + 1;
      localStorage.setItem('cups', next.toString());
      return next;
    });
  };

  const playSfx = (sound: 'click' | 'content' | 'correct' | 'ohno' | 'yayy' | string) => {
    let src = sound;
    if (sound === 'click') src = '/sounds/button_click.wav';
    else if (sound === 'content') src = '/sounds/content_click.wav';
    else if (sound === 'correct') src = '/sounds/correct.mp3';
    else if (sound === 'ohno') src = '/sounds/ohno.mp3';
    else if (sound === 'yayy') src = '/sounds/yayy.wav';

    try {
      const sfx = new Audio(src);
      sfx.volume = sound === 'ohno' ? 0.6 : 0.7;
      sfx.play().catch(e => {
        console.warn('SFX playback error:', e);
      });
    } catch (err) {
      console.warn('SFX audio init failed:', err);
    }
  };

  const stopVoice = () => {
    if (voiceAudioRef.current) {
      voiceAudioRef.current.pause();
      voiceAudioRef.current.currentTime = 0;
      voiceAudioRef.current = null;
    }
    setIsVoicePlaying(false);
    setActiveVoiceUrl(null);
  };

  const playVoice = (url: string, onEnd?: () => void) => {
    if (!url) return;
    stopVoice();

    // Ensure leading slash
    const audioUrl = url.startsWith('/') ? url : `/${url}`;

    try {
      const audio = new Audio(audioUrl);
      voiceAudioRef.current = audio;
      setIsVoicePlaying(true);
      setActiveVoiceUrl(url);

      audio.onended = () => {
        setIsVoicePlaying(false);
        setActiveVoiceUrl(null);
        if (onEnd) onEnd();
      };

      audio.onerror = () => {
        setIsVoicePlaying(false);
        setActiveVoiceUrl(null);
        console.warn('Voice playback failed for url:', audioUrl);
      };

      audio.play().catch(err => {
        setIsVoicePlaying(false);
        setActiveVoiceUrl(null);
        console.warn('Autoplay or voice play error:', err);
      });
    } catch (err) {
      console.warn('Audio construction error:', err);
      setIsVoicePlaying(false);
      setActiveVoiceUrl(null);
    }
  };

  const toggleBgMusic = () => {
    setBgMusicEnabled(prev => {
      const next = !prev;
      localStorage.setItem('karenkiddo_music', next.toString());
      if (!next && bgAudioRef.current) {
        bgAudioRef.current.pause();
      } else if (next && bgAudioRef.current) {
        bgAudioRef.current.play().catch(() => {});
      }
      return next;
    });
  };

  return (
    <SoundContext.Provider
      value={{
        dialect,
        setDialect,
        playVoice,
        stopVoice,
        isVoicePlaying,
        activeVoiceUrl,
        playSfx,
        bgMusicEnabled,
        toggleBgMusic,
        trophies,
        addTrophy,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
