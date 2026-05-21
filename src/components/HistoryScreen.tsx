import { motion } from "motion/react";
import { Search, ChevronRight, Filter, Shield } from "lucide-react";
import { format } from "date-fns";

export function HistoryScreen() {
  const history = [
    { title: "IT Exports Growth in Lahore", date: new Date(), trust: 92, input: "text" },
    { title: "Energy Policy Analysis 2024", date: new Date(Date.now() - 86400000), trust: 78, input: "url" },
    { title: "Supply Chain Status Report", date: new Date(Date.now() - 172800000), trust: 85, input: "pdf" },
    { title: "Market Reaction to Interest Rates", date: new Date(Date.now() - 259200000), trust: 42, input: "text" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-display font-bold">Analysis History</h2>
        <div className="relative">
          <Search className="absolute left-4 top-3.5 text-white/20" size={18} />
          <input 
            type="text" 
            placeholder="Search history..."
            className="w-full glass rounded-2xl py-3.5 pl-12 pr-4 text-xs focus:ring-2 focus:ring-neon-cyan/50 focus:outline-none ring-1 ring-white/10"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 noscrollbar">
        {["All", "High Trust", "Text", "URL", "PDF"].map((f, i) => (
          <button key={i} className={`whitespace-nowrap px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider ${i === 0 ? 'bg-neon-cyan text-black' : 'glass'}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {history.map((item, i) => (
          <motion.button 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="w-full glass p-4 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-all border border-white/5"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10`}>
                   <Shield size={20} style={{ color: item.trust >= 70 ? '#00E676' : item.trust >= 40 ? '#FF9800' : '#FF1744' }} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-dark-bg rounded-full flex items-center justify-center">
                  <div className={`w-2 h-2 rounded-full ${item.trust >= 70 ? 'bg-success' : 'bg-warning'}`} />
                </div>
              </div>
              <div className="text-left">
                <div className="text-xs font-bold leading-tight line-clamp-1">{item.title}</div>
                <div className="text-[9px] text-white/30 uppercase tracking-widest mt-1">
                  {format(item.date, "MMM dd, yyyy")} • {item.input.toUpperCase()}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-xs font-display font-bold" style={{ color: item.trust >= 70 ? '#00E676' : item.trust >= 40 ? '#FF9800' : '#FF1744' }}>
                {item.trust}%
              </div>
              <ChevronRight size={14} className="text-white/20 group-hover:text-white" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
