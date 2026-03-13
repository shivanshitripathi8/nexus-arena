import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, Mail, Gamepad, Wallet, TrendingUp, LogOut } from "lucide-react";
import { mockProfile } from "@/lib/mock-data";
import { GradientStatCard } from "@/components/GradientStatCard";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  const infoItems = [
    { icon: User, label: "Name", value: mockProfile.name },
    { icon: Phone, label: "Phone", value: mockProfile.phone },
    { icon: Mail, label: "Email", value: mockProfile.email },
    { icon: Gamepad, label: "BGMI Name", value: mockProfile.bgmiName },
  ];

  return (
    <div className="pb-24 lg:pb-8">
      <h1 className="text-2xl font-extrabold text-foreground mb-6">Profile</h1>

      {/* Avatar */}
      <div className="text-center mb-6">
        <div className="w-24 h-24 rounded-full gradient-purple-pink mx-auto flex items-center justify-center glow-purple">
          <span className="text-4xl font-extrabold text-foreground">{mockProfile.name[0]}</span>
        </div>
        <h2 className="text-xl font-bold text-foreground mt-3">{mockProfile.bgmiName}</h2>
        <p className="text-sm text-muted-foreground">{mockProfile.name}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <GradientStatCard title="Wallet Balance" value={mockProfile.walletBalance} icon={Wallet} gradient="purple-pink" />
        <GradientStatCard title="Total Earnings" value={mockProfile.totalEarnings} icon={TrendingUp} gradient="orange-green" />
      </div>

      {/* Info */}
      <div className="glass rounded-2xl p-5 space-y-4 mb-6">
        {infoItems.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-secondary">
              <Icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-sm font-semibold text-foreground">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setLogoutConfirm(true)}
        className="w-full py-3 rounded-xl border border-neon-red/30 text-neon-red font-bold text-sm hover:bg-neon-red/10 transition-colors flex items-center justify-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>

      {/* Logout confirm */}
      <AnimatePresence>
        {logoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setLogoutConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-2xl p-6 max-w-sm w-full text-center"
            >
              <h3 className="text-lg font-bold text-foreground mb-2">Confirm Logout</h3>
              <p className="text-sm text-muted-foreground mb-6">Are you sure you want to logout?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setLogoutConfirm(false)}
                  className="flex-1 py-3 rounded-xl bg-secondary text-foreground font-semibold text-sm hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                  className="flex-1 py-3 rounded-xl bg-neon-red text-foreground font-bold text-sm hover:opacity-90 transition-opacity"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
