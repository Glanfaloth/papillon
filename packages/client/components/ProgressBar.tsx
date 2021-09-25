import React from "react";

interface ProgressBarProps {
  progressPercentage: number;
  isDanger: boolean;
}

export const ProgressBar = ({
  progressPercentage,
  isDanger,
}: ProgressBarProps) => {
  return (
    <div className="h-8 md:h-6 w-full bg-gray-300 justify-start flex-row overflow-hidden rounded-xl">
      <div
        style={{ width: `${progressPercentage}%` }}
        className={`animate-diminishX h-full bg-gradient-to-r${isDanger ? " from-red-700 to-red-700" : " from-blue-700 to-blue-900"
          }`}
      />
    </div>
  );
};
