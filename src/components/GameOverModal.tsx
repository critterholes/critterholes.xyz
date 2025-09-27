import React from "react";
import { sdk } from "@farcaster/miniapp-sdk";

interface GameOverModalProps {
  score: number;
  onClaim: () => void;
  isClaiming: boolean;
  isConfirming: boolean;
  isClaimed: boolean;
  claimError: string | null;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  score,
  onClaim,
  isClaiming,
  isConfirming,
  isClaimed,
  claimError,
}) => {
  const getButtonText = () => {
    if (isClaiming) return "Preparing claim...";
    if (isConfirming) return "Confirming...";
    if (isClaimed) return "Claimed Successfully!";
    return "Claim Points";
  };

  const handleShareClaim = (score: number) => {
    const castText = `I just claimed ${score} points as $CHP on CritterHoles! 🕳️🎮 Can you beat me? Play now `;

    sdk.actions
      .composeCast({
        text: castText.slice(0, 180),
        embeds: ["https://farcaster.xyz/miniapps/NMlQYJwGtue4/critter-holes","https://farcaster.xyz/holes/0x93a58c0a"],
      })
      .catch((e) => console.warn("Farcaster share failed.", e));
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 text-center shadow-2xl transform transition-all animate-popup w-full max-w-md">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">GAME OVER!</h2>

        <p className="text-2xl text-gray-600 mb-2">Your final score:</p>
        <p className="font-bold text-sky-500 text-6xl mb-6">{score}</p>

        {!isClaimed && (
          <>
            <p className="text-lg text-gray-500 mb-8">
              Claim your points as $CHP tokens!
            </p>

            <button
              onClick={onClaim}
              disabled={isClaiming || isConfirming || isClaimed || score === 0}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-2xl py-4 px-10 rounded-full 
                       transition-all duration-150 transform hover:scale-105
                       disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {getButtonText()}
            </button>

            {claimError && (
              <p className="text-red-500 mt-4 text-center">{claimError}</p>
            )}
          </>
        )}

        {isClaimed && (
          <div className="mt-6">
            <p className="text-xl font-bold text-green-600 mb-4">
              🎉 You claimed {score} $CHP! Share your score and challenge friends!
            </p>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleShareClaim(score)}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold text-lg py-3 px-6 rounded-full shadow-md transition-transform hover:scale-105"
              >
                Share on Farcaster 🚀
              </button>

              <button
                onClick={() => window.location.reload()}
                className="w-full bg-gray-800 hover:bg-black text-white font-bold text-lg py-3 px-6 rounded-full shadow-md transition-transform hover:scale-105"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameOverModal;
