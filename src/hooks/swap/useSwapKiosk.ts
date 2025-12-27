// src/hooks/useSwapKiosk.ts
import { useState, useEffect, useMemo } from 'react';
import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import {
  CHSWAP_ADDRESS,
  CHP_ADDRESS,
  USDC_ADDRESS,
  CHP_DECIMALS,
  USDC_DECIMALS,
} from '../constants.ts';
import { chSwapAbi } from './chSwap.ts';
import { erc20Abi } from '../erc20.ts';

export type SwapMode = 'buy' | 'sell';

export function useSwapKiosk() {
  const [mode, setMode] = useState<SwapMode>('buy');
  const [amountIn, setAmountIn] = useState('');
  const [amountOut, setAmountOut] = useState('');
  
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  
  const [isApproving, setIsApproving] = useState(false);

  const { address } = useAccount();

  const inputToken = mode === 'buy' ? USDC_ADDRESS : CHP_ADDRESS;
  const outputToken = mode === 'buy' ? CHP_ADDRESS : USDC_ADDRESS;
  const inputDecimals = mode === 'buy' ? USDC_DECIMALS : CHP_DECIMALS;
  const outputDecimals = mode === 'buy' ? CHP_DECIMALS : USDC_DECIMALS;

  const amountInBigInt = useMemo(() => {
    if (!amountIn) return 0n;
    try {
      return parseUnits(amountIn, inputDecimals);
    } catch {
      return 0n;
    }
  }, [amountIn, inputDecimals]);

  const { data: buyPrice } = useReadContract({
    address: CHSWAP_ADDRESS,
    abi: chSwapAbi,
    functionName: 'buyPricePer1000CHP_USDC',
  });

  const { data: sellPrice } = useReadContract({
    address: CHSWAP_ADDRESS,
    abi: chSwapAbi,
    functionName: 'sellPricePer1000CHP_USDC',
  });

  const { data: inputBalance } = useBalance({ address, token: inputToken });
  const { data: outputBalance } = useBalance({ address, token: outputToken });

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: inputToken,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address!, CHSWAP_ADDRESS],
    query: {
      enabled: !!address,
    }
  });

  const feeAmountBigInt = useMemo(() => {
    if (mode === 'sell' && amountInBigInt > 0n) {
      return (amountInBigInt * 1n) / 100n; // 1% fee
    }
    return 0n;
  }, [mode, amountInBigInt]);

  const amountToApproveBigInt = mode === 'buy' 
    ? amountInBigInt 
    : amountInBigInt + feeAmountBigInt;

  const needsApproval = (allowance ?? 0n) < amountToApproveBigInt;

  useEffect(() => {
    if (amountInBigInt === 0n || (!buyPrice && !sellPrice)) {
      setAmountOut('');
      return;
    }

    let out = 0n;
    if (mode === 'buy' && buyPrice) {
      const chpOut = (amountInBigInt * 1000n) / buyPrice;
      out = chpOut - (chpOut / 100n); // Subtract 1% fee
    } else if (mode === 'sell' && sellPrice) {
      out = (amountInBigInt * sellPrice) / 1000n;
    }

    setAmountOut(formatUnits(out, outputDecimals));
  }, [amountInBigInt, mode, buyPrice, sellPrice, outputDecimals]);

  const { isPending, writeContractAsync } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  useEffect(() => {
    if (isConfirmed) {
      setTxHash(undefined);
      setAmountIn('');
      setIsApproving(false);
      refetchAllowance();
    }
  }, [isConfirmed, refetchAllowance]);

  const handleSubmit = async () => {
    if (amountInBigInt === 0n) return;
    setTxHash(undefined);

    try {
      if (needsApproval) {
        setIsApproving(true);
        const hash = await writeContractAsync({
          address: inputToken,
          abi: erc20Abi,
          functionName: 'approve',
          args: [CHSWAP_ADDRESS, amountToApproveBigInt],
        });
        if (hash) setTxHash(hash);
      } else {
        const hash = await writeContractAsync({
          address: CHSWAP_ADDRESS,
          abi: chSwapAbi,
          functionName: mode === 'buy' ? 'buyCHP' : 'sellCHP',
          args: [amountInBigInt],
        });
        if (hash) setTxHash(hash);
      }
    } catch (e) {
      console.error(e);
      setIsApproving(false);
    }
  };

  const isLoading = isPending || isApproving || isConfirming;

  return {
    mode,
    amountIn,
    amountOut,
    isLoading,
    isConfirming,
    needsApproval,
    txHash,
    inputSymbol: mode === 'buy' ? 'USDC' : 'CHP',
    outputSymbol: mode === 'buy' ? 'CHP' : 'USDC',
    inputBalance: inputBalance?.formatted.slice(0, 8) ?? '0.0',
    outputBalance: outputBalance?.formatted.slice(0, 8) ?? '0.0',
    setMode,
    setAmountIn,
    handleSubmit,
  };
}