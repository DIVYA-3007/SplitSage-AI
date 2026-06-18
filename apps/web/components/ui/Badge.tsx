import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?:
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "gray";
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
  className?: string;
}

export default function Badge({
  children,
  variant = "primary",
  size = "md",
  rounded = true,
  className = "",
}: BadgeProps) {
  const variantStyles = {
    primary:
      "bg-blue-500/15 text-blue-400 border border-blue-500/30",

    success:
      "bg-green-500/15 text-green-400 border border-green-500/30",

    warning:
      "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",

    danger:
      "bg-red-500/15 text-red-400 border border-red-500/30",

    info:
      "bg-purple-500/15 text-purple-400 border border-purple-500/30",

    gray:
      "bg-slate-700/30 text-slate-300 border border-slate-600",
  };

  const sizeStyles = {
    sm: "px-2 py-1 text-xs",

    md: "px-3 py-1.5 text-sm",

    lg: "px-4 py-2 text-base",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        font-semibold
        tracking-wide
        transition-all
        duration-300
        backdrop-blur-sm
        ${
          rounded
            ? "rounded-full"
            : "rounded-xl"
        }
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}