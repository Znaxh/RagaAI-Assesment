import { memo } from "react";

interface DotGridProps {
  total: number;
  filled: number;
  cols?: number;
  dotSize?: number;
  gap?: number;
  activeColor?: string;
  inactiveColor?: string;
}

export const DotGrid = memo(function DotGrid({
  total,
  filled,
  cols = 7,
  dotSize = 10,
  gap = 4,
  activeColor = "#3B6FD4",
  inactiveColor = "#1E2A3A",
}: DotGridProps) {
  return (
    <div className="flex flex-wrap gap-1 md:grid md:gap-1" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          className="h-2 w-2 md:h-[10px] md:w-[10px]"
          style={{
            background: index < filled ? activeColor : inactiveColor,
          }}
        />
      ))}
    </div>
  );
});
