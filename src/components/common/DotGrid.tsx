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
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, ${dotSize}px)`,
        gap,
      }}
    >
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          style={{
            width: dotSize,
            height: dotSize,
            background: index < filled ? activeColor : inactiveColor,
          }}
        />
      ))}
    </div>
  );
});
