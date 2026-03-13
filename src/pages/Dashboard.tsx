import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, Zap } from "lucide-react";
import { Tournament } from "@/lib/types";
import { mockTournaments, mockProfile } from "@/lib/mock-data";
import { GradientStatCard } from "@/components/GradientStatCard";
import { TournamentCard } from "@/components/TournamentCard";
import { StatusBadge } from "@/components/StatusBadge";
import api from "@/lib/api";

export default function Dashboard() {
  const [tournaments, setTournaments] = useState<Tournament[]>(mockTournaments);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.get("/tournament/list").then((res) => setTournaments(res.data)).catch(() => {});
  }, []);

  const upcoming = tournaments.filter((t) => t.status === "UPCOMING");
  const live = tournaments.filter((t) => t.status === "LIVE");
  const completed = tournaments.filter((t) => t.status === "COMPLETED");

  return (
    <div className="pb-24 lg:pb-8 space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back,</p>
          <h1 className="text-2xl font-extrabold text-foreground">{mockProfile.bgmiName} 🎮</h1>
        </div>
        <div className="w-10 h-10 rounded-full gradient-purple-pink flex items-center justify-center">
          <span className="text-foreground font-bold text-sm">{mockProfile.name[0]}</span>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <GradientStatCard title="Wallet Balance" value={mockProfile.walletBalance} icon={Wallet} gradient="purple-pink" />
        <GradientStatCard title="Total Winnings" value={mockProfile.totalEarnings} icon={TrendingUp} gradient="cyan-blue" />
      </div>

      {/* Upcoming carousel */}
      {upcoming.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-neon-yellow" />
            <h2 className="text-lg font-bold text-foreground">Upcoming Tournaments</h2>
          </div>
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-1 px-1"
            style={{ scrollbarWidth: "none" }}
          >
            {upcoming.map((t, i) => (
              <TournamentCard key={t._id} tournament={t} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Live */}
      {live.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <StatusBadge status="LIVE" />
            <h2 className="text-lg font-bold text-foreground">Live Now</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {live.map((t, i) => (
              <TournamentCard key={t._id} tournament={t} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Completed */}
      {completed.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <StatusBadge status="COMPLETED" />
            <h2 className="text-lg font-bold text-foreground">Completed</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {completed.map((t, i) => (
              <TournamentCard key={t._id} tournament={t} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
