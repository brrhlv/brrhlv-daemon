import { useState, useEffect, Component } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  Compass,
  BookMarked,
  Film,
  Headphones,
  Settings,
  Clock,
  Briefcase,
  Server,
  Loader2,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  User
} from 'lucide-react';

/**
 * Daemon Data Interface
 */
interface DaemonData {
  // Core Identity
  about?: string;
  mission?: string;
  purpose?: string | string[];
  current_location?: string;
  personality?: string;

  // Preferences
  preferences?: string[];
  daily_routine?: string[];

  // Collections
  favorite_books?: string[];
  favorite_movies?: string[];
  favorite_podcasts?: string[];

  // Metadata
  last_updated?: string;
}

/**
 * Error Boundary for graceful error handling
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 rounded border border-error/30 bg-error/10">
          <p className="text-sm text-error font-mono">ERROR: Section failed to render</p>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * Safe text renderer
 */
function SafeText({ text, fallback = 'Not available' }: { text?: string; fallback?: string }) {
  return <>{text || fallback}</>;
}

/**
 * Safe list renderer
 */
function SafeList({
  items,
  fallback = 'No data available',
  renderItem = (item: string, i: number) => (
    <p key={i} className="text-sm text-text-secondary font-body">{item}</p>
  )
}: {
  items?: string[];
  fallback?: string;
  renderItem?: (item: string, index: number) => ReactNode;
}) {
  if (!items || items.length === 0) {
    return <p className="text-sm text-text-tertiary italic font-mono">{fallback}</p>;
  }
  return <>{items.map(renderItem)}</>;
}

/**
 * Status Bar - Terminal Style
 */
function StatusBar({
  isConnected,
  toolCount,
  currentTime,
  lastUpdated
}: {
  isConnected: boolean;
  toolCount: number;
  currentTime: Date;
  lastUpdated?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center justify-between gap-4 rounded border border-border-default bg-bg-secondary/80 backdrop-blur-sm px-5 py-3 mb-6 card-glow"
    >
      <div className="flex items-center gap-4">
        <span className="font-display text-lg tracking-wider text-text-primary">
          <span className="text-brand-light">DAEMON://</span>BRRH
        </span>
        <div className="flex items-center gap-2">
          <span className={`status-dot ${isConnected ? 'status-dot-connected animate-pulse-slow' : 'status-dot-offline'}`} />
          <span className="font-mono text-xs text-text-secondary uppercase">
            {isConnected ? 'Connected' : 'Offline'}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4 text-text-tertiary font-mono text-xs">
        <span>{toolCount} endpoints</span>
        {lastUpdated && <span>Updated: {new Date(lastUpdated).toLocaleDateString()}</span>}
        <span>{currentTime.toISOString().slice(0, 10)}</span>
      </div>
    </motion.div>
  );
}

/**
 * Section Card Component
 */
function SectionCard({
  icon: Icon,
  title,
  count,
  link,
  delay = 0,
  variant = 'default',
  children
}: {
  icon: typeof Target;
  title: string;
  count?: number;
  link?: { href: string; text: string };
  delay?: number;
  variant?: 'default' | 'accent' | 'subtle';
  children: ReactNode;
}) {
  const borderClass = variant === 'accent'
    ? 'border-border-default'
    : variant === 'subtle'
    ? 'border-border-subtle'
    : 'border-border-default';

  const bgClass = variant === 'subtle'
    ? 'bg-bg-secondary/60'
    : 'bg-bg-secondary/80';

  return (
    <ErrorBoundary>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className={`rounded border ${borderClass} ${bgClass} backdrop-blur-sm pt-5 px-5 pb-3 flex flex-col max-h-72 card-glow`}
      >
        <div className="flex items-center justify-between mb-3 shrink-0">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-accent" />
            <span className="font-display text-sm tracking-wider text-text-tertiary uppercase">{title}</span>
          </div>
          <div className="flex items-center gap-3">
            {count !== undefined && (
              <span className="text-xs text-text-tertiary font-mono">{count}</span>
            )}
            {link && (
              <a href={link.href} className="text-xs text-brand hover:text-brand-light transition-colors font-mono">
                {link.text}
              </a>
            )}
          </div>
        </div>
        <div className="overflow-y-auto flex-1 pr-1">
          <div className="space-y-2 pb-2">
            {children}
          </div>
        </div>
      </motion.div>
    </ErrorBoundary>
  );
}

