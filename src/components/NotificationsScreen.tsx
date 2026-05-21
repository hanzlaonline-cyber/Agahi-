import { motion } from "motion/react";
import { Bell, Info, CheckCircle2, AlertTriangle, ChevronRight } from "lucide-react";
import { format } from "date-fns";

export function NotificationsScreen() {
  const alerts = [
    { title: "Verification Successful", message: "Your analysis on Energy Grid received 92% trust score.", time: new Date(), type: "success", read: false },
    { title: "Trending Alert", message: "Lahore Exports topic is trending with 500+ new analyses.", time: new Date(Date.now() - 3600000), type: "info", read: false },
    { title: "System Update", message: "AGAAHI v1.0.4 includes new Impact Estimation logic.", time: new Date(Date.now() - 7200000), type: "info", read: true },
    { title: "Alert: News Anomaly", message: "Potential deepfake detected in Karachi Flood images.", time: new Date(Date.now() - 172800000), type: "warning", read: true },
  ];

  const icons = {
    info: <Info size={16} className="text-neon-cyan" />,
    success: <CheckCircle2 size={16} className="text-success" />,
    warning: <AlertTriangle size={16} className="text-warning" />,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold text-white">Alerts</h2>
        <button className="text-[10px] font-bold text-neon-cyan uppercase tracking-widest border-b border-neon-cyan/20 pb-1">Mark all as read</button>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`glass p-4 rounded-3xl flex items-start gap-4 border border-white/5 ${!alert.read && 'bg-white/10 ring-1 ring-neon-cyan/20'}`}
          >
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${!alert.read ? 'bg-white/10 shadow-lg' : 'bg-white/5'}`}>
              {(icons as any)[alert.type]}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold">{alert.title}</h4>
                <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">{format(alert.time, "h:mm a")}</span>
              </div>
              <p className="text-[11px] text-white/60 leading-relaxed">{alert.message}</p>
            </div>
            <div className="pt-2">
               <ChevronRight size={14} className="text-white/20" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-8 text-center">
        <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold">You're all caught up</p>
      </div>
    </div>
  );
}
