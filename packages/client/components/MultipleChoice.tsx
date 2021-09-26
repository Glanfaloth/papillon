import React from "react";

export enum OptionStyle {
  DEFAULT = "bg-blue-400",
  CORRECT = "bg-green-400",
  INCORRECT = "bg-red-400",
  SELECTED = "bg-blue-800",
  DISABLED = "bg-gray-200",
  CLOZE = "bg-pink-300",
}

export const OptionBlock = ({
  text,
  onClick,
  className,
  optionStyle = OptionStyle.DEFAULT,
  disabled = false,
  isSelected = false,
  index,
  showNumberBadge = false,
}: {
  text: string;
  onClick?: () => void;
  className?: string;
  optionStyle?: OptionStyle;
  disabled?: boolean;
  isSelected?: boolean;
  index: number;
  showNumberBadge?: boolean;
}) => {
  return (
    <button
      className={`flex-row py-2 px-4 mx-2 my-1 w-full
          text-blue text-center text-white text-sm md:text-base lg:text-lg font-semibold
          rounded-lg 
          ${!isSelected ? optionStyle : "bg-blue-800"}
          ${disabled || isSelected
          ? "cursor-default"
          : `hover:border-4 transition delay-10 duration-100 ease-in-out transform
              hover:scale-105 hover:shadow-xl shadow-lg
              `
        }
          ${isSelected ? "text-gray-200" : ""}
          flex-1
          ${className || ""}
          `}
      onClick={
        disabled || isSelected
          ? () => { }
          : () => {
            onClick && onClick();
          }
      }
      disabled={disabled || isSelected}
    >
      {showNumberBadge && (
        <span className="w-4 h-4">
          <span className="animate-weakPing w-4 h-4 rounded-full absolute -right-1 -top-1 leading text-xs text-white  hidden md:block bg-blue-500 ">
            {index + 1}
          </span>
          <span className="w-4 h-4 rounded-full absolute -right-1 -top-1 leading text-xs text-white hidden md:block bg-blue-500">
            {index + 1}
          </span>
        </span>

      )}
      {text}
    </button>
  );
};

const getOptionStyle = (
  isSelected: boolean,
  showFeedback: boolean,
  isCorrectOption = false
) => {
  if (showFeedback) {
    return isCorrectOption ? OptionStyle.CORRECT : OptionStyle.DISABLED;
  }
  return isSelected ? OptionStyle.SELECTED : OptionStyle.DEFAULT;
};
interface Props {
  options: string[];
  onSelect: (option: string) => void;
  selected: string | undefined;
  correctOption: string;
  showFeedback: boolean;
}

// feedback mode -> disable buttons
const MultipleChoice = ({
  options,
  onSelect,
  selected,
  correctOption,
  showFeedback,
}: Props) => (
  <div className="flex-row m-4 justify-around">
    {options.map((o, i) => {
      const isSelected = o === selected;
      const isCorrectOption = o === correctOption;
      const optionStyle = getOptionStyle(
        isSelected,
        showFeedback,
        isCorrectOption
      );
      return (
        <OptionBlock
          key={i}
          index={i}
          text={o}
          onClick={() => {
            onSelect(o);
          }}
          optionStyle={optionStyle}
          disabled={showFeedback}
          isSelected={isSelected}
          showNumberBadge={!isSelected && !showFeedback}
        />
      );
    })}
  </div>
);

export default MultipleChoice;
