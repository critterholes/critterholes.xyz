import React, { useEffect, useMemo } from 'react';
import {  Link } from 'react-router-dom';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { BaseError, formatEther } from 'viem';
import { useHammerLevel } from '../hooks/nft/useHammerLevel';
import { nftContractAddress, nftAbi } from '../config/nft';
import gameBg from '/src/assets/game-bg.jpg';
import { FaArrowUp, FaHammer } from 'react-icons/fa';

const MAX_LEVEL = 2;

const UpgradePage: React.FC = () => {
    const { address, isConnected } = useAccount();
    const { hammerLevel, hasNft, isLoading: isLoadingLevel } = useHammerLevel();

    const targetLevelId = useMemo(() => {
        return hammerLevel >= 0 ? BigInt(hammerLevel + 1) : 0n;
    }, [hammerLevel]);

    const isMaxLevel = hammerLevel === MAX_LEVEL;

    const { data: upgradePrice, isLoading: isPriceLoading, isError: isPriceError } = useReadContract({
        address: nftContractAddress,
        abi: nftAbi,
        functionName: 'levelPrices',
        args: [targetLevelId],
        query: {
            enabled: isConnected && !isMaxLevel && hammerLevel >= 0,
        }
    });

    const { 
        data: hash, 
        error: upgradeError, 
        isPending: isUpgrading, 
        writeContract 
    } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({ hash });

    const priceEth = upgradePrice ? formatEther(upgradePrice) : '...';

    const handleUpgrade = () => {
        if (!address || !upgradePrice) {
            alert("Wallet not connected or price not loaded.");
            return;
        }

        writeContract({
            address: nftContractAddress,
            abi: nftAbi,
            functionName: 'upgradeNFT',
            args: [targetLevelId],
            value: upgradePrice,
        });
    };

    useEffect(() => {
        if (isConfirmed) {
            alert(`Upgrade successful! Your Hammer is now Level ${hammerLevel + 1}.`);
            const timer = setTimeout(() => window.location.reload(), 1500); 
            return () => clearTimeout(timer);
        }
    }, [isConfirmed, hammerLevel]);

    if (isLoadingLevel) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-gray-900 text-white">
                <p>Loading Hammer status...</p>
            </div>
        );
    }
    
    if (!hasNft) {
        return (
            <div className="h-screen flex flex-col items-center justify-center p-4 bg-gray-800 text-white text-center">
                <h1 className="text-4xl font-bold mb-4">No Hammer Found!</h1>
                <p className="text-xl mb-8">You must mint a Level 0 Hammer before upgrading.</p>
                <Link to="/mint">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full text-2xl border-b-8 border-orange-700">
                        Go to Mint Page
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div
            className="h-screen w-full flex flex-col items-center justify-center p-4 relative"
            style={{ backgroundImage: `url(${gameBg})`, backgroundSize: 'cover' }}
        >
            <Link to="/" className="absolute top-4 left-4 z-50 bg-black/50 p-3 rounded-full text-white hover:bg-black/80 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </Link>

            <div className="bg-black/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl max-w-lg w-full text-center text-white">
                <h1 className="text-5xl font-extrabold text-white mb-6 flex items-center justify-center gap-x-3" style={{ textShadow: '1px 1px 2px #000' }}>
                    <FaHammer className="text-yellow-400"/> Hammer Upgrade
                </h1>

                <div className="mb-8 border-b border-white/30 pb-4">
                    <p className="text-xl font-semibold text-gray-300">Your Current Level</p>
                    <p className="text-6xl font-black text-blue-300">{hammerLevel}</p>
                    <p className="text-md text-gray-400">(Score Multiplier: x{hammerLevel === 1 ? 2 : hammerLevel === 2 ? 3 : 1})</p>
                </div>

                {isMaxLevel ? (
                    <div className="bg-green-700/50 text-white p-4 rounded-lg">
                        <p className="text-2xl font-bold">MAX LEVEL REACHED (Level {MAX_LEVEL})</p>
                        <p className="mt-2">No further upgrades are available at this time.</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-8">
                            <p className="text-xl font-semibold text-gray-300 flex items-center justify-center gap-x-2">
                                <FaArrowUp className="text-red-300"/> Upgrade to Level {targetLevelId.toString()}
                            </p>
                            <p className="text-3xl font-bold text-red-300 mt-2">
                                Cost: {isPriceLoading ? 'Loading Price...' : isPriceError ? 'Error Loading Price' : `${priceEth} CELO/ETH`}
                            </p>
                            <p className="text-sm text-gray-400 mt-1">(Multiplier: x{hammerLevel + 1 === 1 ? 2 : hammerLevel + 1 === 2 ? 3 : 1})</p>
                        </div>

                        <button
                            onClick={handleUpgrade}
                            disabled={isUpgrading || isConfirming || isPriceLoading || isPriceError || !upgradePrice}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-lg text-xl transition-all duration-150 transform hover:scale-[1.02] disabled:bg-gray-500 disabled:cursor-not-allowed"
                        >
                            {isUpgrading ? 'Awaiting Wallet Confirmation...' : 
                             isConfirming ? 'Upgrading NFT...' : 
                             isConfirmed ? 'Upgrade Confirmed!' : 
                             `UPGRADE TO LEVEL ${targetLevelId.toString()}`}
                        </button>
                    </>
                )}

                <div className="mt-4 text-center min-h-[24px]">
                    {upgradeError && (
                        <div className="text-red-400 mt-4">
                            Error: {upgradeError instanceof BaseError ? upgradeError.shortMessage : upgradeError.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpgradePage;