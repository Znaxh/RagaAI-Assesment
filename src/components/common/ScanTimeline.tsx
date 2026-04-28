interface ScanTimelineProps {
  startTime: string;
  endTime: string;
  currentTime: string;
  isScanning?: boolean;
  markers?: { start: number; end: number; color: string }[];
}

export function ScanTimeline({ startTime, endTime, currentTime, isScanning, markers = [] }: ScanTimelineProps) {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-[11px] text-[#4A4A4A]">
        <span>{startTime}</span>
        {isScanning ? <span className="blink text-[12px] text-accent-amber">SCANNING...</span> : <span />}
        <span>{endTime}</span>
      </div>
      <div className="relative h-2 w-full bg-surface">
        {Array.from({ length: 11 }).map((_, i) => (
          <span key={i} className="absolute top-0 h-2 w-px bg-border" style={{ left: `${i * 10}%` }} />
        ))}
        {markers.map((marker, i) => (
          <span
            key={i}
            className="absolute top-0 h-2"
            style={{ left: `${marker.start}%`, width: `${marker.end - marker.start}%`, background: marker.color }}
          />
        ))}
      </div>
      <div className="mt-2 text-right text-[9px] uppercase tracking-[0.1em] text-[#4A4A4A]">CURRENT TIMESTAMP</div>
      <div className="text-right text-sm text-white">{currentTime}</div>
    </div>
  );
}
