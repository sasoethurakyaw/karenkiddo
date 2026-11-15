import React from 'react';
import { useSound } from '../context/SoundContext';

interface KidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'orange' | 'green' | 'blue' | 'yellow' | 'pink' | 'purple' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  children?: React.ReactNode;
  soundType?: 'click' | 'content' | 'none';
}

export const KidButton: React.FC<KidButtonProps> = ({
  variant = 'orange',
  size = 'md',
  icon,
  children,
  soundType = 'click',
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  const { playSfx } = useSound();

  const variantStyles = {
    orange: 'bg-gradient-to-b from-amber-400 to-orange-500 text-white shadow-play-orange border-amber-300',
    green: 'bg-gradient-to-b from-emerald-400 to-green-600 text-white shadow-play-green border-emerald-300',
    blue: 'bg-gradient-to-b from-sky-400 to-blue-600 text-white shadow-play-blue border-sky-300',
    yellow: 'bg-gradient-to-b from-yellow-300 to-amber-400 text-amber-950 shadow-play-yellow border-yellow-200',
    pink: 'bg-gradient-to-b from-pink-400 to-rose-500 text-white shadow-play-pink border-pink-300',
    purple: 'bg-gradient-to-b from-purple-400 to-indigo-600 text-white shadow-play-purple border-purple-300',
    white: 'bg-white text-slate-800 shadow-[0_6px_0_#CBD5E1] border-slate-100 hover:bg-slate-50',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm rounded-xl border-2 gap-1.5',
    md: 'px-5 py-2.5 text-base sm:text-lg rounded-2xl border-4 gap-2',
    lg: 'px-7 py-3.5 text-lg sm:text-xl rounded-2xl border-4 gap-3 font-bold',
    xl: 'px-8 py-5 text-xl sm:text-2xl rounded-3xl border-4 gap-4 font-bold',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && soundType !== 'none') {
      playSfx(soundType);
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        relative inline-flex items-center justify-center
        font-myanmar font-bold transition-all duration-150 select-none
        active:translate-y-1.5 active:shadow-none
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        cursor-pointer
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
