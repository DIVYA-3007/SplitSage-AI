import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
}: CardProps) {
  return (
    <div
      className={`
        rounded-3xl
        border
        border-slate-800
        bg-gradient-to-br
        from-slate-900
        via-slate-900
        to-slate-950
        shadow-lg
        p-6
        transition-all
        duration-300
        ${
          hover
            ? "hover:border-blue-500/40 hover:shadow-blue-500/10 hover:-translate-y-1"
            : ""
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}