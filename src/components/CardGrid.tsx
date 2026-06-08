import { motion } from 'motion/react';
import React, { useState } from 'react';
import { Mail, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Reason } from '../data';

interface FlipCardProps {
  reason: Reason;
  index: number;
  onReveal: () => void;
}

const FlipCard: React.FC<FlipCardProps> = ({ reason, index, onReveal }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      onReveal();
      const origin = {
        x: Math.random() * 0.8 + 0.1,
        y: Math.random() * 0.8 + 0.1
      };
      confetti({
        particleCount: 30,
        spread: 60,
        origin,
        colors: ['#ff87ab', '#fbb1bd', '#fcd5ce'],
        disableForReducedMotion: true
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      className="perspective-1000 w-full aspect-[4/5] cursor-pointer group"
      onClick={handleFlip}
      whileHover={!isFlipped ? { scale: 1.02, y: -5 } : {}}
      whileTap={!isFlipped ? { scale: 0.98 } : {}}
    >
      <motion.div
        className="w-full h-full relative preserve-3d duration-700 shadow-xl rounded-2xl"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-white/10 backdrop-blur-sm border border-white/30 rounded-3xl p-2 sm:p-4 flex flex-col items-center justify-center text-center shadow-lg group-hover:bg-white/20 transition-all">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-pink-200/50 rounded-full flex items-center justify-center mb-2 sm:mb-4">
            <span className="text-pink-600 font-black text-xl md:text-2xl">{String(index + 1).padStart(2, '0')}</span>
          </div>
          <span className="text-slate-500 font-bold mb-1 sm:mb-2 text-xs sm:text-base">💌 Card</span>
          <p className="text-[10px] sm:text-sm font-bold text-pink-600 uppercase tracking-wider">Click to Reveal</p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white/40 backdrop-blur-xl border-2 border-white/60 rounded-3xl p-3 sm:p-6 flex flex-col items-center justify-center text-center shadow-[0_10px_30px_rgba(236,72,153,0.15)]">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="mb-2 sm:mb-4"
          >
            {/* Can use Heart or custom emoji, let's keep Mail but styled differently, or general placeholder emoji */}
            <span className="text-2xl md:text-4xl filter drop-shadow-md">💖</span>
          </motion.div>
          
          <p className="text-slate-800 text-sm sm:text-lg md:text-xl font-semibold leading-snug sm:leading-relaxed">
            {reason.text}
          </p>
          <span className="mt-2 sm:mt-4 px-2 sm:px-3 py-0.5 sm:py-1 bg-pink-100 text-pink-600 text-[10px] sm:text-xs rounded-full font-bold shadow-sm border border-pink-200">#{index + 1} REVEALED</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface CardGridProps {
  reasons: Reason[];
  onCardRevealed: () => void;
}

export const CardGrid: React.FC<CardGridProps> = ({ reasons, onCardRevealed }) => {
  return (
    <section id="cards" className="py-20 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8">
        {reasons.map((reason, index) => (
          <FlipCard 
            key={reason.id} 
            reason={reason} 
            index={index} 
            onReveal={onCardRevealed} 
          />
        ))}
      </div>
    </section>
  );
};
