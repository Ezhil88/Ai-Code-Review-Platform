import { AlertTriangle, AlertCircle, Info, ChevronDown, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

function getWhyHappens(issue) {
  const text = `${issue?.type || ''} ${issue?.problem || ''}`;

  if (/syntax|token|parse/i.test(text)) {
    return 'The statement does not follow the required language syntax rules.';
  }

  if (/type|undefined|null|reference/i.test(text)) {
    return 'A value type mismatch or missing variable/function reference caused this issue.';
  }

  if (/loop|complexity|performance|inefficient/i.test(text)) {
    return 'The current structure increases execution cost and can slow runtime behavior.';
  }

  if (/security|eval|injection|unsafe|xss|sql/i.test(text)) {
    return 'This pattern can expose the application to unsafe code execution or data attacks.';
  }

  return 'This issue happens because the current implementation violates analyzer checks for correctness or best practices.';
}

function getSeverityStyle(severity) {
  const normalized = String(severity || 'Info').toLowerCase();

  if (normalized === 'critical') {
    return {
      label: 'Critical',
      color: '#ef4444',
      border: 'rgba(239, 68, 68, 0.35)',
      bg: 'rgba(239, 68, 68, 0.08)'
    };
  }

  if (normalized === 'error') {
    return {
      label: 'Error',
      color: '#f97316',
      border: 'rgba(249, 115, 22, 0.35)',
      bg: 'rgba(249, 115, 22, 0.08)'
    };
  }

  if (normalized === 'warning') {
    return {
      label: 'Warning',
      color: '#eab308',
      border: 'rgba(234, 179, 8, 0.35)',
      bg: 'rgba(234, 179, 8, 0.08)'
    };
  }

  return {
    label: 'Info',
    color: '#3b82f6',
    border: 'rgba(59, 130, 246, 0.35)',
    bg: 'rgba(59, 130, 246, 0.08)'
  };
}

function getSeverityIcon(severity) {
  const normalized = String(severity || 'Info').toLowerCase();

  if (normalized === 'critical' || normalized === 'error') {
    return <AlertTriangle size={16} />;
  }

  if (normalized === 'warning') {
    return <AlertCircle size={16} />;
  }

  return <Info size={16} />;
}

export default function IssuesList({ issues = [] }) {
  const [expanded, setExpanded] = useState({});

  if (!Array.isArray(issues) || issues.length === 0) {
    return null;
  }

  const toggle = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="space-y-3">
      {issues.map((issue, index) => {
        const style = getSeverityStyle(issue?.severity);
        const isOpen = !!expanded[index];

        return (
          <motion.div
            key={`${issue?.line || 0}-${issue?.type || 'issue'}-${index}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className="result-card"
            style={{
              borderColor: style.border,
              background: style.bg,
              borderWidth: '1px'
            }}
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              className="w-full text-left"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                  <span style={{ color: style.color }} className="mt-0.5">{getSeverityIcon(issue?.severity)}</span>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      Line {issue?.line || 'N/A'} | {issue?.type || 'Issue'}
                    </p>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                      {issue?.problem || 'No problem description available.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded-md border"
                    style={{
                      color: style.color,
                      borderColor: style.border,
                      background: 'transparent'
                    }}
                  >
                    {style.label}
                  </span>
                  <span style={{ color: 'var(--text-tertiary)' }}>
                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </span>
                </div>
              </div>
            </button>

            {isOpen && (
              <div className="mt-3 pt-3 border-t space-y-3" style={{ borderColor: 'var(--border-color)' }}>
                <div>
                  <p className="text-xs uppercase tracking-wide font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    Problem Description
                  </p>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-primary)' }}>
                    {issue?.problem || 'No problem details available.'}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    Why It Happens
                  </p>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-primary)' }}>
                    {issue?.explanation || getWhyHappens(issue)}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    Suggested Fix
                  </p>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-primary)' }}>
                    {issue?.solution || 'Review this line and apply the recommended language syntax or safe pattern.'}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    Corrected Code Example
                  </p>
                  <pre
                    className="mt-1 p-3 rounded-md text-xs overflow-x-auto"
                    style={{
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <code>{issue?.example_fix || issue?.solution || 'No code example available.'}</code>
                  </pre>
                </div>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
