import React from "react";

const XPBar = ({ xp }) => {
  const xpBase = 100;

  const currentLevel = Math.floor(Math.sqrt(xp / xpBase)) + 1;

  const xpPrev =
    currentLevel === 1 ? 0 : xpBase * Math.pow(currentLevel - 1, 2);

  const xpNext = xpBase * Math.pow(currentLevel, 2);

  const progressPercentage = Math.min(
    ((xp - xpPrev) / (xpNext - xpPrev)) * 100,
    100,
  );

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-1 flex w-full items-center justify-between text-sm">
        <span>Nível {currentLevel}</span>
        <span>
          {xp - xpPrev}/{xpNext - xpPrev} XP
        </span>
      </div>
      <div className="bg-light-purple/30 relative h-1.5 w-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-teal-400 transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className="mt-1 w-full text-right text-xs">
        Faltam {xpNext - xp} XP para o nível {currentLevel + 1}
      </div>
    </div>
  );
};

export default XPBar;
