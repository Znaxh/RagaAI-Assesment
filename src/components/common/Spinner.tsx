export function Spinner({ label = "LOADING_DATA_" }: { label?: string }) {
  return <div className="blink text-xs uppercase tracking-[0.1em] text-[#6B6B6B]">{label}</div>;
}
