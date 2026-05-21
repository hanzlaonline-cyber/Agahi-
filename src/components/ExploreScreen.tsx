import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TrendingUp, Globe, Users, Flame, ChevronRight, Newspaper, Youtube, Play } from "lucide-react";

export function ExploreScreen() {
  const [activeTab, setActiveTab] = useState<'news' | 'youtube'>('news');

  const trending = [
    { title: "Pakistan IT Export Surge", region: "South Asia", analyses: "1.2k", trend: "+24%", color: "neon-cyan" },
    { title: "Global Semiconductor Shift", region: "Worldwide", analyses: "850", trend: "+12%", color: "neon-purple" },
    { title: "Lahore Air Quality Index", region: "Local", analyses: "2.4k", trend: "+45%", color: "error" },
    { title: "EV Policy Updates 2024", region: "Bureaucracy", analyses: "420", trend: "+5%", color: "warning" },
  ];

  const youtubeVideos = [
    { id: "dQw4w9WgXcQ", title: "Global Economic Reset Explained", channel: "Antigravity Global", views: "1.2M", duration: "12:45" },
    { id: "M7lc1UVf-VE", title: "Pakistan's Tech Boom in 2024", channel: "Tech Insights", views: "850K", duration: "8:20" },
    { id: "K4TOrB7at0Y", title: "The Future of AI Agents", channel: "Future Pulse", views: "450K", duration: "15:30" },
    { id: "jgZkjDIs8MM", title: "Impact of Climate Change on Trade", channel: "World Watch", views: "2.1M", duration: "10:15" },
  ];

  return (
    <div className="p-6 space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-display font-bold">Explore Trends</h2>
          <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Real-time Antigravity Insights</p>
        </div>
      </div>

      {/* Subtabs */}
      <div className="flex p-1 bg-white/5 rounded-2xl border border-white/5">
        <button 
          onClick={() => setActiveTab('news')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'news' ? 'bg-neon-cyan text-black shadow-lg shadow-neon-cyan/20' : 'text-white/40 hover:text-white'}`}
        >
          <Newspaper size={14} />
          Trending News
        </button>
        <button 
          onClick={() => setActiveTab('youtube')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'youtube' ? 'bg-neon-purple text-white shadow-lg shadow-neon-purple/20' : 'text-white/40 hover:text-white'}`}
        >
          <Youtube size={14} />
          YouTube Feed
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'news' ? (
          <motion.div 
            key="news-tab"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Featured Card */}
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="relative h-48 rounded-3xl overflow-hidden glass p-6 flex flex-col justify-end group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent z-10" />
              <div className="absolute top-0 right-0 p-4 z-20">
                <div className="bg-error text-white px-3 py-1 rounded-full text-[9px] font-bold uppercase animate-pulse shadow-[0_0_15px_rgba(255,23,68,0.4)]">Live Tracking</div>
              </div>
              <div className="relative z-20 space-y-2">
                <div className="text-[10px] font-bold text-neon-cyan uppercase tracking-widest">Macro Analysis</div>
                <h3 className="text-lg font-display font-bold leading-tight">National Energy Grid Stability: Q2 Implications</h3>
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-1.5">
                    <Users size={12} className="text-white/40" />
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">340 Agents</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <TrendingUp size={12} className="text-success" />
                    <span className="text-[10px] font-bold text-success uppercase tracking-widest">88% Verified</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Categories */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Economics", icon: <TrendingUp size={16} /> },
                { label: "Governance", icon: <Globe size={16} /> },
                { label: "Security", icon: <Flame size={16} /> },
                { label: "Environment", icon: <Globe size={16} /> },
              ].map((cat, i) => (
                <button key={i} className="glass p-4 rounded-2xl flex items-center gap-3 hover:bg-white/5 transition-all">
                  <div className="text-white/40">{cat.icon}</div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Trending List */}
            <div className="space-y-4">
              <h3 className="text-sm font-display font-bold uppercase tracking-wider text-white/60 px-1">Active Verification Hubs</h3>
              <div className="space-y-3">
                {trending.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass p-4 rounded-3xl flex items-center justify-between border border-white/5"
                  >
                    <div className="space-y-1">
                      <div className="text-[9px] text-white/40 font-bold uppercase tracking-widest flex items-center gap-2">
                         <div className={`w-1 h-1 rounded-full bg-${item.color}`} />
                         {item.region}
                      </div>
                      <div className="text-xs font-bold">{item.title}</div>
                      <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest underline decoration-neon-cyan/20">{item.analyses} Local Analyses</div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1">
                      <div className="text-xs font-display font-bold text-success">{item.trend}</div>
                      <ChevronRight size={14} className="text-white/20" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="youtube-tab"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-sm font-display font-bold uppercase tracking-wider text-white/60 px-1">Featured Video Insights</h3>
              <div className="grid grid-cols-1 gap-6">
                {youtubeVideos.map((video, index) => (
                  <motion.div 
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="relative aspect-video rounded-3xl overflow-hidden glass border border-white/10 mb-3 shadow-2xl">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.id}`}
                        title={video.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2 py-1 rounded-lg text-[9px] font-bold text-white z-20">
                        {video.duration}
                      </div>
                    </div>
                    <div className="px-1 space-y-1">
                      <h4 className="text-sm font-bold group-hover:text-neon-purple transition-colors line-clamp-1">{video.title}</h4>
                      <div className="flex items-center justify-between text-[10px] text-white/40 font-bold uppercase tracking-widest">
                        <span>{video.channel}</span>
                        <span>{video.views} Views</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="glass p-6 rounded-3xl text-center space-y-4 border border-neon-purple/20">
              <div className="w-12 h-12 rounded-2xl bg-neon-purple/10 flex items-center justify-center mx-auto">
                <Play size={20} className="text-neon-purple" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-widest text-neon-purple">Smart Analysis</h4>
                <p className="text-[10px] text-white/40 leading-relaxed italic">YouTube content is automatically processed by Antigravity Agents for cross-source verification.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
