import { motion } from 'framer-motion';
import { Terminal, Zap, Globe, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Hero() {
  const [location, setLocation] = useState('Loading...');

  useEffect(() => {
    // Fetch location from daemon.md
    async function fetchLocation() {
      try {
        const response = await fetch('/daemon.md');
        if (response.ok) {
          const text = await response.text();
          const match = text.match(/\[CURRENT_LOCATION\]\s*\n\s*(.+)/);
          if (match) {
            setLocation(match[1].trim());
          } else {
            setLocation('Las Vegas, Nevada');
          }
        }
      } catch {
        setLocation('Las Vegas, Nevada');
      }
    }
    fetchLocation();
  }, []);

  return (
    <section className="relative pt-28 pb-6 px-6">
      {/* Scan lines overlay */}
      <div className="absolute inset-0 bg-scanlines pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative">
        {/* Title + Badge inline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-4 mb-3"
        >
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-wider">
            <span className="text-gradient glow-text">DAEMON</span>
          </h1>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-brand/10 border border-brand/30">
            <span className="status-dot status-dot-connected animate-pulse-slow" />
            <span className="font-mono text-xs text-brand uppercase">Live</span>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-body text-lg text-text-secondary mb-3"
        >
          Personal API for{' '}
          <a href="https://brrh.lv" className="text-brand hover:text-brand-light transition-colors">
            Bryan Rivera
          </a>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="font-body text-base text-text-tertiary max-w-2xl mx-auto mb-5"
        >
          A live interface into who I am, what I'm building, and what I care about.
          Built for both humans and AI to understand and connect.
        </motion.p>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-4"
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-brand/10 border border-brand/30">
            <MapPin className="w-3.5 h-3.5 text-brand" />
            <span className="font-mono text-xs text-brand">{location}</span>
          </div>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-bg-secondary/80 border border-border-subtle">
            <Terminal className="w-3.5 h-3.5 text-accent" />
            <span className="font-mono text-xs text-text-secondary">MCP</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-bg-secondary/80 border border-border-subtle">
            <Zap className="w-3.5 h-3.5 text-success" />
            <span className="font-mono text-xs text-text-secondary">Real-time</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-bg-secondary/80 border border-border-subtle">
            <Globe className="w-3.5 h-3.5 text-accent" />
            <span className="font-mono text-xs text-text-secondary">Public</span>
          </div>
          <a
            href="/api/"
            className="px-4 py-1.5 rounded font-display text-sm tracking-wider bg-brand/20 hover:bg-brand/30 text-brand border border-brand/30 transition-all duration-300"
          >
            API DOCS
          </a>
        </motion.div>
      </div>
    </section>
  );
}
