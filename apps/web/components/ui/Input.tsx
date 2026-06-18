import {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="w-full space-y-2">

      {label && (
        <label className="block text-sm font-semibold text-slate-300">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`
          w-full
          rounded-2xl
          border
          border-slate-700
          bg-slate-900
          px-4
          py-3
          text-white
          placeholder:text-slate-500
          outline-none
          transition-all
          duration-300
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-500/20
          ${error ? "border-red-500" : ""}
          ${className}
        `}
      />

      {helperText && !error && (
        <p className="text-xs text-slate-500">
          {helperText}
        </p>
      )}

      {error && (
        <p className="text-xs text-red-400">
          {error}
        </p>
      )}

    </div>
  );
}

interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function TextArea({
  label,
  error,
  helperText,
  className = "",
  ...props
}: TextAreaProps) {
  return (
    <div className="w-full space-y-2">

      {label && (
        <label className="block text-sm font-semibold text-slate-300">
          {label}
        </label>
      )}

      <textarea
        {...props}
        className={`
          w-full
          rounded-2xl
          border
          border-slate-700
          bg-slate-900
          px-4
          py-3
          text-white
          placeholder:text-slate-500
          outline-none
          resize-none
          transition-all
          duration-300
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-500/20
          ${error ? "border-red-500" : ""}
          ${className}
        `}
      />

      {helperText && !error && (
        <p className="text-xs text-slate-500">
          {helperText}
        </p>
      )}

      {error && (
        <p className="text-xs text-red-400">
          {error}
        </p>
      )}

    </div>
  );
}