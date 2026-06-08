import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BackgroundEffects } from './components/BackgroundEffects';
import { Hero } from './components/Hero';
import { CardGrid } from './components/CardGrid';
import { ProgressTracker } from './components/ProgressTracker';
import { SecretLetter } from './components/SecretLetter';
import { Achievement } from './components/Achievement';
import { MusicToggle } from './components/MusicToggle';
import { reasons } from './data';
import confetti from 'canvas-confetti';

export default function App() {
  const [started, setStarted] = useState(false);
  const [playMusic, setPlayMusic] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [isLetterRead, setIsLetterRead] = useState(false);

  const totalCards = reasons.length;
  const isAllCardsRevealed = revealedCount === totalCards;

  const handleStart = () => {
    setStarted(true);
    setPlayMusic(true);
    setTimeout(() => {
      document.getElementById('cards')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCardRevealed = () => {
    setRevealedCount(prev => {
      const newCount = prev + 1;
      if (newCount === totalCards) {
        // Trigger massive celebration when all are reversed
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
          confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ffc0cb', '#ffb6c1', '#ffc0cb']
          });
          confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#dda0dd', '#ee82ee', '#da70d6']
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };
        frame();
        
        setTimeout(() => {
          document.getElementById('secret-letter')?.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
      }
      return newCount;
    });
  };

  return (
    <div className="min-h-screen text-slate-800 font-sans selection:bg-pink-300/30 overflow-x-hidden">
      <BackgroundEffects />
      <MusicToggle playSignal={playMusic} />
      
      <main>
        <AnimatePresence>
          {!started && (
            <motion.div exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }}>
              <Hero onStart={handleStart} />
            </motion.div>
          )}
        </AnimatePresence>

        {started && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ProgressTracker revealedCount={revealedCount} totalCount={totalCards} />
            
            <CardGrid reasons={reasons} onCardRevealed={handleCardRevealed} />

            {isAllCardsRevealed && !isLetterRead && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                id="secret-letter"
              >
                <SecretLetter onRead={() => {
                  setIsLetterRead(true);
                  setTimeout(() => {
                    document.getElementById('achievement')?.scrollIntoView({ behavior: 'smooth' });
                  }, 500);
                }} />
              </motion.div>
            )}

            {isLetterRead && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                id="achievement"
              >
                <Achievement />
              </motion.div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
}
