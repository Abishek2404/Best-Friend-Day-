import { motion } from 'motion/react';
import React from 'react';

interface ProgressTrackerProps {
  revealedCount: number;
  totalCount: number;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ revealedCount, totalCount }) => {
  const progress = (revealedCount / totalCount) * 100;
  const isComplete = revealedCount === totalCount;

  return (
    <div className="sticky top-4 z-50 px-4 w-full transition-all duration-300 max-w-4xl mx-auto">
      <nav className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 sm:px-6 sm:py-4 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl sm:rounded-[2rem] shadow-lg gap-2 sm:gap-4">
        <div className="flex items-center space-x-2">
          {isComplete ? (
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="text-pink-600 font-bold flex items-center gap-2 tracking-tight text-base sm:text-lg text-center"
            >
              🎉 Secret Message Unlocked!
            </motion.span>
          ) : (
            <>
              <span className="text-xl sm:text-2xl mr-2">❤️</span>
              <h1 className="font-bold text-slate-700 tracking-tight text-base sm:text-lg">Best Friend Day 2024</h1>
            </>
          )}
        </div>
        
        {!isComplete && (
          <div className="flex flex-col items-center sm:items-end w-full sm:w-auto">
            <div className="flex items-center space-x-3 mb-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Cards Revealed</span>
              <span className="text-lg font-bold text-pink-600">{revealedCount} / {totalCount}</span>
            </div>
            <div className="w-full sm:w-64 h-2 bg-white/50 rounded-full overflow-hidden border border-white/40 shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-400 to-purple-400"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};
