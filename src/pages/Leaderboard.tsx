import { motion } from "framer-motion";
import { Trophy, Crosshair, Star } from "lucide-react";
import { mockLeaderboard } from "@/lib/mock-data";

const rankColors = ["text-neon-yellow", "text-muted-foreground", "text-neon-orange"];

export default function Leaderboard() {
  return (
    <div className="pb-24 lg:pb-8">
      <h1 className="text-2xl font-extrabold text-foreground mb-6">Leaderboard</h1>

      {/* Top 3 podium */}
      <div className="flex items-end justify-center gap-3 mb-8">
        {[1, 0, 2].map((idx) => {
          const entry = mockLeaderboard[idx];
          if (!entry) return null;
          const isFirst = idx === 0;
          return (
            <motion.div
              key={entry.rank}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.15 }}
              className={`glass rounded-2xl p-4 text-center flex-1 ${isFirst ? "pb-8" : ""}`}
            >
              <div className={`text-3xl font-extrabold mb-1 ${rankColors[entry.rank - 1] || "text-foreground"}`}>
                #{entry.rank}
              </div>
              <p className="text-sm font-bold text-foreground truncate">{entry.teamName}</p>
              <p className="text-xs text-muted-foreground">{entry.kills} kills</p>
              {entry.prize > 0 && (
                <p className="text-sm font-extrabold text-neon-orange mt-2">₹{entry.prize.toLocaleString()}</p>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Full table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="grid grid-cols-5 gap-2 px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider border-b border-border/50">
          <span>Rank</span>
          <span className="col-span-2">Team</span>
          <span className="text-center">Kills</span>
          <span className="text-right">Prize</span>
        </div>
        {mockLeaderboard.map((entry, i) => (
          <motion.div
            key={entry.rank}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="grid grid-cols-5 gap-2 px-4 py-3 items-center hover:bg-secondary/50 transition-colors"
          >
            <span className={`font-extrabold ${rankColors[i] || "text-foreground"}`}>#{entry.rank}</span>
            <span className="col-span-2 text-sm font-semibold text-foreground truncate">{entry.teamName}</span>
            <span className="text-center text-sm text-muted-foreground flex items-center justify-center gap-1">
              <Crosshair className="w-3.5 h-3.5 text-neon-red" />
              {entry.kills}
            </span>
            <span className="text-right text-sm font-bold text-neon-orange">
              {entry.prize > 0 ? `₹${entry.prize.toLocaleString()}` : "—"}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
