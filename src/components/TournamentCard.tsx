import { motion } from "framer-motion";
import { Users, MapPin, Trophy, Coins } from "lucide-react";
import { Tournament } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";
import { CountdownTimer } from "./CountdownTimer";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface TournamentCardProps {
  tournament: Tournament;
  index?: number;
}

export function TournamentCard({ tournament, index = 0 }: TournamentCardProps) {
  const navigate = useNavigate();
  const progress = (tournament.filledSlots / tournament.totalSlots) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ scale: 1.02, y: -4 }}
      onClick={() => navigate(`/tournament/${tournament._id}`)}
      className="glass rounded-2xl p-4 cursor-pointer group hover:border-neon-purple/40 transition-all duration-300 min-w-[280px] snap-start"
    >
      <div className="flex items-center justify-between mb-3">
        <StatusBadge status={tournament.status} />
        <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-secondary text-muted-foreground">
          {tournament.matchType}
        </span>
      </div>

      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-gradient-purple-pink transition-all">
        {tournament.title}
      </h3>

      <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-neon-cyan" />
          {tournament.map}
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5 text-neon-pink" />
          {tournament.filledSlots}/{tournament.totalSlots}
        </span>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Coins className="w-4 h-4 text-neon-yellow" />
          <span className="text-sm font-semibold text-foreground">₹{tournament.entryFee}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-neon-orange" />
          <span className="text-sm font-bold text-neon-orange">₹{tournament.prizePool.toLocaleString()}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 rounded-full bg-secondary mb-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, delay: index * 0.1 }}
          className={cn(
            "h-full rounded-full",
            progress >= 90 ? "gradient-orange-green" : "gradient-purple-pink"
          )}
        />
      </div>

      {tournament.status === "UPCOMING" && (
        <CountdownTimer targetDate={tournament.startTime} />
      )}

      {tournament.status === "UPCOMING" && (
        <button className="w-full mt-3 py-2.5 rounded-xl gradient-purple-pink text-foreground font-bold text-sm hover:opacity-90 transition-opacity glow-purple">
          Join Tournament
        </button>
      )}
    </motion.div>
  );
}
