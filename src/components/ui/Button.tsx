import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string;
  to?: string;
  download?: boolean | string;
  children: React.ReactNode;
}

export function Button({ variant = 'primary', href, to, download, children, className = '', ...props }: ButtonProps) {
  const baseStyle = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300";
  
  const variants = {
    primary: "bg-primary-500 hover:bg-primary-400 text-white shadow-lg shadow-primary-500/20",
    secondary: "bg-dark-700 hover:bg-dark-800 text-white border border-white/5",
    outline: "border border-white/20 hover:border-primary-500/50 hover:bg-primary-500/10 text-white"
  };

  const classes = `${baseStyle} ${variants[variant]} ${className}`;

  if (href) {
    if (href.startsWith('#')) {
       return <a href={href} className={classes} download={download}>{children}</a>;
    }
    return <a href={href} className={classes} target="_blank" rel="noopener noreferrer" download={download}>{children}</a>;
  }
  
  if (to) {
    return <Link to={to} className={classes}>{children}</Link>;
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
