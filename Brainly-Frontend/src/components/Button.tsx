import { ReactElement }  from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  widthFull?: boolean;
  isActive?: boolean;
  className?: string;
}


// ADD font weight and make the buttons look better

const defaultStyles = "px-4 py-2 rounded-md flex items-center gap-2 justify-center cursor-pointer"; // default styles for the button

//  what if there are more than 2 variants? cant use ternary operator then, hence we create an object to store the classes for each variant
const variantClasses = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800",
  secondary: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 active:bg-indigo-300",
};

export function Button({
  variant,
  text,
  startIcon,
  onClick,
  widthFull,
  isActive,
  className
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        ${variantClasses[variant]} 
        ${defaultStyles}
        ${widthFull ? "w-full" : ""}
        ${isActive ? "ring-2 ring-indigo-500 ring-offset-2" : ""}
        transform transition-all duration-200
        hover:scale-105 active:scale-95
        ${className || ""}
      `}
    >
      {startIcon}
      {text}
    </button>
  );
}
