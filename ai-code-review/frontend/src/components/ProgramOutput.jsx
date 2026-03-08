import { Terminal, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProgramOutput({ output, execution_failed, execution_error, runtimeError, outputSource }) {
  if (!output && !execution_failed && !execution_error) {
    return null;
  }

  const hasFailure = !!execution_failed || !!execution_error;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="result-card"
      style={{
        borderColor: hasFailure ? 'rgba(220, 38, 38, 0.35)' : 'rgba(22, 163, 74, 0.35)',
        background: hasFailure ? 'rgba(220, 38, 38, 0.08)' : 'rgba(22, 163, 74, 0.08)'
      }}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Terminal size={16} style={{ color: hasFailure ? '#dc2626' : '#16a34a' }} />
          <p className="text-xs uppercase tracking-wide font-semibold" style={{ color: hasFailure ? '#dc2626' : '#16a34a' }}>
            Program Output
          </p>
        </div>
        {outputSource && (
          <span className="text-xs px-2 py-1 rounded border" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}>
            Source: {outputSource === 'corrected_code' ? 'Corrected Code' : outputSource}
          </span>
        )}
      </div>

      <div className="p-3 rounded-md border" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-tertiary)' }}>
        <div className="flex items-center gap-2 mb-2">
          {hasFailure ? (
            <>
              <AlertCircle size={14} style={{ color: '#dc2626' }} />
              <span className="text-sm font-semibold" style={{ color: '#dc2626' }}>Execution Failed</span>
            </>
          ) : (
            <>
              <CheckCircle size={14} style={{ color: '#16a34a' }} />
              <span className="text-sm font-semibold" style={{ color: '#16a34a' }}>Execution Successful</span>
            </>
          )}
        </div>

        {execution_error && (
          <div className="mb-3 p-2 rounded-md text-sm" style={{ background: 'rgba(220, 38, 38, 0.1)', color: '#dc2626' }}>
            {execution_error}
          </div>
        )}

        {hasFailure && runtimeError && (
          <div className="mb-3 p-3 rounded-md border" style={{ borderColor: 'rgba(220, 38, 38, 0.35)', background: 'rgba(220, 38, 38, 0.08)' }}>
            <p className="text-sm font-semibold" style={{ color: '#dc2626' }}>
              Error Type: {runtimeError?.type || 'RuntimeError'}
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-primary)' }}>
              Error Message: {runtimeError?.message || execution_error || 'Unknown runtime error'}
            </p>
            <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
              Explanation: {runtimeError?.explanation || 'The program failed while running.'}
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              Why it happened: {runtimeError?.why || 'An execution-time condition was not handled.'}
            </p>
            <p className="text-sm mt-1" style={{ color: '#dc2626' }}>
              How to fix it: {runtimeError?.fix || 'Review stack trace and add guards for failing operations.'}
            </p>
          </div>
        )}

        <pre className="text-sm whitespace-pre-wrap break-words overflow-x-auto" style={{ color: 'var(--text-primary)' }}>
          {output || '(No output generated)'}
        </pre>
      </div>
    </motion.div>
  );
}
