import React from 'react';
import { Link } from 'react-router-dom';
import { useHasHammerNft } from '../hooks/useHasHammerNft';

const HomePage: React.FC = () => {
  const { hasNft, isLoading } = useHasHammerNft();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center p-4 font-fredoka text-white bg-gradient-to-b from-sky-400 to-green-500">
        <p className="text-2xl">Checking your inventory...</p>
      </div>
    );
  }

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
          
          {hasNft ? "Whack as Many Critters as You Can!" : "To play the game, you need a Hammer NFT!"}
        </p>
        
        
        {hasNft ? (
          <Link to="/game">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-5 px-12 rounded-full 
                               text-3xl border-b-8 border-orange-700 hover:border-orange-800 transition-all 
                               duration-150 transform hover:scale-110">
              PLAY NOW!
            </button>
          </Link>
        ) : (
          <Link to="/exchange">
            <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-5 px-12 rounded-full 
                               text-3xl border-b-8 border-sky-700 hover:border-sky-800 transition-all 
                               duration-150 transform hover:scale-110">
              MINT HAMMER
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomePage;