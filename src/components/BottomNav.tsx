import { Home, Gamepad2, Wallet, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const tabs = [
  { path: "/dashboard", icon: Home, label: "Home" },
  { path: "/my-matches", icon: Gamepad2, label: "Matches" },
  { path: "/wallet", icon: Wallet, label: "Wallet" },
  { path: "/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="glass-strong rounded-t-2xl mx-2 mb-0 px-2 py-2 flex items-center justify-around">
        {tabs.map((tab) => {
          const active = location.pathname.startsWith(tab.path);
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="relative flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-colors"
            >
              {active && (
                <motion.div
                  layoutId="bottomNav"
                  className="absolute inset-0 gradient-purple-pink rounded-xl opacity-20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <tab.icon className={cn(
                "w-5 h-5 transition-colors relative z-10",
                active ? "text-neon-purple" : "text-muted-foreground"
              )} />
              <span className={cn(
                "text-[10px] font-semibold relative z-10",
                active ? "text-foreground" : "text-muted-foreground"
              )}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
