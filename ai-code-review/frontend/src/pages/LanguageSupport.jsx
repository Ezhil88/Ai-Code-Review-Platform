import { CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LanguageSupport() {
  const supportedLanguages = [
    { name: 'Python', icon: 'PY', color: 'from-orange-600 to-orange-500' },
    { name: 'JavaScript', icon: 'JS', color: 'from-orange-500 to-orange-500' },
    { name: 'Java', icon: 'JV', color: 'from-orange-500 to-orange-500' },
    { name: 'C++', icon: 'C++', color: 'from-orange-500 to-orange-600' },
    { name: 'C', icon: 'C', color: 'from-slate-500 to-slate-600' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Multi-Language Support</h1>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Analyze code with language-aware syntax validation, issue detection, and practical fix suggestions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {supportedLanguages.map((lang, index) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="floating-card"
            >
              <div className="text-lg mb-2 font-bold" style={{ color: 'var(--text-secondary)' }}>{lang.icon}</div>
              <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{lang.name}</h3>
              <div className={`w-full py-2 px-3 rounded-lg bg-gradient-to-r ${lang.color} text-white text-sm font-semibold text-center`}>
                Supported
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="floating-card">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Common Checks</h2>
            <ul className="space-y-2" style={{ color: 'var(--text-secondary)' }}>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-orange-500 mt-1" /> Syntax error detection</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-orange-500 mt-1" /> Logic issues and anti-patterns</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-orange-500 mt-1" /> Security vulnerability hints</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-orange-500 mt-1" /> Quality score with explanation</li>
            </ul>
          </div>

          <div className="floating-card">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Scoring Rules</h2>
            <ul className="space-y-2" style={{ color: 'var(--text-secondary)' }}>
              <li className="flex items-start gap-2"><AlertCircle className="h-4 w-4 text-orange-500 mt-1" /> Critical issues: major deduction</li>
              <li className="flex items-start gap-2"><AlertCircle className="h-4 w-4 text-orange-500 mt-1" /> Errors: medium deduction</li>
              <li className="flex items-start gap-2"><AlertCircle className="h-4 w-4 text-orange-500 mt-1" /> Warnings: minor deduction</li>
              <li className="flex items-start gap-2"><AlertCircle className="h-4 w-4 text-orange-500 mt-1" /> 100 score only when no issues are found</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}



