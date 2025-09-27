import React from 'react';
import { useSwitchChain } from 'wagmi';
import { base } from 'wagmi/chains';

export const WrongNetworkPage: React.FC = () => {
  
  const { switchChain, isPending } = useSwitchChain();

  const handleSwitch = () => {
    
    switchChain({ chainId: base.id });
  };

  return (
    <div
      className="h-screen w-full flex flex-col items-center justify-center p-4 text-white"
      style={{ 
        backgroundImage: `url(/src/assets/game-bg.jpg)`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    >
      <div className="text-center bg-black/50 backdrop-blur-sm p-8 rounded-2xl border border-red-500/50">
        <h1 className="text-4xl font-bold text-red-400 mb-4">Wrong Network</h1>
        <p className="text-xl mb-8">
          This application only works on the Base Chain.
          <br />
          Please switch your network to continue.
        </p>
        <button
          onClick={handleSwitch}
          disabled={isPending}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full 
                     text-2xl border-b-8 border-orange-700 hover:border-orange-800 transition-all 
                     duration-150 transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isPending ? 'Check Wallet...' : 'Switch to Base'}
        </button>
      </div>
    </div>
  );
};