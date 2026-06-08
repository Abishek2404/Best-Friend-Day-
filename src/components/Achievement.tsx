import { motion } from 'motion/react';
import React, { useEffect } from 'react';
import { Trophy, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Achievement: React.FC = () => {
  useEffect(() => {
    // Fireworks effect
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff87ab', '#fbb1bd', '#fcd5ce', '#ffffff']
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff87ab', '#fbb1bd', '#fcd5ce', '#ffffff']
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, type: "spring", bounce: 0.5 }}
      className="min-h-[50vh] flex items-center justify-center py-20 px-4 relative z-10"
    >
      <div className="relative">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-50px] border-[2px] border-dashed border-pink-400/30 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-25px] border-[1px] border-solid border-purple-400/40 rounded-full"
        />
        
        <div className="bg-white/40 backdrop-blur-2xl border border-white/60 p-10 rounded-[2.5rem] shadow-[0_20px_40px_rgba(236,72,153,0.15)] text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-pink-200/20 pointer-events-none" />
          
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="flex justify-center mb-6 relative"
          >
            <Trophy className="w-20 h-20 text-yellow-500 drop-shadow-lg" />
            <motion.div
              animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-4 -right-4"
            >
              <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
            </motion.div>
          </motion.div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2 uppercase tracking-tight">
            Achievement Unlocked
          </h2>
          
          <motion.div 
            className="mt-6 inline-block bg-white text-pink-500 border-2 border-pink-100 px-8 py-4 rounded-2xl shadow-lg"
            whileHover={{ scale: 1.05, shadow: "0 10px 25px rgba(236,72,153,0.2)" }}
          >
            <span className="font-bold text-xl md:text-2xl tracking-wider">
              BEST FRIEND FOREVER ❤️
            </span>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
