import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Shield, Zap, Flame, Award, Settings, Globe, Bell, LogOut, Check, X, Smartphone, Mail, AlertTriangle, ChevronRight } from "lucide-react";
import { UserProfile, NotificationPreferences } from "../types";
import { db } from "../lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

interface PreferenceItemProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  color: string;
}

function PreferenceItem({ icon, label, description, enabled, onToggle, color }: PreferenceItemProps) {
  return (
    <div className="flex items-center justify-between gap-4 group">
      <div className="flex items-start gap-3 flex-1">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${enabled ? `bg-${color}/10 text-${color}` : 'bg-white/5 text-white/20'}`}>
          {icon}
        </div>
        <div className="space-y-0.5">
          <div className="text-[11px] font-bold text-white/90">{label}</div>
          <div className="text-[9px] text-white/40 leading-tight">{description}</div>
        </div>
      </div>
      <button 
        onClick={onToggle}
        className={`w-10 h-6 rounded-full relative transition-colors duration-300 ${enabled ? `bg-${color}` : 'bg-white/10'}`}
      >
        <motion.div 
          animate={{ x: enabled ? 18 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-lg flex items-center justify-center"
        >
          {enabled ? <Check size={8} className={`text-${color}`} /> : <X size={8} className="text-white/20" />}
        </motion.div>
      </button>
    </div>
  );
}

interface ProfileScreenProps {
  user: UserProfile;
  logout: () => void;
}

export function ProfileScreen({ user, logout }: ProfileScreenProps) {
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [prefs, setPrefs] = useState<NotificationPreferences>(user.notificationPreferences || {
    push: true,
    email: false,
    alerts: true,
    marketing: false
  });

  const togglePreference = async (key: keyof NotificationPreferences) => {
    const newPrefs = { ...prefs, [key]: !prefs[key] };
    setPrefs(newPrefs);
    
    // Attempt background sync if user info is available
    try {
      await updateDoc(doc(db, 'users', user.userId), {
        notificationPreferences: newPrefs
      });
    } catch (e) {
      console.error("Failed to sync preferences", e);
    }
  };

  const stats = [
    { label: "Analyses", value: user.stats.totalAnalyses, icon: <Zap size={16} className="text-neon-cyan" /> },
    { label: "Trust Rate", value: `${user.stats.avgTrustRate}%`, icon: <Shield size={16} className="text-success" /> },
    { label: "Streak", value: user.stats.streak, icon: <Flame size={16} className="text-warning" /> },
    { label: "Rank", value: user.stats.rank, icon: <Award size={16} className="text-neon-purple" /> },
  ];

  const badges = [
    { name: "Novice", icon: "🌱", earned: true },
    { name: "Skeptic", icon: "🔍", earned: true },
    { name: "Truth Seeker", icon: "✨", earned: true },
    { name: "Deep Analyst", icon: "🧠", earned: false },
    { name: "Master Agent", icon: "👑", earned: false },
    { name: "Guardian", icon: "🛡️", earned: false },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-neon-purple/20 border-2 border-neon-purple flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(180,0,255,0.2)]">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.fullName} className="w-full h-full object-cover" />
            ) : (
              <User size={48} className="text-neon-purple" />
            )}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-success text-black text-[10px] font-bold px-2 py-1 rounded-full border-2 border-dark-bg">
            VERIFIED
          </div>
        </div>
        <h2 className="mt-4 text-xl font-display font-bold">{user.fullName}</h2>
        <p className="text-sm text-white/40">{user.email}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, i) => (
          <div key={i} className="glass p-4 rounded-2xl">
            <div className="flex items-center gap-2 mb-1">
              {stat.icon}
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{stat.label}</span>
            </div>
            <div className="text-lg font-display font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-display font-bold uppercase tracking-wider text-white/60">Unlocked Badges</h3>
          <span className="text-[10px] text-neon-cyan font-bold">{badges.filter(b => b.earned).length}/{badges.length}</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {badges.map((badge, i) => (
            <div key={i} className={`glass p-3 rounded-2xl flex flex-col items-center justify-center gap-2 ${!badge.earned && 'opacity-30 grayscale'}`}>
              <span className="text-2xl">{badge.icon}</span>
              <span className="text-[9px] font-bold text-center leading-tight">{badge.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Settings List */}
      <div className="space-y-4">
        <h3 className="text-sm font-display font-bold uppercase tracking-wider text-white/60 px-1">Settings</h3>
        <div className="space-y-2">
          <button className="w-full glass p-4 rounded-2xl flex items-center justify-between group">
            <div className="flex items-center gap-3 text-sm">
              <Globe size={18} className="text-white/40 group-hover:text-neon-cyan" />
              Language
            </div>
            <span className="text-xs text-white/40">English (US)</span>
          </button>
          
          <button 
            onClick={() => setShowNotificationSettings(!showNotificationSettings)}
            className={`w-full glass p-4 rounded-2xl flex items-center justify-between group transition-all ${showNotificationSettings ? 'ring-1 ring-neon-cyan/50 bg-white/5' : ''}`}
          >
            <div className="flex items-center gap-3 text-sm">
              <Bell size={18} className={`transition-colors ${showNotificationSettings ? 'text-neon-cyan' : 'text-white/40 group-hover:text-neon-cyan'}`} />
              Communication Preferences
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-success">Managed</span>
              {showNotificationSettings ? <ChevronRight size={14} className="rotate-90 transition-transform" /> : <ChevronRight size={14} />}
            </div>
          </button>

          <AnimatePresence>
            {showNotificationSettings && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 space-y-4 bg-white/5 rounded-2xl mt-1 border border-white/5">
                  <PreferenceItem 
                    icon={<Smartphone size={16} />}
                    label="Push Notifications"
                    description="Real-time verification alerts on your device"
                    enabled={prefs.push}
                    onToggle={() => togglePreference('push')}
                    color="neon-cyan"
                  />
                  <PreferenceItem 
                    icon={<Mail size={16} />}
                    label="Email Reports"
                    description="Weekly summaries and detailed trend reports"
                    enabled={prefs.email}
                    onToggle={() => togglePreference('email')}
                    color="neon-purple"
                  />
                  <PreferenceItem 
                    icon={<AlertTriangle size={16} />}
                    label="Critical Anomaly Alerts"
                    description="Immediate notification of detected deepfakes or misinformation"
                    enabled={prefs.alerts}
                    onToggle={() => togglePreference('alerts')}
                    color="error"
                  />
                  <PreferenceItem 
                    icon={<Shield size={16} />}
                    label="Privacy & Marketing"
                    description="Receive personalized AGAAHI tips and community insights"
                    enabled={prefs.marketing}
                    onToggle={() => togglePreference('marketing')}
                    color="success"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button className="w-full glass p-4 rounded-2xl flex items-center justify-between group">
            <div className="flex items-center gap-3 text-sm">
              <Settings size={18} className="text-white/40 group-hover:text-neon-cyan" />
              Advanced Settings
            </div>
          </button>
          
          <button 
            onClick={logout}
            className="w-full bg-error/10 border border-error/20 p-4 rounded-2xl flex items-center justify-center gap-3 text-sm text-error font-bold mt-4"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </div>

      <div className="text-center pb-8">
        <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold">AGAAHI Version 1.0.4 - Build Alpha</p>
      </div>
    </div>
  );
}
