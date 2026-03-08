import { Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav 
      className="sticky top-0 z-50 border-b"
      style={{ 
        background: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)',
        backdropFilter: 'blur(12px)',
        backgroundImage: 'linear-gradient(180deg, var(--bg-secondary) 0%, rgba(2, 6, 23, 0.8) 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Logo & Brand */}
        <Link 
          to="/" 
          className="flex items-center gap-3 hover:opacity-80 transition shrink-0"
        >
          <div 
            className="p-2 rounded-lg border"
            style={{
              background: 'rgba(99, 102, 241, 0.1)',
              borderColor: 'rgba(99, 102, 241, 0.3)'
            }}
          >
            <Code2 size={20} style={{ color: 'var(--accent-primary)' }} />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              AI Code Review
            </h1>
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              Bug Detection Platform
            </p>
          </div>
        </Link>

        {/* Right - Links */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Primary CTA */}
          <Link
            to="/editor"
            className="btn btn-primary hidden sm:flex"
          >
            Start Analysis
          </Link>
        </div>
      </div>
    </nav>
  );
}



