// src/pages/HomePage.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useHasHammerNft } from '../hooks/nft/useHasHammerNft';
import {IoArrowUpCircle, IoInformationCircle, IoGameController, IoPerson, IoSwapHorizontal } from 'react-icons/io5';

const HomePage: React.FC = () => {
  const { isConnected } = useAccount();
  const { hasNft, isLoading } = useHasHammerNft();
  const navigate = useNavigate();

  const handlePlayClick = () => {
    if (!isConnected) {
      alert("Please connect your wallet first.");
      return;
    }
    
    if (isLoading) {
      return;
    }

    if (hasNft) {
      navigate('/game');
    } else {
      alert("You need a Hammer NFT to play!");
      navigate('/mint');
    }
  };

  return (
    <div
      className="h-screen flex flex-col items-center justify-center p-4 font-fredoka text-white 
                 bg-gradient-to-b from-sky-400 to-green-500 relative overflow-hidden"
    >
      <div className="absolute top-5 right-5 z-20">
        <appkit-button />
      </div>
      

      <div className="text-center relative z-10 flex flex-col items-center">
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.2)' }}>
          Welcome on CritterHoles!
        </h1>
        
        <img
          src="/logo.png"
          alt="Critter Hole Logo"
          className="w-4/5 max-w-md md:max-w-lg mb-8"
        />
        
        <div className="flex gap-4 md:gap-8">
          
          <Link to="/info" className="flex flex-col items-center p-4 bg-black/20 rounded-lg transform transition-all hover:scale-110">
            <IoInformationCircle size={40} className="text-cyan-300" />
            <span className="mt-2 font-bold">Info</span>
          </Link>

          <button 
            onClick={handlePlayClick} 
            disabled={isLoading}
            className="flex flex-col items-center p-4 bg-black/20  rounded-lg transform transition-all hover:scale-110"
          >
            <IoGameController size={40} className="text-white" />
            <span className="mt-2 font-bold">{isLoading ? "Checking..." : "Play"}</span>
          </button>
          
          {hasNft && (
                <Link to="/upgrade" className="flex flex-col items-center p-4 bg-black/20 rounded-lg transform transition-all hover:scale-110">
                    <IoArrowUpCircle size={40} className="text-purple-300" />
                    <span className="mt-2 font-bold">Upgrade</span>
                </Link>
            )}

          <Link to="/swap" className="flex flex-col items-center p-4 bg-black/20 rounded-lg transform transition-all hover:scale-110">
            <IoSwapHorizontal size={40} className="text-green-300" />
            <span className="mt-2 font-bold">Swap</span>
          </Link>

          <Link to="/user" className="flex flex-col items-center p-4 bg-black/20 rounded-lg transform transition-all hover:scale-110">
            <IoPerson size={40} className="text-yellow-300" />
            <span className="mt-2 font-bold">User</span>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default HomePage;