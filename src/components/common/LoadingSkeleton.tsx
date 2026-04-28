const widths = ["50%", "80%", "65%", "90%", "45%"];

export function LoadingSkeleton() {
  return (
    <div className="flex w-full flex-col gap-2">
      {widths.map((width) => (
        <div
          key={width}
          className="h-2 rounded-sm"
          style={{
            width,
            background: "linear-gradient(90deg, #1A1A1A 25%, #222222 50%, #1A1A1A 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        />
      ))}
    </div>
  );
}
