import React from "react";

export enum ButtonVariant {
  DANGER = "danger",
  WARNING = "warning",
  SECONDARY = "secondary",
  PRIMARY = "primary",
  CORRECT = "correct",
  INCORRECT = "incorrect",
  LIGHT = "light",
  DISABLED = "disabled",
}

const getButtonClasses = (variant: ButtonVariant): string => {
  switch (variant) {
    case ButtonVariant.DANGER: {
      return "bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200";
    }
    case ButtonVariant.DISABLED: {
      return "bg-gray-500 focus:ring-offset-red-200";
    }
    case ButtonVariant.WARNING: {
      return "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 focus:ring-offset-yellow-200";
    }
    case ButtonVariant.PRIMARY: {
      return "bg-blue-600 hover:bg-blue-900 focus:ring-blue-5600 focus:ring-offset-blue-300";
    }
    case ButtonVariant.SECONDARY: {
      return "bg-blue-400 hover:bg-blue-500 focus:ring-gray-500 focus:ring-offset-gray-200";
    }
    case ButtonVariant.CORRECT: {
      return "bg-green-400 hover:bg-green-500 focus:ring-green-500 focus:ring-offset-green-200";
    }
    case ButtonVariant.INCORRECT: {
      return "bg-red-400 hover:bg-red-500 focus:ring-red-500 focus:ring-offset-red-200";
    }
    case ButtonVariant.LIGHT: {
      return "bg-white hover:bg-blue-800 focus:ring-red-500 focus:ring-offset-red-200 text-blue-800 hover:text-white";
    }
    default: {
      return "";
    }
  }
};

interface ButtonProps {
  variant?: ButtonVariant;
  children?: React.ReactNode;
  onClick?: () => any;
  className?: string;
  badge?: string;
  hotkey?: string;
}

export const RawButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = ButtonVariant.PRIMARY, children, onClick, className, hotkey },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`text-white ${className}  px-4 py-2  w-full transition ease-in duration-100 scale-110 text-center text-base font-semibold shadow-md rounded-lg inline-block my-2 ${getButtonClasses(
          variant
        )}`}
        onClick={() => {
          onClick && onClick();
        }}
      >
        {/* <span className="w-4 h-4 rounded-full absolute -right-1 -top-1 leading text-xs text-white  hidden md:block bg-blue-500 ">
          {"dsf"}
        </span> */}
        {children}
      </button>
    );
  }
);

export const Button = ({ className, badge, ...restProps }: ButtonProps) => (
  <div className={`${className} relative`}>
    {badge && (
      <span className="w-4 h-4 rounded-full absolute -right-1 top-0 leading text-xs text-white  hidden md:block bg-blue-500 text-center">
        {badge}
      </span>
    )}
    <RawButton {...restProps} />
  </div>
);
