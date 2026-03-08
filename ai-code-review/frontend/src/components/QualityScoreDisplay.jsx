import { CheckCircle, AlertCircle, AlertTriangle, Zap, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QualityScoreDisplay({ score = 0, summary = {} }) {
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-orange-600';
    if (score >= 75) return 'text-orange-600';
    if (score >= 60) return 'text-orange-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-orange-600';
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 60) return 'Fair';
    if (score >= 40) return 'Poor';
    return 'Critical';
  };

  const getScoreIcon = (score) => {
    if (score >= 90) return <CheckCircle className="h-12 w-12" />;
    if (score >= 70) return <AlertCircle className="h-12 w-12" />;
    if (score >= 40) return <AlertTriangle className="h-12 w-12" />;
    return <Flame className="h-12 w-12" />;
  };

  const getProgressColor = (score) => {
    if (score >= 90) return 'from-orange-500 to-orange-500';
    if (score >= 75) return 'from-orange-500 to-orange-500';
    if (score >= 60) return 'from-orange-500 to-orange-500';
    if (score >= 40) return 'from-orange-500 to-orange-500';
    return 'from-orange-600 to-orange-500';
  };

  const getBackgroundGradient = (score) => {
    if (score >= 90) return 'from-orange-950 to-orange-950';
    if (score >= 75) return 'from-orange-950 to-orange-950';
    if (score >= 60) return 'from-orange-950 to-orange-950';
    if (score >= 40) return 'from-orange-950 to-orange-950';
    return 'from-orange-950 to-orange-950';
  };

  const getBorderColor = (score) => {
    if (score >= 90) return 'border-orange-500/50';
    if (score >= 75) return 'border-orange-500/50';
    if (score >= 60) return 'border-orange-500/50';
    if (score >= 40) return 'border-orange-500/50';
    return 'border-orange-500/50';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`floating-card rounded-2xl p-8 bg-gradient-to-br ${getBackgroundGradient(score)} border-2 ${getBorderColor(score)}`}
    >
      <div className="flex items-start justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Code Quality Score</h3>
          <p className="text-sm text-slate-600">Overall code health and best practices</p>
        </div>
        <Zap className="h-6 w-6 text-orange-500" />
      </div>

      {/* Score Display with Animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Left side: Score circle and label */}
        <div className="flex items-center justify-center">
          <div className="relative w-40 h-40">
            {/* Background circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="80" cy="80" r="70" fill="none" stroke="#475569" strokeWidth="12" />
              {/* Animated progress circle */}
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                strokeDasharray={`${(score / 100) * 439.82} 439.82`}
                strokeLinecap="round"
                initial={{ strokeDasharray: '0 439.82' }}
                animate={{ strokeDasharray: `${(score / 100) * 439.82} 439.82` }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className={`${getScoreColor(score)}`}
              />
            </svg>
            {/* Score text in center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-center"
              >
                <p className={`text-5xl font-extrabold ${getScoreColor(score)}`}>{score}</p>
                <p className={`text-sm font-semibold ${getScoreColor(score)}`}>{getScoreLabel(score)}</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right side: Icon and metrics */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="flex items-center gap-6">
            <div className={`${getScoreColor(score)}`}>
              {getScoreIcon(score)}
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900">{getScoreLabel(score)} Code Quality</p>
              <p className="text-slate-600 text-sm mt-1">Your code has {score >= 80 ? 'excellent' : score >= 60 ? 'good' : 'needs improvement'} structure</p>
            </div>
          </div>

          {/* Summary Stats */}
          {summary && (
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-orange-200">
              <div className="bg-orange-500/20 rounded-lg p-3 border border-orange-500/50">
                <p className="text-orange-400 font-bold text-2xl">{summary.critical || 0}</p>
                <p className="text-xs text-slate-600">Critical</p>
              </div>
              <div className="bg-orange-500/20 rounded-lg p-3 border border-orange-500/50">
                <p className="text-orange-400 font-bold text-2xl">{summary.errors || 0}</p>
                <p className="text-xs text-slate-600">Errors</p>
              </div>
              <div className="bg-orange-500/20 rounded-lg p-3 border border-orange-500/50">
                <p className="text-orange-400 font-bold text-2xl">{summary.warnings || 0}</p>
                <p className="text-xs text-slate-600">Warnings</p>
              </div>
              <div className="bg-stone-500/20 rounded-lg p-3 border border-stone-500/50">
                <p className="text-stone-400 font-bold text-2xl">{summary.info || 0}</p>
                <p className="text-xs text-slate-600">Info</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-3 pt-6 border-t border-orange-200">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-slate-600">Quality Progress</span>
          <span className={`text-sm font-bold ${getScoreColor(score)}`}>{score}%</span>
        </div>
        <div className="w-full h-3 bg-orange-100 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${getProgressColor(score)} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Recommendation */}
      {summary?.recommendation && (
        <div className="mt-6 p-4 bg-orange-500/20 border border-orange-500/50 rounded-xl">
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-orange-300">
              <span className="font-semibold">Suggestion: </span>
              {summary.recommendation}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

