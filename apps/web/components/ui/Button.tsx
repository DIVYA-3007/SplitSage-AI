import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "success" | "danger";
  loading?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  loading = false,
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white",

    secondary:
      "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700",

    success:
      "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white",

    danger:
      "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white",
  };

  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex
        items-center
        justify-center
        rounded-2xl
        px-6
        py-3
        font-semibold
        text-lg
        transition-all
        duration-300
        shadow-md
        hover:shadow-xl
        hover:-translate-y-0.5
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:translate-y-0
        ${fullWidth ? "w-full" : ""}
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}