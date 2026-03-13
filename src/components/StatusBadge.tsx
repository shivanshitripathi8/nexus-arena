import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "UPCOMING" | "LIVE" | "COMPLETED";
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
        status === "UPCOMING" && "gradient-yellow-orange text-background",
        status === "LIVE" && "bg-neon-red text-foreground glow-red animate-pulse-glow",
        status === "COMPLETED" && "bg-neon-green text-background glow-green",
        className
      )}
    >
      {status === "LIVE" && <span className="w-2 h-2 rounded-full bg-foreground animate-ping" />}
      {status}
    </span>
  );
}
