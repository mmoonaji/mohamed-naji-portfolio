interface DeviceMockupProps {
  src: string;
  alt: string;
  variant?: 'browser' | 'phone';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function DeviceMockup({ src, alt, variant = 'browser', size = 'md', className = '' }: DeviceMockupProps) {
  if (variant === 'phone') {
    const phoneSizes = {
      sm: 'w-[140px] sm:w-[160px] md:w-[180px]',
      md: 'w-[180px] sm:w-[220px] md:w-[240px]',
      lg: 'w-[220px] sm:w-[260px] md:w-[280px]',
    };

    return (
      <div className={`inline-flex justify-center ${className}`}>
        <div className={`relative ${phoneSizes[size]}`}>
          {/* Phone frame */}
          <div className="relative rounded-[2rem] border-[3px] border-slate-600/50 bg-dark-800 p-1.5 shadow-2xl shadow-black/50">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-dark-800 rounded-b-xl z-10" />
            {/* Screen */}
            <div className="rounded-[1.5rem] overflow-hidden bg-black aspect-[9/19.5]">
              <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>
            {/* Home indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-500/30 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  // Browser mockup
  const browserMaxWidths = {
    sm: 'max-w-full',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
  };

  return (
    <div className={`w-full ${browserMaxWidths[size]} ${className}`}>
      <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-dark-800 shadow-2xl shadow-black/30 overflow-hidden">
        {/* Browser chrome bar */}
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-dark-700/80 border-b border-white/5">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500/70" />
          </div>
          <div className="flex-1 mx-2 sm:mx-4">
            <div className="bg-dark-900/60 rounded-md px-3 py-1 text-[10px] sm:text-xs text-slate-500 text-center truncate max-w-[180px] sm:max-w-xs mx-auto">
              {alt.toLowerCase().includes('jouda') ? 'joudafood.com' :
               alt.toLowerCase().includes('inventory') ? 'stockhub.app/dashboard' :
               alt.toLowerCase().includes('malware') ? 'threat-intel.local' : 'localhost:3000'}
            </div>
          </div>
        </div>
        {/* Screen content */}
        <div className="relative">
          <img
            src={src}
            alt={alt}
            className="w-full h-auto block"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
