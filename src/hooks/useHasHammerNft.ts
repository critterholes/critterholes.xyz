// src/hooks/useHasHammerNft.ts

import { useAccount, useReadContract } from 'wagmi';
import { nftContractAddress, nftAbi } from '../config/nft';

export const useHasHammerNft = () => {
  const { address, isConnected } = useAccount();

  const { data: hasMinted, isLoading } = useReadContract({
    address: nftContractAddress,
    abi: nftAbi,
    functionName: 'hasMinted',
    args: [address!],
    
    query: { enabled: isConnected && !!address },
  });

  const hasNft = !!hasMinted;

  return { hasNft, isLoading };
};