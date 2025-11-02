// src/pages/UserPage.tsx

import React from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { useFarcasterAccount } from '../hooks/useFarcasterAccount';
import { chpContractAddress, chpContractAbi } from '../config/chp';
import gameBg from '/src/assets/game-bg.jpg';
import { Link } from 'react-router-dom';

export const UserPage: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { data: farcasterAccount } = useFarcasterAccount(isConnected);

  const { data: chpBalance, isLoading: isBalanceLoading } = useReadContract({
    address: chpContractAddress,
    abi: chpContractAbi,
    functionName: 'balanceOf',
    args: [address!],
    query: {
      enabled: isConnected && !!address,
      refetchInterval: 10000,
    }
  });

  

  return (
    <div
      className="h-screen w-full flex flex-col items-center justify-center p-4 text-white"
      style={{
        backgroundImage: `url(${gameBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="relative flex flex-col items-center bg-black/50 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/20 w-full max-w-md">
        
       
        <Link to="/game" className="absolute top-4 right-4 text-2xl text-white/50 hover:text-white transition-colors">
          &times;
        </Link>

        
        <img
          src={farcasterAccount?.pfpUrl || '/pfp.png'}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-2 border-white mb-4 shadow-lg"
        />

        <h1 className="text-3xl font-bold mb-1">
          {farcasterAccount?.username ? `@${farcasterAccount.username}` : 'Guest'}
        </h1>

        <p className="text-3xl text-white/60 mb-6 font-bold">
          <appkit-account-button balance='hide' />
        </p>
       

        <div className="bg-black/40 rounded-lg p-4 w-full text-center">
          <p className="text-lg text-white/80">Your Critter Holes Points</p>
          <p className="text-5xl font-bold text-yellow-400 mt-1">
            {isBalanceLoading ? '...' : chpBalance?.toString() ?? '0'} 
            <span className="text-3xl ml-2">$CHP</span>
          </p>
        </div>

      </div>
    </div>
  );
};