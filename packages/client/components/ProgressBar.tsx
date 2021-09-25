import React from "react";

interface ProgressBarProps {
  progressPercentage: number;
  isDanger: boolean;
}

export const ProgressBar = ({ progressPercentage, isDanger }: ProgressBarProps) => {
  return (
    <div className="h-8 md:h-6 w-full bg-gray-300 justify-start flex-row overflow-hidden">
      <div
        style={{ width: `${progressPercentage}%` }}
        className={`h-full bg-gradient-to-r${isDanger
          ? " from-purple-400 via-pink-500 to-red-500"
          : " from-blue-500 to-green-400"
          }`}
      />
    </div>
  );
};