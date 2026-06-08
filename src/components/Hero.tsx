import { motion } from 'motion/react';
import React from 'react';
import { Heart } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="max-w-2xl w-full p-6 sm:p-8 md:p-12 bg-white/30 backdrop-blur-xl border border-white/40 rounded-[2.5rem] shadow-xl flex flex-col justify-center items-center space-y-4 sm:space-y-6"
      >
        
        <p className="text-pink-600 font-medium tracking-wide uppercase text-xs sm:text-sm">To my favorite human</p>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 leading-tight">
          For someone who <br /> means a lot to me...
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed max-w-lg mb-6 sm:mb-8">
          Click the cards below and discover all the reasons why you're my absolute best friend in the world.
        </p>

        <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-white/80 backdrop-blur-md text-pink-600 font-bold rounded-2xl shadow-lg shadow-pink-200/50 hover:shadow-xl hover:bg-white transition-all border-b-4 border-pink-100 flex items-center space-x-2 relative"
        >
          <span>Start Revealing Memories</span>
          <span>✨</span>
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-pink-400/30"
            animate={{ scale: [1, 1.05, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      </motion.div>

      <motion.div 
        className="absolute bottom-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-[30px] h-[50px] rounded-full border-2 border-slate-400/50 flex justify-center p-2">
          <motion.div 
            className="w-2 h-2 bg-slate-400 rounded-full"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};
