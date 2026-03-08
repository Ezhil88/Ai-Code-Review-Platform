import { useEffect, useMemo, useState } from 'react';
import { History, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

export default function Dashboard() {
  const { isDark } = useTheme();
  const [analyses, setAnalyses] = useState([]);

  useEffect(() => {
    const stoblue = localStorage.getItem('analyses');
    if (stoblue) {
      setAnalyses(JSON.parse(stoblue));
    }
  }, []);

  const deleteAnalysis = (index) => {
    const updated = analyses.filter((_, i) => i !== index);
    setAnalyses(updated);
    localStorage.setItem('analyses', JSON.stringify(updated));
  };

  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear all analysis history?')) {
      setAnalyses([]);
      localStorage.removeItem('analyses');
    }
  };

  const stats = useMemo(() => {
    const total = analyses.length;
    const average =
      total > 0
        ? Math.round(analyses.reduce((sum, a) => sum + (a.result?.code_quality_score || 0), 0) / total)
        : 0;
    const highest = total > 0 ? Math.max(...analyses.map((a) => a.result?.code_quality_score || 0)) : 0;
    const lastDate = total > 0 ? new Date(analyses[0].timestamp).toLocaleDateString() : 'N/A';
    return { total, average, highest, lastDate };
  }, [analyses]);

  const getScorePill = (score) => {
    if (isDark) {
      if (score >= 80) return 'text-emerald-400 bg-emerald-900/30';
      if (score >= 60) return 'text-cyan-400 bg-cyan-900/30';
      if (score >= 40) return 'text-yellow-400 bg-yellow-900/30';
      return 'text-red-400 bg-red-900/30';
    } else {
      if (score >= 80) return 'text-emerald-700 bg-emerald-100';
      if (score >= 60) return 'text-cyan-700 bg-cyan-100';
      if (score >= 40) return 'text-yellow-700 bg-yellow-100';
      return 'text-red-700 bg-red-100';
    }
  };

  return (
    <div style={{ background: 'var(--bg-primary)' }} className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 style={{ color: 'var(--text-primary)' }} className="text-4xl font-bold mb-2">User Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Track analysis history, quality trend, and recurring issues.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-5 mb-8">
          <div className="floating-card">
            <p style={{ color: 'var(--text-tertiary)' }} className="text-sm font-semibold mb-1">Total Analyses</p>
            <p style={{ color: 'var(--text-primary)' }} className="text-3xl font-bold mb-0">{stats.total}</p>
          </div>
          <div className="floating-card">
            <p style={{ color: 'var(--text-tertiary)' }} className="text-sm font-semibold mb-1">Avg. Quality Score</p>
            <p style={{ color: 'var(--text-primary)' }} className="text-3xl font-bold mb-0">{stats.average}</p>
          </div>
          <div className="floating-card">
            <p style={{ color: 'var(--text-tertiary)' }} className="text-sm font-semibold mb-1">Highest Score</p>
            <p style={{ color: isDark ? '#a855f7' : '#f97316' }} className="text-3xl font-bold mb-0">{stats.highest}</p>
          </div>
          <div className="floating-card">
            <p style={{ color: 'var(--text-tertiary)' }} className="text-sm font-semibold mb-1">Latest Analysis</p>
            <p style={{ color: 'var(--text-primary)' }} className="text-lg font-bold mb-0">{stats.lastDate}</p>
          </div>
        </div>

        <div className="floating-card p-0 overflow-hidden mb-8">
          <div style={{ 
            background: 'var(--bg-secondary)',
            borderColor: 'var(--border-color)'
          }} className="px-6 py-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <History className="h-5 w-5" style={{ color: isDark ? '#a855f7' : '#f97316' }} />
              <h2 style={{ color: 'var(--text-primary)' }} className="text-lg font-semibold mb-0">Analysis History</h2>
            </div>
            {analyses.length > 0 && (
              <button onClick={clearAll} className="btn-secondary inline-flex items-center gap-2 px-3 py-1.5 text-sm">
                <Trash2 size={14} />
                Clear All
              </button>
            )}
          </div>

          {analyses.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="text-5xl mb-4">📊</div>
              <h3 style={{ color: 'var(--text-primary)' }} className="text-xl font-bold mb-2">No Analysis Yet</h3>
              <p style={{ color: 'var(--text-secondary)' }} className="mb-6">Start analyzing code to build your quality history.</p>
              <Link to="/editor" className="button-gradient inline-flex items-center gap-2 font-semibold">
                Go to Editor
                <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            <div style={{ borderColor: 'var(--border-color)' }} className="divide-y">
              {analyses.map((analysis, index) => {
                const score = analysis.result?.code_quality_score || 0;
                const issues = analysis.result?.issues?.length || 0;
                return (
                  <div key={index} style={{
                    borderColor: 'var(--border-color)',
                  }} className="px-6 py-4 hover:opacity-80 transition flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p style={{ color: 'var(--text-primary)' }} className="font-medium line-clamp-2">{analysis.code}</p>
                      <p style={{ color: 'var(--text-tertiary)' }} className="text-xs mt-1">{new Date(analysis.timestamp).toLocaleString()}</p>
                      <div style={{ color: 'var(--text-tertiary)' }} className="flex gap-4 text-xs mt-2">
                        <span>Issues: <span style={{ color: isDark ? '#a855f7' : '#f97316' }} className="font-semibold">{issues}</span></span>
                        <span>Language: <span style={{ color: isDark ? '#a855f7' : '#f97316' }} className="font-semibold">{analysis.result?.language || 'Unknown'}</span></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${getScorePill(score)}`}>{score}</span>
                      <button
                        onClick={() => deleteAnalysis(index)}
                        style={{
                          background: isDark ? 'rgba(168, 85, 247, 0.1)' : 'rgba(251, 146, 60, 0.1)',
                          color: isDark ? '#a855f7' : '#f97316'
                        }}
                        className="p-2 rounded-lg hover:opacity-80 transition"
                        title="Delete analysis"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


