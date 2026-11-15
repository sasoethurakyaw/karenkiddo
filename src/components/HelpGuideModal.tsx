import React from 'react';
import { ThumbsUp, X } from 'lucide-react';
import { KidButton } from './KidButton';

interface HelpGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  guideImage: string;
  title: string;
  description?: string;
}

export const HelpGuideModal: React.FC<HelpGuideModalProps> = ({
  isOpen,
  onClose,
  guideImage,
  title,
  description,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border-8 border-amber-300 transform animate-pop flex flex-col items-center text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-11 h-11 bg-rose-500 hover:bg-rose-600 text-white rounded-full border-4 border-white shadow-lg flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
          aria-label="Close guide"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold font-myanmar text-amber-900 mb-2">
          {title}
        </h2>
        {description && (
          <p className="text-slate-600 text-sm sm:text-base font-myanmar mb-4">
            {description}
          </p>
        )}

        {/* Guide graphic illustration */}
        <div className="w-full bg-amber-50 rounded-2xl p-2 sm:p-4 mb-5 border-2 border-amber-200 flex items-center justify-center max-h-[50vh] overflow-hidden">
          <img
            src={guideImage}
            alt="Guide Illustration"
            className="max-h-[40vh] w-auto object-contain rounded-xl drop-shadow"
          />
        </div>

        {/* Got It Button */}
        <KidButton
          variant="green"
          size="lg"
          icon={<ThumbsUp className="w-6 h-6" />}
          onClick={onClose}
          className="w-full sm:w-auto"
        >
          နားလည်ပါပြီ (စတင်မည်)
        </KidButton>
      </div>
    </div>
  );
};
