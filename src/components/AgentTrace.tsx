import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp, Bot, Sparkles, AlertTriangle, PlayCircle } from "lucide-react";
import { useState } from "react";
import { AgentTraceStep } from "../types";

interface AgentTraceProps {
  trace: AgentTraceStep[];
}

export function AgentTrace({ trace }: AgentTraceProps) {
  const [expanded, setExpanded] = useState<number[]>([]);

  const toggle = (index: number) => {
    setExpanded(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const icons = {
    IngestionAgent: <Bot size={18} className="text-neon-cyan" />,
    InsightAgent: <Sparkles size={18} className="text-neon-purple" />,
    ImpactAgent: <AlertTriangle size={18} className="text-warning" />,
    ActionAgent: <PlayCircle size={18} className="text-success" />,
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-sm font-display font-bold uppercase tracking-wider text-white/60">
          Antigravity Trace
        </h3>
        <button 
          onClick={() => setExpanded(expanded.length === trace.length ? [] : [0, 1, 2, 3])}
          className="text-[10px] font-bold text-neon-cyan uppercase tracking-wider"
        >
          {expanded.length === trace.length ? "Collapse All" : "Expand All"}
        </button>
      </div>

      <div className="space-y-2">
        {trace.map((step, index) => (
          <div key={index} className="glass rounded-2xl overflow-hidden">
            <button 
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                  {(icons as any)[step.agent] || <Bot size={18} />}
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold font-display">{step.agent}</div>
                  <div className="text-[9px] text-white/40 uppercase tracking-widest leading-none mt-1">
                    Step {index + 1}
                  </div>
                </div>
              </div>
              {expanded.includes(index) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            <AnimatePresence>
              {expanded.includes(index) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 pb-4 border-t border-white/5"
                >
                  <div className="pt-4 space-y-4">
                    <div>
                      <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-white/30" />
                        Reasoning
                      </div>
                      <p className="text-xs text-white/70 leading-relaxed italic">
                        "{step.reasoning}"
                      </p>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-white/30" />
                        Output
                      </div>
                      <div className="bg-black/40 rounded-xl p-3 border border-white/5">
                        <p className="text-xs text-white/90 leading-relaxed font-mono">
                          {step.output}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
