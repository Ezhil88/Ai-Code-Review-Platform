import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Zap, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export default function HowItWorks() {
  const { isDark } = useTheme();
  const steps = [
    {
      number: '01',
      title: 'Upload Your Code',
      description: 'Paste or upload your code and choose the language you want to analyze.',
      icon: Upload,
      color: '#6366f1',
      lightBg: 'rgba(99, 102, 241, 0.1)',
      darkBg: 'rgba(99, 102, 241, 0.15)',
      lightGradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0.05) 100%)',
      darkGradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0.05) 100%)',
    },
    {
      number: '02',
      title: 'AI Analyzes',
      description: 'Our analysis engine detects syntax, quality, and potential bug patterns.',
      icon: Zap,
      color: '#10b981',
      lightBg: 'rgba(16, 185, 129, 0.1)',
      darkBg: 'rgba(16, 185, 129, 0.15)',
      lightGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.05) 100%)',
      darkGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.05) 100%)',
    },
    {
      number: '03',
      title: 'Get Results',
      description: 'Review scores, issues, and execution output to improve your code quickly.',
      icon: CheckCircle2,
      color: '#f59e0b',
      lightBg: 'rgba(245, 158, 11, 0.1)',
      darkBg: 'rgba(245, 158, 11, 0.15)',
      lightGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.05) 100%)',
      darkGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(245, 158, 11, 0.05) 100%)',
    },
  ];

  return (
    <section id="howitworks" className="py-24 px-4 sm:px-6 lg:px-8" style={{ 
      background: isDark ? 'var(--bg-primary)' : 'var(--bg-primary)', 
      color: 'var(--text-primary)' 
    }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-5" style={{ color: 'var(--text-primary)' }}>
            <span style={{ 
              background: 'linear-gradient(135deg, #6366f1 0%, #10b981 50%, #f59e0b 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '800'
            }}>How It Works</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto mt-4" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
            Three steps to transform your code from raw to refined.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                {/* Card Background Glow */}
                <div className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur" 
                  style={{ 
                    background: `linear-gradient(135deg, ${step.color}, ${step.color}40)`,
                    zIndex: -1 
                  }}>
                </div>

                {/* Main Card */}
                <div 
                  className="relative p-8 rounded-xl border-2 transition-all duration-300 backdrop-blur-sm h-full flex flex-col"
                  style={{
                    background: isDark ? step.darkGradient : step.lightGradient,
                    borderColor: step.color,
                    borderWidth: '2px',
                    boxShadow: isDark 
                      ? `0 0 25px ${step.color}25, 0 4px 12px rgba(0, 0, 0, 0.15)`
                      : `0 0 20px ${step.color}15, 0 2px 8px rgba(0, 0, 0, 0.08)`
                  }}
                >
                  {/* Step Number */}
                  <div 
                    className="text-5xl font-black mb-4 transition-all duration-300"
                    style={{ 
                      color: step.color,
                      opacity: 0.15
                    }}
                  >
                    {step.number}
                  </div>

                  {/* Icon Container */}
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: isDark ? step.darkBg : step.lightBg,
                      borderColor: step.color,
                      borderWidth: '2px',
                      boxShadow: `0 0 15px ${step.color}30 inset`
                    }}
                  >
                    <Icon className="w-8 h-8" style={{ color: step.color, strokeWidth: 2.5 }} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed flex-grow" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                    {step.description}
                  </p>

                  {/* Bottom Accent Line */}
                  <div 
                    className="mt-6 h-1 rounded-full transition-all duration-300 origin-left group-hover:w-full"
                    style={{
                      width: '40px',
                      background: `linear-gradient(90deg, ${step.color}, transparent)`,
                      opacity: 0.7
                    }}
                  ></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


