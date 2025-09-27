import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoInformationCircle, IoGameController, IoTrophy } from 'react-icons/io5';

const BottomNav: React.FC = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
      isActive ? 'text-yellow-300 scale-110' : 'text-white/70 hover:text-white'
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-black/30 backdrop-blur-lg border-t border-white/10 z-50">
      <div className="w-full h-full max-w-lg mx-auto flex justify-around items-center">
        
        <NavLink to="/info" className={navLinkClass}>
          <IoInformationCircle size={28} />
          <span className="text-xs font-bold">Info</span>
        </NavLink>

        <NavLink to="/game" className={navLinkClass}>
          <IoGameController size={32} />
          <span className="text-xs font-bold">Game</span>
        </NavLink>
        

        <NavLink to="/leaderboard" className={navLinkClass}>
          <IoTrophy size={28} />
          <span className="text-xs font-bold">Ranks</span>
        </NavLink>
        
      </div>
    </nav>
  );
};

export default BottomNav;