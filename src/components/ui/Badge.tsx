import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'outline';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const base = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border";
  const variants = {
    default: "bg-dark-700/50 text-slate-300 border-white/10",
    accent: "bg-primary-500/10 text-primary-400 border-primary-500/20",
    outline: "bg-transparent text-slate-400 border-slate-700"
  };
  
  return (
    <span className={`${base} ${variants[variant]}`}>
      {children}
    </span>
  );
}
