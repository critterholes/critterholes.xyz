import React, { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { BaseError } from 'viem';
import { motion } from 'framer-motion';
import { FaBoxOpen } from 'react-icons/fa';

import gameBg from '/src/assets/game-bg.jpg';
import { lumpNftAddress, lumpNftAbi } from '../config/lump';
import { stakingAddress, stakingAbi } from '../config/staking'; 

const StakingPage: React.FC = () => {
  const { address } = useAccount();
  const [stakeAmount, setStakeAmount] = useState('');
  const [displayRewards, setDisplayRewards] = useState('0.00');

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

  const { data: userNftBalance, refetch: refetchUserNftBalance } = useReadContract({
    address: lumpNftAddress,
    abi: lumpNftAbi,
    functionName: 'balanceOf',
    args: [address!, 1n],
    query: { enabled: !!address }
  });

  const { data: stakeInfo, refetch: refetchStakeInfo } = useReadContract({
    address: stakingAddress,
    abi: stakingAbi,
    functionName: 'stakes',
    args: [address!],
    query: { enabled: !!address }
  });
  
  const { data: minClaimAmount } = useReadContract({
    address: stakingAddress,
    abi: stakingAbi,
    functionName: 'minClaimAmount',
  });

  const { data: isApproved, refetch: refetchIsApproved } = useReadContract({
      address: lumpNftAddress,
      abi: lumpNftAbi,
      functionName: 'isApprovedForAll',
      args: [address!, stakingAddress],
      query: { enabled: !!address },
  });

  const { data: rewardRateData, refetch: refetchRewardRate } = useReadContract({
      address: stakingAddress,
      abi: stakingAbi,
      functionName: 'rewardRatePerDay',
  });

  const REWARD_RATE_PER_DAY = Number(rewardRateData || 250);

  useEffect(() => {
    const timer = setInterval(() => {
      if (stakeInfo && stakeInfo[0] > 0) {
        const stakedAmount = Number(stakeInfo[0]);
        const lastStakeTime = Number(stakeInfo[2]);
        const now = Math.floor(Date.now() / 1000);
        const timeElapsed = now - lastStakeTime;

        const rewards = (stakedAmount * timeElapsed * REWARD_RATE_PER_DAY) / 86400;
        setDisplayRewards(rewards.toFixed(2));
      } else {
        setDisplayRewards('0.00');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [stakeInfo, REWARD_RATE_PER_DAY]);

  const refetchAll = () => {
    refetchUserNftBalance();
    refetchStakeInfo();
    refetchIsApproved();
    refetchRewardRate();
  };

  useEffect(() => {
    if (isConfirmed) {
      setTxState(prev => ({ ...prev, successMessage: `${prev.loadingMessage} successful!`, loadingMessage: '' }));
      refetchAll();
    }
  }, [isConfirmed]);

  const handleApprove = () => {
      setTxState({ hash: undefined, loadingMessage: 'Approving NFTs...', errorMessage: '', successMessage: '' });
      writeContract({ address: lumpNftAddress, abi: lumpNftAbi, functionName: 'setApprovalForAll', args: [stakingAddress, true] });
  };

  const handleStake = () => {
    if (!stakeAmount || Number(stakeAmount) <= 0) {
      setTxState(prev => ({ ...prev, errorMessage: 'Amount must be greater than 0' }));
      return;
    }
    setTxState({ hash: undefined, loadingMessage: 'Staking...', errorMessage: '', successMessage: '' });
    writeContract({ address: stakingAddress, abi: stakingAbi, functionName: 'stake', args: [BigInt(stakeAmount)] });
    setStakeAmount('');
  };
  
  const handleUnstake = () => {
    if (!stakeAmount || Number(stakeAmount) <= 0) {
      setTxState(prev => ({ ...prev, errorMessage: 'Amount must be greater than 0' }));
      return;
    }
    setTxState({ hash: undefined, loadingMessage: 'Unstaking...', errorMessage: '', successMessage: '' });
    writeContract({ address: stakingAddress, abi: stakingAbi, functionName: 'unstake', args: [BigInt(stakeAmount)] });
    setStakeAmount('');
  };

  const handleClaim = () => {
    setTxState({ hash: undefined, loadingMessage: 'Claiming Rewards...', errorMessage: '', successMessage: '' });
    writeContract({ address: stakingAddress, abi: stakingAbi, functionName: 'claimRewards' });
  };

  const isLoading = isPending || isConfirming;
  const stakedAmount = stakeInfo ? stakeInfo[0].toString() : '0';
  const canClaim = parseFloat(displayRewards) >= Number(minClaimAmount || 2);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full p-4 pb-24 text-white"
      style={{ backgroundImage: `url(${gameBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
    >
      <div className="max-w-4xl mx-auto pt-8">
        <h1 className="text-3xl sm:text-5xl font-bold text-yellow-300 mb-2 text-center">Lump NFT Staking</h1>
        <p className="text-center text-white/80 text-md sm:text-lg mb-6">Daily Earn: 1 NFT = {REWARD_RATE_PER_DAY} $BNK</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          <div className="bg-black/30 backdrop-blur-sm p-4 rounded-2xl border border-white/10 text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">Your Staked NFTs</h2>
            {Number(stakedAmount) > 0 ? (
              <div className="relative">
                <img src="/metadata/og.png" alt="Staked Lump NFT" className="w-full max-w-xs mx-auto rounded-xl shadow-lg"/>
                <div className="absolute top-2 right-2 bg-sky-500 text-white text-md font-bold px-3 py-1 rounded-md">
                  x {stakedAmount}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 bg-black/20 rounded-xl">
                <FaBoxOpen size={48} className="text-white/30 mb-4" />
                <p className="text-white/50">No NFTs Staked</p>
              </div>
            )}
            <div className="mt-4 bg-black/40 p-3 rounded-xl">
              <p className="text-white/60 text-sm">Pending Rewards</p>
              <p className="text-2xl sm:text-3xl font-bold text-yellow-300">{displayRewards} $BNK</p>
            </div>
             <button onClick={handleClaim} disabled={isLoading || !canClaim} className="w-full mt-3 bg-orange-500 hover:bg-orange-600 font-bold py-2.5 rounded-xl text-md disabled:opacity-50 transition-colors">
              {isLoading && txState.loadingMessage.includes('Claiming') ? txState.loadingMessage : `Claim (Min ${minClaimAmount?.toString() || 2})`}
            </button>
          </div>

          <div className="bg-black/30 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">Manage Stake</h2>
            <div className="bg-black/40 p-3 rounded-xl mb-4 text-center">
                <p className="text-white/60 text-sm">Your Unstaked $LMP</p>
                <p className="text-2xl sm:text-3xl font-bold">{userNftBalance?.toString() || '0'}</p>
            </div>

            {!isApproved ? (
              <button onClick={handleApprove} disabled={isLoading} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-xl text-lg disabled:opacity-50 transition-colors">
                  {isLoading && txState.loadingMessage.includes('Approving') ? txState.loadingMessage : '1. Approve Staking Contract'}
              </button>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-white/60">Amount</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    className="w-full mt-1 bg-black/40 p-3 rounded-lg text-xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  />
                </div>
                <div className="flex gap-3">
                  <button onClick={handleStake} disabled={!stakeAmount || isLoading || Number(stakeAmount) <= 0} className="w-full bg-sky-500 hover:bg-sky-600 font-bold py-3 rounded-lg disabled:opacity-50 transition-colors">
                    {isLoading && txState.loadingMessage.includes('Staking') ? txState.loadingMessage : 'Stake'}
                  </button>
                  <button onClick={handleUnstake} disabled={!stakeAmount || isLoading || Number(stakeAmount) <= 0} className="w-full bg-red-500 hover:bg-red-600 font-bold py-3 rounded-lg disabled:opacity-50 transition-colors">
                    {isLoading && txState.loadingMessage.includes('Unstaking') ? txState.loadingMessage : 'Unstake'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-6 text-center min-h-[24px]">
          {txState.loadingMessage && !isLoading && <p className="text-yellow-400">{txState.loadingMessage}</p>}
          {txState.errorMessage && <p className="text-red-400 break-all">Error: {txState.errorMessage}</p>}
          {txState.successMessage && <p className="text-green-400">{txState.successMessage}</p>}
        </div>
      </div>
    </motion.div>
  );
};

export default StakingPage;