import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { nftContractAddress, nftAbi } from '../config/nft';
import { BaseError } from 'viem';
import gameBg from '/src/assets/game-bg.jpg';

const MintPage: React.FC = () => {
  const navigate = useNavigate();
  const { address } = useAccount();

  const { data: hash, error: mintError, isPending: isMinting, writeContract } = useWriteContract();

 
  const { data: mintPrice, isLoading: isMintPriceLoading } = useReadContract({
    address: nftContractAddress,
    abi: nftAbi,
    functionName: 'mintPrice',
  });

  const handleMint = () => {
    if (!address) {
      alert("Please connect your wallet first.");
      return;
    }
    if (typeof mintPrice === 'undefined') {
      alert("Could not read mint price. Please refresh the page and try again.");
      return;
    }
    writeContract({
      address: nftContractAddress,
      abi: nftAbi,
      functionName: 'mint',
      value: mintPrice,
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isConfirmed) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isConfirmed]);
  
  return (
    <div 
      className="h-screen flex flex-col items-center justify-center p-4 text-white"
      style={{
        backgroundImage: `url(${gameBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <h1 className="text-4xl font-bold mb-4">Mint a Hammer on Base</h1>
      <p className="text-xl mb-8">You need a hammer NFT to play Critter Hole.</p>
      
      <button
        onClick={handleMint}
        disabled={isMinting || isConfirming || isMintPriceLoading}
        className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 
                   text-white font-bold py-4 px-10 rounded-full text-2xl border-b-8 
                   border-blue-700 hover:border-blue-800 transition-all duration-150 
                   transform hover:scale-105 disabled:bg-gray-500 disabled:border-gray-700 disabled:cursor-not-allowed"
      >
       
        {isMinting ? 'Confirm in wallet...' : isConfirming ? 'Minting...' : 'Mint Hammer'}
      </button>

      <div className="mt-6 text-center min-h-[24px]">
        {mintError && (
          <div className="text-red-500">
            Error: {mintError instanceof BaseError ? mintError.shortMessage : mintError.message}
          </div>
        )}
        {isConfirmed && (
          <div className="text-green-500">
            Mint successful! Reloading the app...
          </div>
        )}
      </div>

      <p 
        onClick={() => navigate('/')} 
        className="mt-8 text-gray-400 hover:text-white cursor-pointer"
      >
        Back to Home
      </p>
    </div>
  );
};

export default MintPage;