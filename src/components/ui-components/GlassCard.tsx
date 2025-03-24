
import React from 'react';
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  highlightBorder?: boolean;
  style?: React.CSSProperties;
}

const GlassCard = ({ children, className, highlightBorder = false, style }: GlassCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card p-6 rounded-xl",
        highlightBorder ? "border-placafala-highlight/30" : "border-white/10",
        "transition-all duration-300 ease-in-out",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default GlassCard;
