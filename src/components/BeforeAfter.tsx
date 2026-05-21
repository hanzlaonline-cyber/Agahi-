import { motion } from "motion/react";
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import { MetricState } from "../types";

interface BeforeAfterProps {
  before: MetricState;
  after: MetricState;
}

export function BeforeAfter({ before, after }: BeforeAfterProps) {
  const metrics = Object.keys(before);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-display font-bold uppercase tracking-wider text-white/60 px-2">
        System Outcome Simulation
      </h3>
      
      <div className="grid grid-cols-1 gap-3">
        {metrics.map((metric, index) => {
          const beforeVal = before[metric];
          const afterVal = after[metric];
          
          // Basic comparison logic for UI highlighting
          const beforeNum = parseFloat(beforeVal.replace(/[^0-9.-]/g, ''));
          const afterNum = parseFloat(afterVal.replace(/[^0-9.-]/g, ''));
          const isIncrease = afterNum > beforeNum;
          const hasChange = !isNaN(beforeNum) && !isNaN(afterNum) && beforeNum !== afterNum;

          return (
            <motion.div 
              key={metric}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass p-4 rounded-2xl flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">
                  {metric.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm font-bold text-white/60">
                    {beforeVal}
                  </div>
                  <ArrowRight size={14} className="text-white/20" />
                  <div className={`text-base font-display font-bold flex items-center gap-1.5 ${hasChange ? (isIncrease ? 'text-success' : 'text-error') : 'text-neon-cyan'}`}>
                    {afterVal}
                    {hasChange && (
                      isIncrease ? <TrendingUp size={14} /> : <TrendingDown size={14} />
                    )}
                  </div>
                </div>
              </div>
              
              {hasChange && (
                <div className={`px-2 py-1 rounded-lg text-[9px] font-bold uppercase ${isIncrease ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                  {isIncrease ? 'Improved' : 'Alert'}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
