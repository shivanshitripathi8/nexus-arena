import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Users } from "lucide-react";
import { Team } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TeamSelectorModalProps {
  open: boolean;
  onClose: () => void;
  teams: Team[];
  matchType: "DUO" | "SQUAD";
  onSelectTeam: (teamId: string) => void;
  onCreateTeam: () => void;
}

export function TeamSelectorModal({ open, onClose, teams, matchType, onSelectTeam, onCreateTeam }: TeamSelectorModalProps) {
  const filteredTeams = teams.filter((t) => t.matchType === matchType);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong rounded-2xl w-full max-w-md p-6 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-foreground">Select Team</h2>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-secondary transition-colors">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {filteredTeams.length > 0 ? (
              <div className="space-y-3 mb-4">
                {filteredTeams.map((team) => (
                  <button
                    key={team._id}
                    onClick={() => onSelectTeam(team._id)}
                    className="w-full glass rounded-xl p-4 text-left hover:border-neon-purple/40 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg gradient-purple-pink">
                        <Users className="w-4 h-4 text-foreground" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground group-hover:text-gradient-purple-pink">{team.name}</p>
                        <p className="text-xs text-muted-foreground">{team.members.length + 1} members · {team.matchType}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-6">No {matchType} teams found</p>
            )}

            <button
              onClick={onCreateTeam}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-neon-purple/40 text-neon-purple font-semibold hover:bg-neon-purple/10 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create New Team
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
