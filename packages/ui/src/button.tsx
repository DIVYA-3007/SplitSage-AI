"use client";

import { ReactNode } from "react";
import toast from "react-hot-toast";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({
  children,
  className = "",
  appName,
  onClick,
  disabled = false,
}: ButtonProps) => {
  function handleClick() {
    if (disabled) return;

    if (onClick) {
      onClick();
      return;
    }

    toast.success(
      `Welcome to ${appName}!`
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        transition-all
        duration-300
        hover:scale-105
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
};