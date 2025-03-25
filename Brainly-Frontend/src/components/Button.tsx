import { ReactElement }  from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon: ReactElement;
}


// ADD font weight and make the buttons look better

const defaultStyles = "px-4 py-2 rounded-md flex items-center gap-2 "; // default styles for the button

//  what if there are more than 2 variants? cant use ternary operator then, hence we create an object to store the classes for each variant
const variantClasses = {
  primary: "bg-indigo-600 text-white",
  secondary: "bg-indigo-100 text-indigo-700",
};

export function Button({variant, text, startIcon}: ButtonProps) {
  return (
      <button className={variantClasses[variant] + " " + defaultStyles} >
        {startIcon}
        {text}
      </button>
  );
}
