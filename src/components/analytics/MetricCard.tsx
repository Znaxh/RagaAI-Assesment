import { memo, type ReactNode } from "react";
import { Card } from "../common/Card";

interface MetricCardProps {
  label: string;
  value: string | number;
  sublabel: string;
  rightContent?: ReactNode;
  isLive?: boolean;
  statusText?: string;
  className?: string;
}

export const MetricCard = memo(function MetricCard({
  label,
  value,
  sublabel,
  rightContent,
  isLive,
  statusText,
  className = "",
}: MetricCardProps) {
  return (
    <Card label={label} rightLabel={isLive ? "live feed" : "●●"} className={className}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[clamp(28px,3.5vw,48px)] font-bold leading-none tracking-[-0.02em] text-white">{value}</div>
          <div className="mt-2 text-[10px] uppercase tracking-[0.15em] text-[#6B6B6B]">{sublabel}</div>
          {statusText ? <div className="mt-2 text-xs uppercase text-accent-amber">{statusText}</div> : null}
        </div>
        {rightContent ? <div className="pt-1">{rightContent}</div> : null}
      </div>
    </Card>
  );
});
