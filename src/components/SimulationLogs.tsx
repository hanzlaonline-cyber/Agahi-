import { motion } from "motion/react";
import { Terminal, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

interface SimulationLogsProps {
  logs: string[];
}

export function SimulationLogs({ logs }: SimulationLogsProps) {
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);

  useEffect(() => {
    setVisibleLogs([]);
    logs.forEach((log, i) => {
      setTimeout(() => {
        setVisibleLogs(prev => [...prev, log]);
      }, 800 + i * 1200);
    });
  }, [logs]);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-display font-bold uppercase tracking-wider text-white/60 px-2 flex items-center gap-2">
        <Terminal size={14} className="text-neon-purple" />
        Simulation Terminal
      </h3>
      
      <div className="bg-black/60 border border-white/5 rounded-2xl p-4 font-mono text-[11px] min-h-[160px]">
        <div className="space-y-2">
          {visibleLogs.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-2 text-white/70"
            >
              <CheckCircle2 size={12} className="text-success mt-0.5 shrink-0" />
              <span>{log}</span>
            </motion.div>
          ))}
          
          {visibleLogs.length < logs.length && (
            <motion.div 
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="flex items-center gap-2 text-neon-cyan"
            >
              <div className="w-1.5 h-3 bg-neon-cyan" />
              <span>Executing step {visibleLogs.length + 1}...</span>
            </motion.div>
          )}

          {visibleLogs.length === logs.length && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-4 p-2 bg-success/10 border border-success/20 rounded-lg text-success text-center"
            >
              SIMULATION COMPLETE
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
