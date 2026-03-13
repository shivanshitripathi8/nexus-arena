import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Lock, Loader2, Gamepad2 } from "lucide-react";
import api from "@/lib/api";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !password) { toast.error("All fields required"); return; }
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { phone, password });
      localStorage.setItem("token", res.data.token);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-2xl gradient-purple-pink glow-purple mb-4">
            <Gamepad2 className="w-10 h-10 text-foreground" />
          </div>
          <h1 className="text-3xl font-extrabold text-gradient-purple-pink">ARENA X</h1>
          <p className="text-muted-foreground mt-2">Enter the battlefield</p>
        </div>

        <form onSubmit={handleLogin} className="glass rounded-2xl p-6 space-y-4">
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-secondary rounded-xl pl-11 pr-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-neon-purple/50"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-secondary rounded-xl pl-11 pr-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-neon-purple/50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl gradient-purple-pink text-foreground font-bold text-sm hover:opacity-90 transition-opacity glow-purple disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Login
          </button>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-neon-purple font-semibold hover:underline">Register</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
