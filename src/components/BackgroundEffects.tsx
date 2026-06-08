import { motion } from 'motion/react';
import React, { useEffect, useState } from 'react';

const Particle = ({ delay, duration, x, y, size }: any) => {
  return (
    <motion.div
      className="absolute bg-white/30 rounded-full"
      style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 0.8, 0],
        y: -100,
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

export const BackgroundEffects: React.FC = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100 + 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 bg-[#fbcfe8] bg-gradient-to-br from-[#fbcfe8] via-[#e9d5ff] to-[#bfdbfe]"
        initial={{ filter: "hue-rotate(0deg)" }}
        animate={{ filter: "hue-rotate(15deg)" }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
      {/* Glow blobs */}
      <div className="absolute top-10 left-10 w-32 h-32 md:w-64 md:h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse" />
      <div className="absolute bottom-20 right-20 w-48 h-48 md:w-[32rem] md:h-[32rem] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-[40rem] md:h-[40rem] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />

      {particles.map(p => (
        <Particle key={p.id} {...p} />
      ))}
    </div>
  );
};
