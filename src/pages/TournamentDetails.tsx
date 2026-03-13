import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Users, Coins, Trophy, ChevronDown, ChevronUp } from "lucide-react";
import { mockTournaments, mockTeams } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { CountdownTimer } from "@/components/CountdownTimer";
import { TeamSelectorModal } from "@/components/TeamSelectorModal";
import { SuccessDialog } from "@/components/SuccessDialog";
import { toast } from "sonner";

export default function TournamentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tournament = mockTournaments.find((t) => t._id === id);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [teamModal, setTeamModal] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);

  if (!tournament) return <div className="p-8 text-center text-muted-foreground">Tournament not found</div>;

  const handleJoin = () => {
    if (tournament.matchType === "SOLO") {
      setSuccessDialog(true);
      toast.success("Joined tournament!");
    } else {
      setTeamModal(true);
    }
  };

  return (
    <div className="pb-24 lg:pb-8">
      {/* Header banner */}
      <div className="relative rounded-2xl overflow-hidden mb-6">
        <div className="h-48 gradient-purple-pink opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl glass mb-3 inline-flex">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <StatusBadge status={tournament.status} />
            <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-secondary text-muted-foreground">
              {tournament.matchType}
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">{tournament.title}</h1>
        </div>
      </div>

      {/* Info chips */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="glass rounded-xl px-4 py-2 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-neon-cyan" />
          <span className="text-sm font-medium text-foreground">{tournament.map}</span>
        </div>
        <div className="glass rounded-xl px-4 py-2 flex items-center gap-2">
          <Coins className="w-4 h-4 text-neon-yellow" />
          <span className="text-sm font-medium text-foreground">₹{tournament.entryFee} Entry</span>
        </div>
        <div className="glass rounded-xl px-4 py-2 flex items-center gap-2">
          <Users className="w-4 h-4 text-neon-pink" />
          <span className="text-sm font-medium text-foreground">{tournament.filledSlots}/{tournament.totalSlots} Joined</span>
        </div>
      </div>

      {/* Countdown */}
      {tournament.status === "UPCOMING" && (
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground mb-3 font-medium">Match starts in</p>
          <CountdownTimer targetDate={tournament.startTime} size="lg" className="justify-center" />
        </div>
      )}

      {/* Prize breakdown */}
      {tournament.prizes && (
        <div className="glass rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-neon-orange" />
            <h2 className="text-lg font-bold text-foreground">Prize Pool — ₹{tournament.prizePool.toLocaleString()}</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {tournament.prizes.map((p) => (
              <motion.div
                key={p.rank}
                whileHover={{ scale: 1.05 }}
                className="glass rounded-xl p-3 text-center"
              >
                <p className="text-xs text-muted-foreground">#{p.rank}</p>
                <p className="text-lg font-extrabold text-neon-orange">₹{p.amount.toLocaleString()}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Rules */}
      {tournament.rules && (
        <div className="glass rounded-2xl mb-6 overflow-hidden">
          <button
            onClick={() => setRulesOpen(!rulesOpen)}
            className="w-full flex items-center justify-between p-5"
          >
            <h2 className="text-lg font-bold text-foreground">Tournament Rules</h2>
            {rulesOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
          </button>
          {rulesOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="px-5 pb-5">
              <ul className="space-y-2">
                {tournament.rules.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full gradient-purple-pink mt-2 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      )}

      {/* Join button */}
      {tournament.status === "UPCOMING" && (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleJoin}
          className="w-full py-4 rounded-2xl gradient-purple-pink text-foreground font-bold text-lg glow-purple hover:opacity-90 transition-opacity"
        >
          Join Tournament — ₹{tournament.entryFee}
        </motion.button>
      )}

      <TeamSelectorModal
        open={teamModal}
        onClose={() => setTeamModal(false)}
        teams={mockTeams}
        matchType={tournament.matchType as "DUO" | "SQUAD"}
        onSelectTeam={() => {
          setTeamModal(false);
          setSuccessDialog(true);
          toast.success("Joined with team!");
        }}
        onCreateTeam={() => {
          setTeamModal(false);
          navigate("/create-team");
        }}
      />

      <SuccessDialog
        open={successDialog}
        onClose={() => setSuccessDialog(false)}
        slotNumber={Math.floor(Math.random() * 25) + 1}
        roomNumber={Math.floor(Math.random() * 5) + 1}
      />
    </div>
  );
}
