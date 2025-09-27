import React, { useState, useEffect } from 'react';
import hammerImg from '/src/assets/hammer.png';

const Hammer: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isSnapped, setIsSnapped] = useState(false);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      setPosition({ x: touch.clientX, y: touch.clientY });
    };

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const snap = () => {
      setIsSnapped(true);
      setTimeout(() => setIsSnapped(false), 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    window.addEventListener('mousedown', snap);
    window.addEventListener('touchstart', snap, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mousedown', snap);
      window.removeEventListener('touchstart', snap);
    };
  }, []);

  return (
    <img
      src={hammerImg}
      alt="Hammer"
      className={`h-32 fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ${isSnapped ? '-rotate-45' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
};

export default Hammer;