// src/hooks/useHammerLevel.ts

import { useAccount, useReadContract } from 'wagmi';
import { nftContractAddress, nftAbi } from '../../config/nft';

// NFT Level IDs we are checking
const LEVEL_IDS = [0n, 1n, 2n]; 

// Hook to check the user's highest owned hammer NFT level (0, 1, or 2).
export const useHammerLevel = () => {
  const { address, isConnected } = useAccount();
  
  // Read balances for all three possible NFT IDs (0, 1, 2)
  const results = useReadContract({
    address: nftContractAddress,
    abi: nftAbi,
    functionName: 'balanceOfBatch',
    args: [
        // Owner address repeated for each ID check
        [address!, address!, address!], 
        // Array of IDs (0, 1, 2)
        LEVEL_IDS
    ],
    query: { 
        // Only run if wallet is connected and address is available
        enabled: isConnected && !!address,
        // Process the result to find the highest level
        select: (data) => {
            // data is an array: [balanceID0, balanceID1, balanceID2]
            const balances = data as bigint[]; 
            
            // Default level is -1 (no NFT)
            let currentLevel = -1; 
            
            if (balances && balances.length === 3) {
                // Check from the highest level down (Level 2 gives the biggest multiplier)
                if (balances[2] > 0n) {
                    currentLevel = 2;
                } else if (balances[1] > 0n) {
                    currentLevel = 1;
                } else if (balances[0] > 0n) {
                    currentLevel = 0;
                }
            }
            return currentLevel;
        },
    },
  });

  const hammerLevel = results.data ?? -1;
  const hasNft = hammerLevel >= 0; // True if level is 0 or higher

  return { 
      hammerLevel, 
      hasNft, 
      isLoading: results.isLoading,
      isError: results.isError
  };
};