import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Hash, Users, Shield } from "lucide-react";
import { mockMyMatches } from "@/lib/mock-data";
import { CountdownTimer } from "@/components/CountdownTimer";
import { toast } from "sonner";

export default function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const match = mockMyMatches.find((m) => m.tournament._id === id);

  if (!match) return <div className="p-8 text-center text-muted-foreground">Room not found</div>;

  const roomId = match.tournament.roomId || "ARENA-7X92K";
  const roomPassword = match.tournament.roomPassword || "battle2025";

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`);
  };

  return (
    <div className="pb-24 lg:pb-8">
      <button onClick={() => navigate(-1)} className="p-2 rounded-xl glass mb-4 inline-flex">
        <ArrowLeft className="w-5 h-5 text-foreground" />
      </button>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-extrabold text-foreground mb-1">{match.tournament.title}</h1>
        <p className="text-sm text-muted-foreground">Match Lobby</p>
      </div>

      {/* Room ID */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass rounded-2xl p-8 text-center mb-6 glow-purple"
      >
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Room ID</p>
        <p className="text-4xl font-extrabold text-gradient-purple-pink tracking-wider mb-4">{roomId}</p>
        <button
          onClick={() => copyToClipboard(roomId, "Room ID")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl gradient-purple-pink text-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Copy className="w-4 h-4" />
          Copy Room ID
        </button>
      </motion.div>

      {/* Password */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-6 text-center mb-6"
      >
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Password</p>
        <p className="text-2xl font-bold text-foreground tracking-wider mb-3">{roomPassword}</p>
        <button
          onClick={() => copyToClipboard(roomPassword, "Password")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary text-foreground text-sm font-semibold hover:bg-muted transition-colors"
        >
          <Copy className="w-4 h-4" />
          Copy Password
        </button>
      </motion.div>

      {/* Info */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="glass rounded-2xl p-4 text-center">
          <Hash className="w-5 h-5 text-neon-cyan mx-auto mb-1" />
          <p className="text-xs text-muted-foreground">Slot</p>
          <p className="text-xl font-extrabold text-foreground">#{match.slotNumber}</p>
        </div>
        <div className="glass rounded-2xl p-4 text-center">
          <Shield className="w-5 h-5 text-neon-green mx-auto mb-1" />
          <p className="text-xs text-muted-foreground">Position</p>
          <p className="text-xl font-extrabold text-foreground">{match.teamPosition || "N/A"}</p>
        </div>
      </div>

      {/* Countdown */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-3">Match starts in</p>
        <CountdownTimer targetDate={match.tournament.startTime} size="lg" className="justify-center" />
      </div>
    </div>
  );
}
