import { ButtonHTMLAttributes } from "react";

const IconButton = ({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`border-2 bg-background border-solid border-gray-500/50 hover:border-white disabled:hover:border-gray-500/50 p-2 rounded-full flex items-center  justify-center disabled:opacity-30 transition-all focus-visible:ring-4 ring-offset-2 ${className}`}
    />
  );
};

export default IconButton;
