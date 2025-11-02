import React, { useState, useEffect, useMemo } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, BaseError } from 'viem';
import { motion } from 'framer-motion';

import gameBg from '/src/assets/game-bg.jpg';

import { tokenContractAddress, tokenContractAbi } from '../config/bonk';
import { lumpNftAddress, lumpNftAbi } from '../config/lump';
import { bonkSwapAddress, bonkSwapAbi } from '../config/swap';

const ExchangePage: React.FC = () => {
  const { address } = useAccount();

  const [bnkToSwap, setBnkToSwap] = useState('');
  const [ethToReceive, setEthToReceive] = useState('0.00');

  const MINT_AMOUNT = 1;
  const BNK_MINT_PRICE = 5000;
  const ETH_MINT_PRICE = '650';

  const [txState, setTxState] = useState({
    hash: undefined as `0x${string}` | undefined,
    loadingMessage: '',
    errorMessage: '',
    successMessage: '',
  });

  const { writeContract, isPending } = useWriteContract({
    mutation: {
      onSuccess: (hash) => setTxState(prev => ({ ...prev, hash, errorMessage: '' })),
      onError: (error: Error) => {
        const message = error instanceof BaseError ? error.shortMessage : error.message;
        setTxState(prev => ({ ...prev, errorMessage: message, loadingMessage: '' }));
      },
    }
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash: txState.hash });

  const { data: bnkBalance, refetch: refetchBnkBalance } = useReadContract({
    address: tokenContractAddress,
    abi: tokenContractAbi,
    functionName: 'balanceOf',
    args: [address!],
    query: { enabled: !!address }
  });

  const { data: bnkAllowanceForSwap, refetch: refetchBnkAllowanceForSwap } = useReadContract({
    address: tokenContractAddress,
    abi: tokenContractAbi,
    functionName: 'allowance',
    args: [address!, bonkSwapAddress],
    query: { enabled: !!address }
  });

  const { data: bnkAllowanceForLump, refetch: refetchBnkAllowanceForLump } = useReadContract({
    address: tokenContractAddress,
    abi: tokenContractAbi,
    functionName: 'allowance',
    args: [address!, lumpNftAddress],
    query: { enabled: !!address }
  });

  const { data: minSwapAmount } = useReadContract({
    address: bonkSwapAddress,
    abi: bonkSwapAbi,
    functionName: 'minSwap',
  });
  
  const { data: rateBonkPerEth } = useReadContract({
    address: bonkSwapAddress,
    abi: bonkSwapAbi,
    functionName: 'rate',
  });

  useEffect(() => {
    if (isConfirmed) {
      setTxState(prev => ({ ...prev, successMessage: `${prev.loadingMessage} successful!`, loadingMessage: '' }));
      refetchBnkBalance();
      refetchBnkAllowanceForSwap();
      refetchBnkAllowanceForLump();
    }
  }, [isConfirmed]);

  useEffect(() => {
    const amount = parseFloat(bnkToSwap);
    if (!isNaN(amount) && amount > 0 && rateBonkPerEth) {
      const eth = amount / Number(rateBonkPerEth);
      setEthToReceive(eth.toFixed(8));
    } else {
      setEthToReceive('0.00');
    }
  }, [bnkToSwap, rateBonkPerEth]);

  const isSwapAmountInvalid = useMemo(() => {
    const amount = Number(bnkToSwap);
    return amount < Number(minSwapAmount || 100) || amount > Number(bnkBalance || 0);
  }, [bnkToSwap, bnkBalance, minSwapAmount]);

  const handleApproveAndSwap = (isApproval: boolean) => {
    setTxState({ hash: undefined, loadingMessage: isApproval ? 'Approving $BNK...' : 'Swapping...', errorMessage: '', successMessage: '' });
    if (isApproval) {
      writeContract({ address: tokenContractAddress, abi: tokenContractAbi, functionName: 'approve', args: [bonkSwapAddress, BigInt(bnkToSwap)] });
    } else {
      writeContract({ address: bonkSwapAddress, abi: bonkSwapAbi, functionName: 'swap', args: [BigInt(bnkToSwap)] });
    }
  };

  const handleApproveAndMint = () => {
    setTxState({ hash: undefined, loadingMessage: 'Approving $BNK for Mint...', errorMessage: '', successMessage: '' });
    writeContract({ address: tokenContractAddress, abi: tokenContractAbi, functionName: 'approve', args: [lumpNftAddress, BigInt(BNK_MINT_PRICE)] });
  };

  const handleMintWithBNK = () => {
    setTxState({ hash: undefined, loadingMessage: 'Minting with $BNK...', errorMessage: '', successMessage: '' });
    writeContract({ address: lumpNftAddress, abi: lumpNftAbi, functionName: 'mintWithBNK', args: [BigInt(MINT_AMOUNT)] });
  };
  
  const handleMintWithETH = () => {
    setTxState({ hash: undefined, loadingMessage: 'Minting with DEGEN...', errorMessage: '', successMessage: '' });
    writeContract({ address: lumpNftAddress, abi: lumpNftAbi, functionName: 'mintWithETH', args: [BigInt(MINT_AMOUNT)], value: parseEther(ETH_MINT_PRICE) });
  };

  const isLoading = isPending || isConfirming;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full p-4 pb-24 text-white"
      style={{ backgroundImage: `url(${gameBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
    >
      <div className="max-w-4xl mx-auto pt-8">
        <section className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-yellow-300 mb-4 text-center">Swap $BNK to Degen</h2>
          <div className="bg-black/30 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
            <div className="flex flex-col gap-2">
              <div className="bg-black/40 p-3 rounded-xl">
                <div className="flex justify-between items-center text-xs text-white/60 mb-1">
                  <span>You Pay</span>
                  <span>Balance: {bnkBalance?.toString() || '0'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder={`Min ${minSwapAmount?.toString() || 100}`}
                    value={bnkToSwap}
                    onChange={(e) => setBnkToSwap(e.target.value)}
                    className="w-full bg-transparent text-2xl font-bold text-white focus:outline-none"
                  />
                  <span className="text-xl font-bold text-yellow-300">$BNK</span>
                </div>
              </div>
              <div className="bg-black/40 p-3 rounded-xl">
                <span className="text-xs text-white/60">You Receive (est.)</span>
                <div className="flex items-center gap-2">
                  <p className="w-full text-2xl font-bold text-white/60">{ethToReceive}</p>
                  <span className="text-xl font-bold text-white/80">$DEGEN</span>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              {(Number(bnkAllowanceForSwap) || 0) < Number(bnkToSwap) ? (
                <button 
                  onClick={() => handleApproveAndSwap(true)}
                  disabled={!bnkToSwap || isLoading}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full text-md border-b-4 border-yellow-600 transition-all duration-150 transform hover:scale-105 disabled:bg-gray-600 disabled:border-gray-700 disabled:cursor-not-allowed">
                  {isLoading ? txState.loadingMessage : 'Approve $BNK'}
                </button>
              ) : (
                <button 
                  onClick={() => handleApproveAndSwap(false)}
                  disabled={isSwapAmountInvalid || isLoading}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-md border-b-4 border-orange-700 transition-all duration-150 transform hover:scale-105 disabled:bg-gray-600 disabled:border-gray-700 disabled:cursor-not-allowed">
                  {isLoading ? txState.loadingMessage : 'Swap'}
                </button>
              )}
              {isSwapAmountInvalid && Number(bnkToSwap) > 0 && <p className="text-red-400 text-xs mt-2 text-center">Amount must be at least {minSwapAmount?.toString()} and not exceed your balance.</p>}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl sm:text-4xl font-bold text-yellow-300 mb-4 text-center">Mint Lump NFT ($LMP)</h2>
          <p className="text-white/80 text-md sm:text-lg leading-relaxed mb-6 text-center">
            Get your exclusive <span className="font-bold text-green-400">Lump NFTs</span>. This NFT is your key to the upcoming staking feature.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex flex-col items-center">
              <p className="text-md sm:text-lg text-white/80 mb-3">Mint with {BNK_MINT_PRICE} $BNK</p>
              {(Number(bnkAllowanceForLump) || 0) < BNK_MINT_PRICE ? (
                <button 
                  onClick={handleApproveAndMint}
                  disabled={isLoading}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-full text-sm border-b-4 border-yellow-600 transition-all duration-150 transform hover:scale-105 disabled:bg-gray-600 disabled:border-gray-700 disabled:cursor-not-allowed">
                  {isLoading ? txState.loadingMessage : '1. Approve $BNK'}
                </button>
              ) : (
                <button 
                  onClick={handleMintWithBNK}
                  disabled={isLoading}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full text-sm border-b-4 border-orange-700 transition-all duration-150 transform hover:scale-105 disabled:bg-gray-600 disabled:border-gray-700 disabled:cursor-not-allowed">
                  {isLoading ? txState.loadingMessage : 'Mint Now'}
                </button>
              )}
            </div>
            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex flex-col items-center">
              <p className="text-md sm:text-lg text-white/80 mb-3">Mint with {ETH_MINT_PRICE} $DEGEN</p>
              <button 
                onClick={handleMintWithETH}
                disabled={isLoading}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full text-sm border-b-4 border-orange-700 transition-all duration-150 transform hover:scale-105 disabled:bg-gray-600 disabled:border-gray-700 disabled:cursor-not-allowed">
                {isLoading ? txState.loadingMessage : 'Mint Now'}
              </button>
            </div>
          </div>
        </section>

        <div className="mt-6 text-center min-h-[24px]">
          {txState.loadingMessage && <p className="text-yellow-400">{txState.loadingMessage}</p>}
          {txState.errorMessage && <p className="text-red-400 break-all">Error: {txState.errorMessage}</p>}
          {txState.successMessage && <p className="text-green-400">{txState.successMessage}</p>}
        </div>
      </div>
    </motion.div>
  );
};

export default ExchangePage;