export function DaemonDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [daemonData, setDaemonData] = useState<DaemonData>({});
  const [toolCount, setToolCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    fetchDaemonData();
    return () => clearInterval(timer);
  }, []);

  async function fetchDaemonData() {
    setLoading(true);
    setError(null);

    try {
      // For now, fetch from the daemon.md file directly
      const response = await fetch('/daemon.md');
      if (response.ok) {
        const text = await response.text();
        const data = parseDaemonMd(text);
        setDaemonData(data);
        setIsConnected(true);
        setToolCount(11); // Number of sections
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(`Connection failed: ${message}`);
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  }

  // Parse daemon.md format
  function parseDaemonMd(text: string): DaemonData {
    const sections: Record<string, string> = {};
    const lines = text.split('\n');
    let currentSection = '';
    let content: string[] = [];

    for (const line of lines) {
      const sectionMatch = line.match(/^\[([A-Z_]+)\]$/);
      if (sectionMatch) {
        if (currentSection && content.length > 0) {
          sections[currentSection] = content.join('\n').trim();
        }
        currentSection = sectionMatch[1].toLowerCase();
        content = [];
      } else if (currentSection) {
        content.push(line);
      }
    }
    if (currentSection && content.length > 0) {
      sections[currentSection] = content.join('\n').trim();
    }

    // Parse list sections
    const parseList = (text?: string): string[] => {
      if (!text) return [];
      return text.split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.replace(/^-\s*/, '').trim())
        .filter(Boolean);
    };

    return {
      about: sections.about,
      mission: sections.mission,
      purpose: sections.purpose,
      current_location: sections.current_location,
      personality: sections.personality,
      preferences: parseList(sections.preferences),
      daily_routine: parseList(sections.daily_routine),
      favorite_books: parseList(sections.favorite_books),
      favorite_movies: parseList(sections.favorite_movies),
      favorite_podcasts: parseList(sections.favorite_podcasts),
    };
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-8 h-8 text-brand animate-spin" />
          <p className="font-mono text-sm text-text-secondary">Initializing daemon connection...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <AlertCircle className="w-8 h-8 text-error" />
          <p className="font-mono text-sm text-error">{error}</p>
          <button
            onClick={fetchDaemonData}
            className="flex items-center gap-2 px-4 py-2 rounded bg-brand/20 text-brand hover:bg-brand/30 transition-colors font-mono text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 space-y-4">
      <StatusBar
        isConnected={isConnected}
        toolCount={toolCount}
        currentTime={currentTime}
        lastUpdated={daemonData.last_updated}
      />

      {/* TIER 1: Core Identity - 2 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* About */}
        <SectionCard icon={User} title="About" delay={0.05} variant="accent">
          <p className="text-sm text-text-secondary font-body leading-relaxed">
            <SafeText text={daemonData.about} fallback="About not available" />
          </p>
        </SectionCard>

        {/* Mission */}
        <SectionCard icon={Target} title="Mission" delay={0.1} variant="accent">
          <p className="text-sm text-text-secondary font-body leading-relaxed">
            <SafeText text={daemonData.mission} fallback="Mission not available" />
          </p>
        </SectionCard>
      </div>

      {/* TIER 2: Purpose Framework */}
      <SectionCard icon={Compass} title="Purpose Framework" link={{ href: '/telos', text: 'View all' }} delay={0.15}>
        <p className="text-sm text-text-secondary font-body leading-relaxed whitespace-pre-line">
          <SafeText
            text={typeof daemonData.purpose === 'string' ? daemonData.purpose : daemonData.purpose?.join('\n')}
            fallback="Purpose framework not available"
          />
        </p>
      </SectionCard>

      {/* TIER 3: Collections - 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Books */}
        <SectionCard icon={BookMarked} title="Books" count={daemonData.favorite_books?.length} delay={0.2}>
          <SafeList items={daemonData.favorite_books} fallback="No books listed" />
        </SectionCard>

        {/* Movies */}
        <SectionCard icon={Film} title="Movies" count={daemonData.favorite_movies?.length} delay={0.25}>
          <SafeList items={daemonData.favorite_movies} fallback="No movies listed" />
        </SectionCard>

        {/* Podcasts */}
        <SectionCard icon={Headphones} title="Podcasts" count={daemonData.favorite_podcasts?.length} delay={0.3}>
          <SafeList items={daemonData.favorite_podcasts} fallback="No podcasts listed" />
        </SectionCard>
      </div>

      {/* TIER 4: Context - 2 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Preferences */}
        <SectionCard icon={Settings} title="Preferences" delay={0.35} variant="subtle">
          <SafeList
            items={daemonData.preferences}
            fallback="No preferences listed"
            renderItem={(pref, i) => (
              <p key={i} className="text-sm text-text-tertiary font-body">{pref}</p>
            )}
          />
        </SectionCard>

        {/* Daily Routine */}
        <SectionCard icon={Clock} title="Routine" count={daemonData.daily_routine?.length} delay={0.4} variant="subtle">
          <SafeList
            items={daemonData.daily_routine}
            fallback="No routine listed"
            renderItem={(item, i) => (
              <p key={i} className="text-sm text-text-tertiary font-body">{item}</p>
            )}
          />
        </SectionCard>
      </div>

      {/* TIER 5: API Access - Centered Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="flex justify-center pt-4"
      >
        <div className="rounded border border-border-subtle bg-bg-tertiary/50 backdrop-blur-sm p-6 max-w-md w-full text-center card-glow">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Server className="w-5 h-5 text-accent" />
            <span className="font-display text-sm tracking-wider text-text-tertiary uppercase">API Access</span>
          </div>
          <code className="font-mono text-base text-brand block mb-3">daemon-eight.vercel.app</code>
          <p className="text-sm text-text-tertiary font-body mb-4">Connect your AI assistant directly</p>
          <a
            href="/api/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-bg-secondary hover:bg-bg-elevated text-text-secondary hover:text-text-primary border border-border-subtle transition-colors text-sm font-mono"
          >
            View API Docs <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
