import { motion } from "framer-motion";
import { Wallet, ArrowUpRight, ArrowDownLeft, Plus } from "lucide-react";
import { GradientStatCard } from "@/components/GradientStatCard";
import { mockProfile } from "@/lib/mock-data";

const transactions = [
  { id: 1, type: "credit", label: "Tournament Win — BGMI Pro", amount: 2500, date: "Mar 12" },
  { id: 2, type: "debit", label: "Entry Fee — Solo Sniper", amount: -20, date: "Mar 11" },
  { id: 3, type: "credit", label: "Wallet Top-up", amount: 500, date: "Mar 10" },
  { id: 4, type: "debit", label: "Entry Fee — Duo Blitz", amount: -30, date: "Mar 9" },
  { id: 5, type: "credit", label: "Tournament Win — Weekend Cup", amount: 1000, date: "Mar 8" },
];

export default function WalletPage() {
  return (
    <div className="pb-24 lg:pb-8">
      <h1 className="text-2xl font-extrabold text-foreground mb-6">Wallet</h1>

      <GradientStatCard title="Available Balance" value={mockProfile.walletBalance} icon={Wallet} gradient="purple-pink" className="mb-4" />

      <button className="w-full py-3 rounded-xl gradient-orange-green text-background font-bold text-sm mb-6 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity glow-green">
        <Plus className="w-5 h-5" />
        Add Money
      </button>

      <h2 className="text-lg font-bold text-foreground mb-4">Recent Transactions</h2>
      <div className="space-y-3">
        {transactions.map((tx, i) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-xl p-4 flex items-center gap-3"
          >
            <div className={`p-2 rounded-lg ${tx.type === "credit" ? "bg-neon-green/10" : "bg-neon-red/10"}`}>
              {tx.type === "credit" ? (
                <ArrowDownLeft className="w-4 h-4 text-neon-green" />
              ) : (
                <ArrowUpRight className="w-4 h-4 text-neon-red" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{tx.label}</p>
              <p className="text-xs text-muted-foreground">{tx.date}</p>
            </div>
            <span className={`text-sm font-bold ${tx.amount > 0 ? "text-neon-green" : "text-neon-red"}`}>
              {tx.amount > 0 ? "+" : ""}₹{Math.abs(tx.amount)}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
