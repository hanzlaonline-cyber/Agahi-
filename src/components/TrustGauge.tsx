import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface TrustGaugeProps {
  value: number;
}

export function TrustGauge({ value }: TrustGaugeProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const size = 160;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (displayValue / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(value);
    }, 500);
    return () => clearTimeout(timer);
  }, [value]);

  const getColor = (v: number) => {
    if (v >= 70) return "#00E676";
    if (v >= 40) return "#FF9800";
    return "#FF1744";
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Foreground Circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor(displayValue)}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl font-display font-bold"
          style={{ color: getColor(displayValue) }}
        >
          {Math.round(displayValue)}
        </motion.span>
        <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
          Trust Score
        </span>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
        style={{ 
          backgroundColor: `${getColor(displayValue)}20`,
          color: getColor(displayValue),
          border: `1px solid ${getColor(displayValue)}40`
        }}
      >
        {displayValue >= 70 ? "High Confidence" : displayValue >= 40 ? "Medium Confidence" : "Low Confidence"}
      </motion.div>
    </div>
  );
}
