import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface GradientStatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  gradient: "purple-pink" | "cyan-blue" | "orange-green";
  className?: string;
}

const gradientMap = {
  "purple-pink": "gradient-purple-pink",
  "cyan-blue": "gradient-cyan-blue",
  "orange-green": "gradient-orange-green",
};

const glowMap = {
  "purple-pink": "glow-purple",
  "cyan-blue": "glow-cyan",
  "orange-green": "glow-green",
};

export function GradientStatCard({ title, value, icon: Icon, gradient, className }: GradientStatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "relative rounded-2xl p-[1px] overflow-hidden",
        glowMap[gradient],
        className
      )}
    >
      <div className={cn("absolute inset-0 opacity-20", gradientMap[gradient])} />
      <div className="relative glass-strong rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className={cn("text-3xl font-extrabold mt-1 text-gradient-purple-pink",
              gradient === "cyan-blue" && "text-gradient-cyan-blue",
              gradient === "orange-green" && "bg-clip-text text-transparent bg-gradient-to-r from-neon-orange to-neon-green"
            )}>
              {typeof value === "number" ? `₹${value.toLocaleString()}` : value}
            </p>
          </div>
          <div className={cn("p-3 rounded-xl", gradientMap[gradient])}>
            <Icon className="h-6 w-6 text-foreground" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
