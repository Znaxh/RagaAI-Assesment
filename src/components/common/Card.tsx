import type { ReactNode } from "react";

interface CardProps {
  label?: string;
  rightLabel?: string;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function Card({ label, rightLabel, children, className = "", noPadding = false }: CardProps) {
  return (
    <div className={`bg-card border border-border rounded-md transition-all duration-150 hover:border-border-hover hover:shadow-[inset_0_0_0_1px_#3A3A3A] ${className}`}>
      {label && (
        <>
          <div className="flex items-center justify-between px-5 py-3">
            <span className="mono-label">{label}</span>
            <span className={`text-[11px] text-[#6B6B6B] ${rightLabel === "live feed" ? "italic font-serif" : ""}`}>{rightLabel}</span>
          </div>
          <div className="h-px bg-[#1E1E1E]" />
        </>
      )}
      <div className={noPadding ? "" : "p-5"}>{children}</div>
    </div>
  );
}
