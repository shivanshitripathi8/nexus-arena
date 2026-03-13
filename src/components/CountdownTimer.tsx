import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  targetDate: string;
  className?: string;
  size?: "sm" | "lg";
}

function getTimeLeft(target: string) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    hours: Math.floor(diff / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    total: diff,
  };
}

export function CountdownTimer({ targetDate, className, size = "sm" }: CountdownTimerProps) {
  const [time, setTime] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (time.total <= 0) return <span className="text-neon-red font-bold text-sm">Started</span>;

  const blocks = [
    { label: "HRS", value: time.hours },
    { label: "MIN", value: time.minutes },
    { label: "SEC", value: time.seconds },
  ];

  return (
    <div className={cn("flex gap-2", className)}>
      {blocks.map((b) => (
        <div key={b.label} className={cn(
          "flex flex-col items-center glass rounded-xl",
          size === "lg" ? "px-5 py-3" : "px-2.5 py-1.5"
        )}>
          <span className={cn(
            "font-extrabold text-foreground tabular-nums",
            size === "lg" ? "text-3xl" : "text-lg"
          )}>
            {String(b.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] text-muted-foreground font-medium tracking-wider">{b.label}</span>
        </div>
      ))}
    </div>
  );
}
