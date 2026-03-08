import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from '../components/CodeEditor';
import ResultPanel from '../components/ResultPanel';
import ErrorBoundary from '../components/ErrorBoundary';
import { Zap, Share2, Sparkles, History } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';
const ANALYSIS_HISTORY_KEY = 'analyses';

function getApiErrorMessage(err, actionLabel = 'request') {
  if (err?.response) {
    const status = err.response.status;
    const backendMessage = err.response?.data?.error || err.response?.data?.details || err.message;

    if (status === 404) {
      return `API endpoint not found (404) while trying to ${actionLabel}. Verify backend route and URL: ${API_BASE_URL}/analyze`;
    }

    return `Backend error (${status}) while trying to ${actionLabel}: ${backendMessage}`;
  }

  if (err?.request) {
    return `Cannot reach backend server on ${API_BASE_URL}. Make sure Node.js server is running on port 5000.`;
  }

  return `Unexpected error while trying to ${actionLabel}: ${err?.message || 'Unknown error'}`;
}

export default function Editor() {
  const [code, setCode] = useState('');
  const [programInput, setProgramInput] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('auto');
  const [history, setHistory] = useState([]);
  const [repoUrl, setRepoUrl] = useState('');
  const [repoReport, setRepoReport] = useState(null);
  const [shareUrl, setShareUrl] = useState('');
  const [isExplaining, setIsExplaining] = useState(false);

  useEffect(() => {
    let parsedHistory = [];

    try {
      const storedValue = localStorage.getItem(ANALYSIS_HISTORY_KEY);
      const parsed = storedValue ? JSON.parse(storedValue) : [];
      parsedHistory = Array.isArray(parsed) ? parsed : [];
    } catch (_error) {
      parsedHistory = [];
    }

    // Keep only latest 10 runs and normalize numbering from 1.
    const normalizedHistory = parsedHistory
      .slice(-10)
      .map((item, index) => ({
        ...item,
        runNumber: index + 1,
      }));

    setHistory(normalizedHistory);

    if (normalizedHistory.length === 0) {
      localStorage.setItem(ANALYSIS_HISTORY_KEY, JSON.stringify([]));
    } else {
      localStorage.setItem(ANALYSIS_HISTORY_KEY, JSON.stringify(normalizedHistory));
    }

    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get('session');

    if (!sessionId) {
      return;
    }

    axios.get(`${API_BASE_URL}/shared-session/${sessionId}`)
      .then((response) => {
        const session = response.data;
        setCode(session.code || '');
        setProgramInput(session.input || '');
        setSelectedLanguage(session.language || 'auto');
        if (session.result) {
          setResult(session.result);
        }
      })
      .catch(() => {
        setError('Unable to load shared session.');
      });
  }, []);

  const persistHistory = (analysisEntry) => {
    setHistory((previousHistory) => {
      const nextRunNumber = previousHistory.length + 1;
      const updatedHistory = [
        ...previousHistory,
        {
          ...analysisEntry,
          runNumber: nextRunNumber,
        },
      ];

      // Keep latest 10 runs and re-number from Run #1.
      const latestTenRuns = updatedHistory
        .slice(-10)
        .map((item, index) => ({
          ...item,
          runNumber: index + 1,
        }));

      localStorage.setItem(ANALYSIS_HISTORY_KEY, JSON.stringify(latestTenRuns));
      return latestTenRuns;
    });
  };

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setError('Please enter some code to analyze');
      return;
    }

    setIsLoading(true);
    setError(null);
    setRepoReport(null);

    try {
      const requestPayload = {
        code,
        input: programInput,
        ...(selectedLanguage !== 'auto' ? { language: selectedLanguage } : {}),
      };

      const response = await axios.post(`${API_BASE_URL}/analyze`, requestPayload);
      setResult(response.data);

      const analysisEntry = {
        code,
        input: programInput,
        language: selectedLanguage,
        timestamp: new Date().toISOString(),
        result: response.data,
      };
      persistHistory(analysisEntry);
    } catch (err) {
      setError(getApiErrorMessage(err, 'analyze code'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleExplainCode = async () => {
    if (!code.trim()) {
      setError('Enter code first to generate explanation.');
      return;
    }

    setIsExplaining(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/explain`, {
        code,
        ...(selectedLanguage !== 'auto' ? { language: selectedLanguage } : {}),
      });

      setResult((prev) => ({
        ...(prev || {}),
        code_explanation: response.data?.explanation,
        code_flow: response.data?.code_flow || [],
        language: response.data?.language || prev?.language || selectedLanguage,
      }));
    } catch (err) {
      setError(getApiErrorMessage(err, 'explain code'));
    } finally {
      setIsExplaining(false);
    }
  };

  const handleAnalyzeRepo = async () => {
    if (!repoUrl.trim()) {
      setError('Enter a GitHub repository URL first.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/analyze-repo`, { repositoryUrl: repoUrl.trim() });
      setRepoReport(response.data);
    } catch (err) {
      setError(getApiErrorMessage(err, 'analyze repository'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareSession = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/share-session`, {
        code,
        input: programInput,
        language: selectedLanguage,
        result,
      });

      setShareUrl(response.data?.shareUrl || '');
    } catch (err) {
      setError(getApiErrorMessage(err, 'create share link'));
    }
  };

  const loadHistoryItem = (item) => {
    setCode(item.code || '');
    setProgramInput(item.input || '');
    setSelectedLanguage(item.language || 'auto');
    setResult(item.result || null);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        <div
          className="h-16 fixed top-0 left-0 right-0 border-b z-40 flex items-center justify-between px-6"
          style={{
            background: 'var(--bg-secondary)',
            borderColor: 'var(--border-color)',
          }}
        >
          <h1 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Code Editor</h1>
          <div className="flex gap-2">
            <button onClick={handleExplainCode} className="btn btn-secondary btn-sm" disabled={isExplaining || isLoading}>
              <Sparkles size={14} />
              {isExplaining ? 'Explaining...' : 'Explain Code'}
            </button>
            <button onClick={handleShareSession} className="btn btn-secondary btn-sm" disabled={isLoading || !code.trim()}>
              <Share2 size={14} />
              Share
            </button>
          </div>
        </div>

        <div className="pt-16 flex h-[calc(100vh-64px)] gap-4 p-4" style={{ background: 'var(--bg-primary)' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 flex flex-col border rounded-lg overflow-hidden"
            style={{
              background: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
              minWidth: '45%',
            }}
          >
            <div className="flex-1 overflow-hidden">
              <CodeEditor
                code={code}
                setCode={setCode}
                onAnalyze={handleAnalyze}
                isLoading={isLoading}
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
              />
            </div>

            <div className="px-6 py-4 border-t flex flex-col gap-3" style={{ borderColor: 'var(--border-color)' }}>
              <div>
                <p className="text-xs uppercase tracking-wide font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Program Input
                </p>
                <textarea
                  value={programInput}
                  onChange={(e) => setProgramInput(e.target.value)}
                  rows={4}
                  placeholder={'Enter stdin values, one per line.\nExample:\n1 2 3 4\n3\n10'}
                  className="w-full p-3 rounded-md text-sm"
                  style={{
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                    fontFamily: 'Consolas, Monaco, Courier New, monospace',
                  }}
                />
              </div>

              <button
                onClick={handleAnalyze}
                disabled={isLoading || !code.trim()}
                className="btn btn-primary flex-1 gap-2 font-medium"
              >
                <Zap size={16} />
                {isLoading ? 'Analyzing...' : 'Analyze Code'}
              </button>

              <div>
                <p className="text-xs uppercase tracking-wide font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                  GitHub Repository Analyzer
                </p>
                <div className="flex gap-2">
                  <input
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/owner/repo"
                    className="flex-1 p-2 rounded-md text-sm"
                    style={{
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-color)',
                    }}
                  />
                  <button onClick={handleAnalyzeRepo} className="btn btn-secondary" disabled={isLoading}>
                    Analyze Repo
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-[30rem] flex flex-col border rounded-lg overflow-hidden"
            style={{
              background: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
              minWidth: '380px',
            }}
          >
            <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                Analysis Results
              </p>
              {shareUrl && (
                <p className="text-xs mt-1 break-all" style={{ color: 'var(--accent-primary)' }}>
                  Share Link: {shareUrl}
                </p>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg border"
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    borderColor: 'rgba(239, 68, 68, 0.3)',
                    color: '#fca5a5',
                  }}
                >
                  <p className="text-sm font-medium">Error</p>
                  <p className="text-xs mt-1">{error}</p>
                </motion.div>
              )}

              {repoReport && (
                <div className="result-card">
                  <p className="text-xs uppercase tracking-wide font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    Repository Report
                  </p>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-primary)' }}>
                    Repo: {repoReport.repository}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                    Files analyzed: {repoReport.files_analyzed}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                    Average Score: {repoReport.average_score}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                    Total Issues: {repoReport.total_issues}
                  </p>
                </div>
              )}

              {result ? (
                <ResultPanel result={result} />
              ) : (
                <div className="h-48 flex items-center justify-center">
                  <p style={{ color: 'var(--text-tertiary)' }} className="text-sm text-center">
                    {isLoading ? 'Analyzing code...' : 'Results will appear here'}
                  </p>
                </div>
              )}

              {history.length > 0 && (
                <div className="result-card">
                  <div className="flex items-center gap-2 mb-2">
                    <History size={14} style={{ color: 'var(--text-secondary)' }} />
                    <p className="text-xs uppercase tracking-wide font-semibold" style={{ color: 'var(--text-secondary)' }}>
                      Run History
                    </p>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {history.map((item, index) => (
                      <button
                        key={`${item.timestamp || item.runNumber}-${index}`}
                        className="w-full text-left p-2 rounded border text-xs"
                        style={{
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)',
                          background: 'var(--bg-tertiary)',
                        }}
                        onClick={() => loadHistoryItem(item)}
                      >
                        Run #{item?.runNumber ?? index + 1} | Score: {item?.result?.score ?? 'N/A'}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
