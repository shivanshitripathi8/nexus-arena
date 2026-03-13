import { motion } from "framer-motion";
import { Gamepad2, Hash, DoorOpen } from "lucide-react";
import { mockMyMatches } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { useNavigate } from "react-router-dom";

export default function MyMatches() {
  const navigate = useNavigate();

  return (
    <div className="pb-24 lg:pb-8">
      <h1 className="text-2xl font-extrabold text-foreground mb-6">My Matches</h1>

      {mockMyMatches.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <Gamepad2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No matches yet. Join a tournament!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mockMyMatches.map((match, i) => (
            <motion.div
              key={match._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-5 group hover:border-neon-purple/40 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <StatusBadge status={match.tournament.status} />
                <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-secondary text-muted-foreground">
                  {match.tournament.matchType}
                </span>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-4">{match.tournament.title}</h3>

              <div className="flex flex-wrap gap-2 mb-4">
                <div className="glass rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-neon-cyan" />
                  <span className="text-xs font-bold text-foreground">Slot {match.slotNumber}</span>
                </div>
                {match.roomNumber && (
                  <div className="glass rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                    <DoorOpen className="w-3.5 h-3.5 text-neon-orange" />
                    <span className="text-xs font-bold text-foreground">Room {match.roomNumber}</span>
                  </div>
                )}
                {match.teamPosition && (
                  <div className="glass rounded-lg px-3 py-1.5">
                    <span className="text-xs font-bold text-neon-green">{match.teamPosition}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => navigate(`/room/${match.tournament._id}`)}
                className="w-full py-2.5 rounded-xl gradient-cyan-blue text-foreground font-bold text-sm hover:opacity-90 transition-opacity glow-cyan"
              >
                View Room Details
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
