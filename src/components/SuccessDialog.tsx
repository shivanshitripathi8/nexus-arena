import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
  slotNumber: number;
  roomNumber?: number;
}

export function SuccessDialog({ open, onClose, slotNumber, roomNumber }: SuccessDialogProps) {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="glass-strong rounded-2xl p-8 text-center max-w-sm w-full"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            >
              <CheckCircle2 className="w-20 h-20 text-neon-green mx-auto mb-4 glow-green rounded-full" />
            </motion.div>

            <h2 className="text-2xl font-extrabold text-foreground mb-2">You're In!</h2>
            <p className="text-muted-foreground mb-6">Tournament joined successfully</p>

            <div className="flex gap-3 justify-center mb-6">
              <div className="glass rounded-xl px-5 py-3 text-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Slot</p>
                <p className="text-2xl font-extrabold text-neon-cyan">#{slotNumber}</p>
              </div>
              {roomNumber && (
                <div className="glass rounded-xl px-5 py-3 text-center">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Room</p>
                  <p className="text-2xl font-extrabold text-neon-orange">#{roomNumber}</p>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                onClose();
                navigate("/my-matches");
              }}
              className="w-full py-3 rounded-xl gradient-purple-pink text-foreground font-bold hover:opacity-90 transition-opacity glow-purple"
            >
              Go to My Matches
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
