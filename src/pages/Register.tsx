import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Phone, Mail, Lock, Gamepad, Hash, Loader2, Gamepad2 } from "lucide-react";
import api from "@/lib/api";
import { toast } from "sonner";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "", bgmiName: "", bgmiId: "" });
  const [loading, setLoading] = useState(false);

  const update = (k: string, v: string) => setForm((prev) => ({ ...prev, [k]: v }));

  const fields = [
    { key: "name", icon: User, placeholder: "Full Name", type: "text" },
    { key: "phone", icon: Phone, placeholder: "Phone Number", type: "tel" },
    { key: "email", icon: Mail, placeholder: "Email Address", type: "email" },
    { key: "password", icon: Lock, placeholder: "Password", type: "password" },
    { key: "bgmiName", icon: Gamepad, placeholder: "BGMI Name", type: "text" },
    { key: "bgmiId", icon: Hash, placeholder: "BGMI ID", type: "text" },
  ];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(form).some((v) => !v)) { toast.error("All fields required"); return; }
    setLoading(true);
    try {
      await api.post("/auth/register", form);
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-2xl gradient-cyan-blue glow-cyan mb-4">
            <Gamepad2 className="w-10 h-10 text-foreground" />
          </div>
          <h1 className="text-3xl font-extrabold text-gradient-cyan-blue">Join Arena X</h1>
          <p className="text-muted-foreground mt-2">Create your player profile</p>
        </div>

        <form onSubmit={handleRegister} className="glass rounded-2xl p-6 space-y-3">
          {fields.map(({ key, icon: Icon, placeholder, type }) => (
            <div key={key} className="relative">
              <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type={type}
                placeholder={placeholder}
                value={(form as any)[key]}
                onChange={(e) => update(key, e.target.value)}
                className="w-full bg-secondary rounded-xl pl-11 pr-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-neon-cyan/50"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl gradient-cyan-blue text-foreground font-bold text-sm hover:opacity-90 transition-opacity glow-cyan disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Register
          </button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-neon-cyan font-semibold hover:underline">Login</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
