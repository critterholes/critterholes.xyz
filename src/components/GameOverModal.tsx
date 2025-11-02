import React, { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

interface ClaimResult {
  rewardTokenSymbol: string;
  rewardTokenAmount: string;
}

interface GameOverModalProps {
  score: number;
  onClaim: () => void;
  isClaiming: boolean;
  isConfirming: boolean;
  isClaimed: boolean;
  claimError: string | null;
  claimResult: ClaimResult | null;
  onResetError: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  score,
  onClaim,
  isClaiming,
  isConfirming,
  isClaimed,
  claimError,
  claimResult,
  onResetError,
}) => {
  const getButtonText = () => {
    if (isClaiming) return "Preparing Claim...";
    if (isConfirming) return "Confirming...";
    if (isClaimed) return "Claimed Successfully!";
    return "Claim Points";
  };

  const handleShareClaim = (
    score: number,
    rewardSymbol?: string,
    rewardAmount?: string
  ) => {
    let castText = `I just claimed ${score} $CHP on CritterHoles!`;
    if (rewardSymbol && rewardAmount) {
      castText += ` and got a surprise ${rewardAmount} $${rewardSymbol} drop!`;
    }
    castText += ` Can you beat me? Play now `;

    sdk.actions
      .composeCast({
        text: castText.slice(0, 280),
        embeds: [
          "https://farcaster.xyz/miniapps/NMlQYJwGtue4/critter-holes",
          "https://farcaster.xyz/holes/0x2a956c53",
        ],
      })
      .catch((e) => console.warn("Farcaster share failed.", e));
  };

  useEffect(() => {
    if (isClaimed && claimResult) {
      handleShareClaim(
        score,
        claimResult.rewardTokenSymbol,
        claimResult.rewardTokenAmount
      );
    }
  }, [isClaimed, claimResult, score]);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 text-center shadow-2xl transform transition-all animate-popup w-full max-w-md">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">GAME OVER!</h2>

        <p className="text-2xl text-gray-600 mb-2">Your final score:</p>
        <p className="font-bold text-sky-500 text-6xl mb-6">{score}</p>

        {!isClaimed && (
          <>
            <p className="text-lg text-gray-500 mb-8">
              Claim your score for $CHP and a surprise token!
            </p>

            {!claimError && (
              <button
                onClick={onClaim}
                disabled={isClaiming || isConfirming || score === 0}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-2xl py-4 px-10 rounded-full 
                         transition-all duration-150 transform hover:scale-105
                         disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {getButtonText()}
              </button>
            )}

            {claimError && (
              <div className="mt-4 text-center">
                <p className="text-red-500 mb-4">{claimError}</p>
                <button
                  onClick={() => {
                    onResetError();
                    onClaim();
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xl py-3 px-8 rounded-full 
                           transition-all duration-150 transform hover:scale-105"
                >
                  Try Again
                </button>
              </div>
            )}
          </>
        )}

        {isClaimed && claimResult && (
          <div className="mt-6">
            <p className="text-xl font-bold text-green-600 mb-4">
              You claimed {score} $CHP and {claimResult.rewardTokenAmount} $
              {claimResult.rewardTokenSymbol}!
            </p>
            <p className="text-gray-500 mb-4">
              Your Farcaster cast has been prepared. Please check your client to
              post it!
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gray-800 hover:bg-black text-white font-bold text-lg py-3 px-6 rounded-full shadow-md transition-transform hover:scale-105"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameOverModal;
