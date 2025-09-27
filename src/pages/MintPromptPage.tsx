import React from 'react';
import { Link } from 'react-router-dom';

const MintPromptPage: React.FC = () => {
  return (
    <div
      className="h-screen flex flex-col items-center justify-center p-4 font-fredoka text-white 
                 bg-gradient-to-b from-sky-400 to-green-500 relative overflow-hidden"
    >
      <div className="text-center relative z-10 flex flex-col items-center">
        <img
          src="/logo.png"
          alt="Critter Hole Logo"
          className="w-4/5 max-w-md md:max-w-lg mb-4"
        />
        <p
          className="text-xl md:text-3xl text-white mb-8"
          style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.2)' }}
        >
          To play the game, you need hammers!
        </p>
        <Link to="/mint">
          <button className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 
                             text-white font-bold py-5 px-12 rounded-full text-3xl border-b-8 
                             border-blue-700 hover:border-blue-800 transition-all duration-150 
                             transform hover:scale-110">
            MINT HAMMER
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MintPromptPage;