import React from 'react';

interface MusicToggleProps {
  playSignal?: boolean;
}

export const MusicToggle: React.FC<MusicToggleProps> = ({ playSignal }) => {
  return (
    <>
      {playSignal && (
        <iframe
          width="1"
          height="1"
          src="https://www.youtube.com/embed/RLQUkKZGhXY?autoplay=1&loop=1&playlist=RLQUkKZGhXY&controls=0&showinfo=0&rel=0"
          title="Background Music"
          allow="autoplay"
          className="fixed pointer-events-none opacity-0 select-none -z-50"
          style={{ width: 1, height: 1, left: -100, top: -100 }}
        />
      )}
    </>
  );
};

