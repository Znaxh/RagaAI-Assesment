import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export function Button({ className = "", loading, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`border border-border bg-transparent px-3 py-2 text-xs uppercase tracking-[0.1em] text-[#A0A0A0] transition-all duration-120 hover:border-accent-blue hover:bg-[#0D1929] hover:text-white active:bg-accent-blue ${className}`}
    >
      {loading ? <span className="blink">_</span> : children}
    </button>
  );
}
