import { Home, Gamepad2, Wallet, User, Trophy, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/dashboard", icon: Home, label: "Home" },
  { path: "/my-matches", icon: Gamepad2, label: "My Matches" },
  { path: "/wallet", icon: Wallet, label: "Wallet" },
  { path: "/leaderboard", icon: Trophy, label: "Leaderboard" },
  { path: "/profile", icon: User, label: "Profile" },
];

export function DesktopSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen glass-strong border-r border-border/50 p-4">
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-extrabold text-gradient-purple-pink">ARENA X</h1>
        <p className="text-xs text-muted-foreground mt-1">Esports Platform</p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const active = location.pathname.startsWith(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                active
                  ? "gradient-purple-pink text-foreground glow-purple"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-neon-red hover:bg-secondary transition-colors"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </aside>
  );
}
