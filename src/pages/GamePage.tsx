import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { BaseError } from 'viem';
import { IoHeart } from 'react-icons/io5';
import Square from '../components/Square';
import Hammer from '../components/Hammer';
import GameOverModal from '../components/GameOverModal';
import { useHasHammerNft } from '../hooks/useHasHammerNft';
import { gameContractAddress, gameContractAbi } from '../config/game';
import gameBg from '/src/assets/game-bg.jpg';
import whackSound from '/src/assets/whack.mp3';
import moleImg from '/src/assets/mole.webp';
import skunkImg from '/src/assets/skunk.webp';
import rabbitImg from '/src/assets/rabbit.webp';


interface Character {
  position: number;
  type: string;
  score: number;
}


const characterData = [
  { type: 'mole',   score: 1, image: moleImg,   rarityWeight: 10, sizeClass: 'p-1' },
  { type: 'skunk',  score: 2, image: skunkImg,  rarityWeight: 5,  sizeClass: 'p-3' },
  { type: 'rabbit', score: 3, image: rabbitImg, rarityWeight: 2,  sizeClass: 'p-0' },
];


const totalRarityWeight = characterData.reduce((sum, char) => sum + char.rarityWeight, 0);
const getRandomCharacter = () => {
  let random = Math.random() * totalRarityWeight;
  for (const char of characterData) {
    if (random < char.rarityWeight) return char;
    random -= char.rarityWeight;
  }
  return characterData[0];
};

