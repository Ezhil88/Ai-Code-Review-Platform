import { TrendingUp, Copy, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useState } from 'react';
import IssuesList from './IssuesList';
import ProgramOutput from './ProgramOutput';

function getScoreMeta(score) {
  if (score >= 85) {
    return { status: 'Excellent', color: '#16a34a', bg: 'rgba(22, 163, 74, 0.12)' };
  }

  if (score >= 70) {
    return { status: 'Good', color: '#2563eb', bg: 'rgba(37, 99, 235, 0.12)' };
  }

  if (score >= 50) {
    return { status: 'Needs Improvement', color: '#d97706', bg: 'rgba(217, 119, 6, 0.12)' };
  }

  return { status: 'Poor', color: '#dc2626', bg: 'rgba(220, 38, 38, 0.12)' };
}

export default function ResultPanel({ result }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!result) {
    return (
      <div className="h-full flex items-center justify-center">
        <p style={{ color: 'var(--text-tertiary)' }} className="text-sm">
          Run analysis to see results
        </p>
      </div>
    );
  }

  const score = result?.code_quality_score || 0;
  const issues = result?.issues || [];
  const correctedCode = result?.corrected_code || '';
  const scoreMeta = getScoreMeta(score);
  const benchmark = result?.benchmark;
  const complexity = result?.complexity_analysis;
  const securityWarnings = result?.security_warnings || [];
  const performanceWarnings = result?.performance_warnings || [];
  const codeFlow = result?.code_flow || [];

  const copyCorrectedCode = async () => {
    await navigator.clipboard.writeText(correctedCode || '');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyReportSummary = async () => {
    const lines = [
      'AI Code Review Analysis Report',
      `Language: ${result?.language || 'Unknown'}`,
      `Code Quality Score: ${score}`,
      `Status: ${scoreMeta.status}`,
      `Issues Detected: ${result?.total_issues || 0}`,
      '',
      'Program Output:',
      result?.output || '(No output generated)'
    ];

    await navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadPdfReport = async () => {
    const reportElement = document.getElementById('analysis-report');
    if (!reportElement) {
      return;
    }

    try {
      setIsDownloading(true);

      const canvas = await html2canvas(reportElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const availableWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * availableWidth) / canvas.width;

      let remainingHeight = imgHeight;
      let position = margin;

      pdf.addImage(imgData, 'PNG', margin, position, availableWidth, imgHeight, undefined, 'FAST');
      remainingHeight -= pageHeight - margin * 2;

      while (remainingHeight > 0) {
        position = remainingHeight - imgHeight + margin;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', margin, position, availableWidth, imgHeight, undefined, 'FAST');
        remainingHeight -= pageHeight - margin * 2;
      }

      pdf.save('code-analysis-report.pdf');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div id="analysis-report" className="space-y-4 p-1">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="result-card"
          style={{ borderWidth: '1px', borderColor: 'var(--border-color)' }}
        >
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            AI Code Review Analysis Report
          </h2>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Language: {result?.language || 'Unknown'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="result-card"
          style={{
            background: scoreMeta.bg,
            borderColor: scoreMeta.color,
            borderWidth: '1px',
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wide font-semibold" style={{ color: scoreMeta.color }}>
                Code Quality Score
              </p>
              <p className="text-3xl font-bold mt-1" style={{ color: scoreMeta.color }}>
                {score}
              </p>
              <p className="text-sm font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>
                Status: {scoreMeta.status}
              </p>
            </div>
            <TrendingUp size={26} style={{ color: scoreMeta.color }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="result-card"
        >
          <p className="text-xs uppercase tracking-wide font-semibold" style={{ color: 'var(--text-secondary)' }}>
            Issues Detected
          </p>
          <p className="text-lg font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>
            {result?.total_issues || 0}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-xs uppercase tracking-wide font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
            Error Explanation and Suggested Fix
          </p>
          {issues.length > 0 ? (
            <IssuesList issues={issues} />
          ) : (
            <div className="result-card text-sm" style={{ color: 'var(--text-secondary)' }}>
              No issues found.
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="result-card"
        >
          <p className="text-xs uppercase tracking-wide font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
            Corrected Code
          </p>
          <pre
            className="p-3 rounded-md text-xs overflow-x-auto"
            style={{
              background: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              fontFamily: 'Consolas, Monaco, Courier New, monospace',
            }}
          >
            <code>{correctedCode || '(No corrected code generated)'}</code>
          </pre>
          <button onClick={copyCorrectedCode} className="btn btn-secondary mt-2 w-full">
            {copiedCode ? 'Corrected code copied' : 'Copy Corrected Code'}
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="result-card">
          <p className="text-xs uppercase tracking-wide font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
            AI Code Explanation
          </p>
          <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
            {result?.code_explanation || 'Use Explain Code to generate a logic summary.'}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.19 }} className="result-card">
          <p className="text-xs uppercase tracking-wide font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
            Complexity Analysis
          </p>
          <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
            Time Complexity: {complexity?.time_complexity || 'N/A'}
          </p>
          <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
            Space Complexity: {complexity?.space_complexity || 'N/A'}
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Recommendation: {complexity?.recommendation || 'No recommendation available.'}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="result-card">
          <p className="text-xs uppercase tracking-wide font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
            Security Analysis
          </p>
          {securityWarnings.length > 0 ? (
            <ul className="text-sm space-y-1" style={{ color: '#dc2626' }}>
              {securityWarnings.map((warning, index) => <li key={`${warning}-${index}`}>- {warning}</li>)}
            </ul>
          ) : (
            <p className="text-sm" style={{ color: 'var(--text-primary)' }}>No major security warnings detected.</p>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.21 }} className="result-card">
          <p className="text-xs uppercase tracking-wide font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
            Performance Insights
          </p>
          {benchmark ? (
            <>
              <p className="text-sm" style={{ color: 'var(--text-primary)' }}>Execution Time: {benchmark.execution_time_seconds} seconds</p>
              <p className="text-sm" style={{ color: 'var(--text-primary)' }}>Memory Usage: {benchmark.memory_usage_mb} MB</p>
              <p className="text-sm" style={{ color: 'var(--text-primary)' }}>CPU Usage: {benchmark.cpu_usage}</p>
            </>
          ) : (
            <p className="text-sm" style={{ color: 'var(--text-primary)' }}>Benchmark data not available.</p>
          )}

          {performanceWarnings.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-semibold" style={{ color: '#d97706' }}>Performance Warning</p>
              <ul className="text-sm space-y-1 mt-1" style={{ color: '#d97706' }}>
                {performanceWarnings.map((warning, index) => <li key={`${warning}-${index}`}>- {warning}</li>)}
              </ul>
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} className="result-card">
          <p className="text-xs uppercase tracking-wide font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
            Visual Code Flow
          </p>
          {codeFlow.length > 0 ? (
            <div className="space-y-1 text-sm" style={{ color: 'var(--text-primary)' }}>
              {codeFlow.map((step, index) => (
                <p key={`${step}-${index}`}>{index === 0 ? step : `-> ${step}`}</p>
              ))}
            </div>
          ) : (
            <p className="text-sm" style={{ color: 'var(--text-primary)' }}>Flow data not available.</p>
          )}
        </motion.div>

        <ProgramOutput
          output={result?.output}
          execution_failed={result?.execution_failed}
          execution_error={result?.execution_error}
          runtimeError={result?.runtime_error}
          outputSource={result?.output_generated_from}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2"
      >
        <button onClick={copyReportSummary} className="btn btn-secondary flex-1 gap-2" disabled={isDownloading}>
          <Copy size={14} />
          {copied ? 'Copied' : 'Copy'}
        </button>
        <button onClick={downloadPdfReport} className="btn btn-primary flex-1 gap-2" disabled={isDownloading}>
          <Download size={14} />
          {isDownloading ? 'Generating PDF...' : 'Download PDF'}
        </button>
      </motion.div>
    </div>
  );
}
