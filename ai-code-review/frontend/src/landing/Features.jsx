import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Shield, Zap, TrendingUp } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export default function Features() {
  const { isDark } = useTheme();
  const features = [
    {
      icon: Code2,
      title: 'Smart Analysis',
      description: 'Detect code smells and syntax issues quickly.',
      color: '#6366f1',
      lightBg: 'rgba(99, 102, 241, 0.1)',
      darkBg: 'rgba(99, 102, 241, 0.15)',
      lightGradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0.05) 100%)',
      darkGradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0.05) 100%)',
    },
    {
      icon: Shield,
      title: 'Security Checks',
      description: 'Catch risky patterns before deployment.',
      color: '#10b981',
      lightBg: 'rgba(16, 185, 129, 0.1)',
      darkBg: 'rgba(16, 185, 129, 0.15)',
      lightGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.05) 100%)',
      darkGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.05) 100%)',
    },
    {
      icon: Zap,
      title: 'Fast Feedback',
      description: 'Real-time scoring and execution output.',
      color: '#f59e0b',
      lightBg: 'rgba(245, 158, 11, 0.1)',
      darkBg: 'rgba(245, 158, 11, 0.15)',
      lightGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.05) 100%)',
      darkGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(245, 158, 11, 0.05) 100%)',
    },
    {
      icon: TrendingUp,
      title: 'Quality Metrics',
      description: 'Track complexity and code health trends.',
      color: '#ef4444',
      lightBg: 'rgba(239, 68, 68, 0.1)',
      darkBg: 'rgba(239, 68, 68, 0.15)',
      lightGradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)',
      darkGradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.05) 100%)',
    },
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8" style={{ 
      background: isDark ? 'var(--bg-primary)' : 'var(--bg-primary)', 
      color: 'var(--text-primary)' 
    }}>
      <div className="max-w-7xl mx-auto">
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
            }}>Powerful Features</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto mt-4" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
            Everything you need in one clean dashboard to review, debug, and improve code.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                {/* Card Background Glow */}
                <div className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur" 
                  style={{ 
                    background: `linear-gradient(135deg, ${feature.color}, ${feature.color}40)`,
                    zIndex: -1 
                  }}>
                </div>

                {/* Main Card */}
                <div 
                  className="relative p-7 rounded-xl border-2 transition-all duration-300 backdrop-blur-sm"
                  style={{
                    background: isDark ? feature.darkGradient : feature.lightGradient,
                    borderColor: feature.color,
                    borderWidth: '2px',
                    boxShadow: isDark 
                      ? `0 0 20px ${feature.color}20, 0 4px 12px rgba(0, 0, 0, 0.15)`
                      : `0 0 15px ${feature.color}15, 0 2px 8px rgba(0, 0, 0, 0.08)`
                  }}
                >
                  {/* Icon Container */}
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: isDark ? feature.darkBg : feature.lightBg,
                      borderColor: feature.color,
                      borderWidth: '2px',
                      boxShadow: `0 0 15px ${feature.color}30 inset`
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: feature.color, strokeWidth: 2.5 }} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                    {feature.description}
                  </p>

                  {/* Bottom Accent Line */}
                  <div 
                    className="mt-5 h-1 rounded-full transition-all duration-300 origin-left group-hover:w-full"
                    style={{
                      width: '0px',
                      background: `linear-gradient(90deg, ${feature.color}, transparent)`,
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