const GamePage: React.FC = () => {
  const { address: walletAddress } = useAccount();
  const { hasNft, isLoading: isLoadingNft } = useHasHammerNft();

  const [gameState, setGameState] = useState<'READY' | 'PLAYING' | 'GAME_OVER'>('READY');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); 
  const [activeCharacters, setActiveCharacters] = useState<Character[]>([]);
  const [claimError, setClaimError] = useState<string | null>(null); 

  const { data: playTxHash, writeContract: playContract } = useWriteContract();
  const { isLoading: isConfirmingPlay, isSuccess: isPlayConfirmed } = useWaitForTransactionReceipt({ hash: playTxHash });
  
  const { data: claimTxHash, error: claimContractError, isPending: isClaiming, writeContract: claimContract } = useWriteContract();
  const { isLoading: isConfirmingClaim, isSuccess: isClaimed } = useWaitForTransactionReceipt({ hash: claimTxHash });

  const { data: playerData, refetch: refetchPlayerData } = useReadContract({
    address: gameContractAddress,
    abi: gameContractAbi,
    functionName: 'players',
    args: [walletAddress!],
    query: { enabled: !!walletAddress }
  });

  const { data: dailyPlayLimit } = useReadContract({
    address: gameContractAddress,
    abi: gameContractAbi,
    functionName: 'dailyPlayLimit',
  });

  const playsLeft = dailyPlayLimit !== undefined && playerData !== undefined
    ? Number(dailyPlayLimit) - Number(playerData[1]) 
    : 0;

  const whackAudio = new Audio(whackSound);
  
  const spawnCharacters = useCallback(() => {
    const newCharacters: Character[] = [];
    const usedPositions = new Set<number>();
    const characterCount = Math.random() < 0.3 ? 2 : 1;
    for (let i = 0; i < characterCount; i++) {
      let position;
      do {
        position = Math.floor(Math.random() * 12);
      } while (usedPositions.has(position));
      usedPositions.add(position);
      const character = getRandomCharacter();
      newCharacters.push({ position, type: character.type, score: character.score });
    }
    setActiveCharacters(newCharacters);
  }, []);
  
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    let gameLoopTimeout: ReturnType<typeof setTimeout>;
    const runGameLoop = () => {
      spawnCharacters();
      const randomDelay = Math.random() * 500 + 400; 
      gameLoopTimeout = setTimeout(runGameLoop, randomDelay);
    };
    runGameLoop();
    
    const countdownTimer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearTimeout(gameLoopTimeout);
          clearInterval(countdownTimer);
          setGameState('GAME_OVER');
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => { 
      clearTimeout(gameLoopTimeout);
      clearInterval(countdownTimer);
    };
  }, [gameState, spawnCharacters]);
  
  const handleStartGame = () => {
    playContract({
      address: gameContractAddress,
      abi: gameContractAbi,
      functionName: 'play',
    });
  };

  useEffect(() => {
    if (isPlayConfirmed) {
      refetchPlayerData();
      setScore(0);
      setTimeLeft(60);
      setActiveCharacters([]);
      setGameState('PLAYING');
    }
  }, [isPlayConfirmed, refetchPlayerData]);
  
  const handleWhack = (index: number) => {
    const whackedCharacter = activeCharacters.find(char => char.position === index);
    if (whackedCharacter) {
      whackAudio.currentTime = 0;
      whackAudio.play();
      setScore(prevScore => prevScore + whackedCharacter.score);
      setActiveCharacters(prev => prev.filter(char => char.position !== index));
    }
  };
  
  const handleClaim = async () => {
    if (!walletAddress) return setClaimError("Please connect wallet.");
    if (score <= 0) return setClaimError("You can't claim 0 points.");
    setClaimError(null);

    try {
      const response = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userAddress: walletAddress, score }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to get signature.');
      }

      const { databytes, v, r, s } = await response.json();
      
      claimContract({
        address: gameContractAddress,
        abi: gameContractAbi,
        functionName: 'claim',
        args: [databytes, v, r, s],
      });

    } catch (error) {
      setClaimError(error instanceof Error ? error.message : 'Unknown error.');
    }
  };
    
  useEffect(() => {
    if (claimContractError) {
      setClaimError(claimContractError instanceof BaseError ? claimContractError.shortMessage : claimContractError.message);
    }
  }, [claimContractError]);
 
  if (isLoadingNft) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900 text-white">
        <p>Verifying hammer ownership...</p>
      </div>
    );
  }
  
  if (!hasNft) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-4 bg-gray-800 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">No Hammer Found!</h1>
        <p className="text-xl mb-8">To play the game, you need to mint a hammer first.</p>
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
      className="h-screen w-full flex flex-col items-center justify-center p-4"
      style={{ backgroundImage: `url(${gameBg})`, backgroundSize: 'cover' }}
    >
      <Hammer />
      
      {gameState === 'PLAYING' && (
        <div className="w-full max-w-2xl flex justify-between items-center absolute top-5 px-5">
          <div className="bg-yellow-400 text-white py-2 px-5 rounded-2xl border-b-4 border-yellow-600 shadow-lg">
            <h2 className="text-3xl flex items-center gap-x-2"><span>SCORE:</span><span>{score}</span></h2>
          </div>
          <div className="bg-red-500 text-white py-2 px-5 rounded-2xl border-b-4 border-red-700 shadow-lg">
            <h2 className="text-3xl flex items-center gap-x-2"><span>TIME:</span><span>{timeLeft}</span></h2>
          </div>
        </div>
      )}
      
      {gameState === 'READY' && (
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4" style={{ textShadow: '2px 2px 4px #000' }}>Daily Plays Left</h2>
          <div className="flex justify-center gap-x-3 mb-8">
            {Array.from({ length: playsLeft > 0 ? playsLeft : 0 }).map((_, i) => (
              <IoHeart key={i} size={50} className="text-red-500 drop-shadow-lg" />
            ))}
            {playsLeft <= 0 && <p className="text-2xl self-center">None</p>}
          </div>
          <button
            onClick={handleStartGame}
            disabled={playsLeft <= 0 || isConfirmingPlay}
            className="bg-blue-500 text-white font-bold py-5 px-16 rounded-full text-4xl border-b-8 
                       border-blue-700 transition-all duration-150 transform hover:scale-110 
                       disabled:bg-gray-500 disabled:border-gray-700 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isConfirmingPlay ? 'Starting...' : (playsLeft > 0 ? 'PLAY' : 'NO PLAYS LEFT')}
          </button>
          {playsLeft <= 0 && !isConfirmingPlay && <p className="mt-4 text-xl">Come back later for more plays!</p>}
        </div>
      )}

     
      {(gameState === 'PLAYING' || gameState === 'GAME_OVER') && (
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, index) => {
            const character = activeCharacters.find(char => char.position === index);
            const characterAsset = character ? characterData.find(c => c.type === character.type) : null;
            return (
              <Square
                key={index}
                character={character}
                characterImage={characterAsset ? characterAsset.image : null}
                sizeClass={characterAsset ? characterAsset.sizeClass : 'p-2'}
                onClick={() => handleWhack(index)}
              />
            );
          })}
        </div>
      )}
      
      {gameState === 'GAME_OVER' && (
        <GameOverModal 
          score={score}
          onClaim={handleClaim}
          isClaiming={isClaiming}
          isConfirming={isConfirmingClaim}
          isClaimed={isClaimed}
          claimError={claimError}
        />
      )}
    </div>
  );
};

export default GamePage;