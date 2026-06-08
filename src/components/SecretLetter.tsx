import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { Heart, MailOpen } from 'lucide-react';

interface SecretLetterProps {
  onRead: () => void;
}

export const SecretLetter: React.FC<SecretLetterProps> = ({ onRead }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRead, setIsRead] = useState(false);

  const letterText = `Dear Best Friend,

Thank you for being part of my life.

Some people come and go, but a true best friend stays.

No matter where life takes us, I hope our friendship continues for many years to come.

Happy Best Friend Day ❤️`;

  const handleOpen = () => {
    setIsOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const charVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen flex items-center justify-center py-20 px-4 relative z-10"
    >
      <div className="max-w-2xl w-full">
        {!isOpen ? (
          <motion.div 
            className="cursor-pointer group flex flex-col items-center"
            onClick={handleOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="w-64 h-48 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/60 flex items-center justify-center shadow-xl group-hover:shadow-[0_20px_40px_rgba(236,72,153,0.2)] transition-all">
                <MailOpen className="w-20 h-20 text-pink-500 group-hover:text-pink-600 transition-colors drop-shadow-sm" />
              </div>
              <motion.div 
                className="absolute -top-4 -right-4 bg-pink-500 rounded-full p-3 shadow-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-6 h-6 text-white fill-white" />
              </motion.div>
            </motion.div>
            <p className="text-slate-600 font-bold mt-8 text-sm tracking-widest uppercase group-hover:text-pink-600 transition-all">
              Tap to open envelope
            </p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/50 p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-r from-red-200 via-pink-200 to-red-200 transform origin-left shadow-sm" />
            <div className="absolute top-0 w-full h-8 flex justify-between px-4 opacity-30">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="w-1 h-full bg-red-400" />
              ))}
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              onAnimationComplete={() => {
                setIsRead(true);
                onRead();
              }}
              className="mt-8 relative z-10"
            >
              {letterText.split('\n').map((line, lineIndex) => (
                <div key={lineIndex} className="min-h-[1.5rem] mb-4">
                  {line.split('').map((char, charIndex) => (
                    <motion.span
                      key={`${lineIndex}-${charIndex}`}
                      variants={charVariants}
                      className="text-gray-800 text-lg md:text-xl font-medium font-sans leading-relaxed"
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
              ))}
            </motion.div>

            {isRead && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-12 flex justify-end"
              >
                <Heart className="w-12 h-12 text-pink-500 fill-pink-500 opacity-80" />
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};
