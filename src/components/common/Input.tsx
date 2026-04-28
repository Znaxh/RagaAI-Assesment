import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <label className="flex w-full flex-col gap-1">
      {label ? <span className="text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B]">{label}</span> : null}
      <input
        {...props}
        className={`rounded-sm border bg-page px-3 py-2 text-[13px] text-white outline-none transition-colors focus:border-accent-blue ${error ? "border-[#EF4444]" : "border-border"} ${className}`}
      />
      {error ? <span className="text-[11px] uppercase text-[#EF4444]">ERROR: {error}</span> : null}
    </label>
  );
}
