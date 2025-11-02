import React from "react";

interface SquareProps {
  character: { type: string } | undefined;
  characterImage: string | null;
  sizeClass: string;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({
  character,
  characterImage,
  sizeClass,
  onClick,
}) => {
  const characterClass = character
    ? "animate-popup opacity-100"
    : "opacity-0 scale-50";

  return (
    <div
      className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full cursor-pointer flex items-center justify-center 
        bg-gradient-to-b from-[#5c3d24] to-[#2e1f13] shadow-inner shadow-black/50 border-4 border-[#2e1f13]
        transition-all duration-300 [transform-style:preserve-3d]"
      onClick={onClick}
    >
      {characterImage && (
        <img
          src={characterImage}
          alt={character?.type || "character"}
          className={`w-full h-full object-contain transition-all duration-300 ${characterClass} ${sizeClass}
            [filter:drop-shadow(0_10px_5px_rgba(0,0,0,0.4))]`}
        />
      )}
    </div>
  );
};

export default Square;
