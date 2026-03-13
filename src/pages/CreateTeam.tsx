import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, UserPlus, Loader2, Trash2 } from "lucide-react";
import api from "@/lib/api";
import { toast } from "sonner";

interface Teammate {
  bgmiName: string;
  bgmiId: string;
}

export default function CreateTeam() {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState("");
  const [matchType, setMatchType] = useState<"DUO" | "SQUAD">("SQUAD");
  const [teammates, setTeammates] = useState<Teammate[]>([{ bgmiName: "", bgmiId: "" }]);
  const [loading, setLoading] = useState(false);

  const requiredCount = matchType === "DUO" ? 1 : 3;

  const updateTeammate = (i: number, field: keyof Teammate, value: string) => {
    setTeammates((prev) => prev.map((t, idx) => (idx === i ? { ...t, [field]: value } : t)));
  };

  const addTeammate = () => {
    if (teammates.length < requiredCount) {
      setTeammates((prev) => [...prev, { bgmiName: "", bgmiId: "" }]);
    }
  };

  const removeTeammate = (i: number) => {
    setTeammates((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName) { toast.error("Team name is required"); return; }
    if (teammates.length !== requiredCount) { toast.error(`Need exactly ${requiredCount} teammate(s)`); return; }
    if (teammates.some((t) => !t.bgmiName || !t.bgmiId)) { toast.error("Fill all teammate details"); return; }

    setLoading(true);
    try {
      await api.post("/team/create", { name: teamName, matchType, members: teammates });
      toast.success("Team created!");
      navigate(-1);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create team");
    } finally {
      setLoading(false);
    }
  };

  // Adjust teammates count when matchType changes
  const handleMatchTypeChange = (type: "DUO" | "SQUAD") => {
    setMatchType(type);
    const req = type === "DUO" ? 1 : 3;
    setTeammates(Array.from({ length: req }, (_, i) => teammates[i] || { bgmiName: "", bgmiId: "" }));
  };

  return (
    <div className="pb-24 lg:pb-8">
      <button onClick={() => navigate(-1)} className="p-2 rounded-xl glass mb-4 inline-flex">
        <ArrowLeft className="w-5 h-5 text-foreground" />
      </button>

      <h1 className="text-2xl font-extrabold text-foreground mb-6">Create Team</h1>

      <form onSubmit={handleCreate} className="space-y-4">
        <div className="glass rounded-2xl p-5 space-y-4">
          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full bg-secondary rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-neon-purple/50"
          />

          <div className="flex gap-3">
            {(["DUO", "SQUAD"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleMatchTypeChange(type)}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                  matchType === type
                    ? "gradient-purple-pink text-foreground glow-purple"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground font-medium">
            Teammates ({teammates.length}/{requiredCount})
          </p>
          {teammates.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-2xl p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neon-cyan">Player {i + 2}</span>
                {teammates.length > 1 && (
                  <button type="button" onClick={() => removeTeammate(i)}>
                    <Trash2 className="w-4 h-4 text-neon-red" />
                  </button>
                )}
              </div>
              <input
                type="text"
                placeholder="BGMI Name"
                value={t.bgmiName}
                onChange={(e) => updateTeammate(i, "bgmiName", e.target.value)}
                className="w-full bg-secondary rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-neon-cyan/50"
              />
              <input
                type="text"
                placeholder="BGMI ID"
                value={t.bgmiId}
                onChange={(e) => updateTeammate(i, "bgmiId", e.target.value)}
                className="w-full bg-secondary rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-neon-cyan/50"
              />
            </motion.div>
          ))}

          {teammates.length < requiredCount && (
            <button
              type="button"
              onClick={addTeammate}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-neon-purple/40 text-neon-purple font-semibold hover:bg-neon-purple/10 transition-colors"
            >
              <UserPlus className="w-5 h-5" />
              Add Teammate
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-2xl gradient-purple-pink text-foreground font-bold text-lg glow-purple hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="w-5 h-5 animate-spin" />}
          Create Team
        </button>
      </form>
    </div>
  );
}
