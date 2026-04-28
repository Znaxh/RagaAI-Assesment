import { memo } from "react";

interface BadgeProps {
  status: "Active" | "Critical" | "Pending" | "Discharged";
}

const colorMap: Record<BadgeProps["status"], string> = {
  Active: "#22C55E",
  Critical: "#EF4444",
  Pending: "#E8B84B",
  Discharged: "#6B7280",
};

export const Badge = memo(function Badge({ status }: BadgeProps) {
  const color = colorMap[status];
  return (
    <span
      className="rounded-[3px] border bg-transparent px-2 py-[2px] text-[10px] uppercase tracking-[0.08em]"
      style={{ borderColor: color, color }}
    >
      {status}
    </span>
  );
});
