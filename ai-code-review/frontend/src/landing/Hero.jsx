import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Code2, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#0f1729', color: '#ffffff' }}>
      {/* Site Logo and Title - Top Left Corner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-6 left-6 z-50 flex items-center gap-3"
      >
        <div className="p-2 rounded-lg border transition-all" style={{
          background: 'rgba(96, 165, 250, 0.15)',
          borderColor: 'rgba(96, 165, 250, 0.35)'
        }}>
          <Code2 className="w-6 h-6" style={{ color: '#60a5fa' }} />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-lg font-bold text-white">CodeReview</h2>
          <p className="text-xs font-medium text-slate-400">Analysis</p>
        </div>
      </motion.div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 12, 0], y: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -left-24 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: 'rgba(96, 165, 250, 0.15)'
          }}
        />
        <motion.div
          animate={{ x: [0, -14, 0], y: [0, 12, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-0 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: 'rgba(59, 130, 246, 0.15)'
          }}
        />
        <motion.div
          animate={{ x: [0, 10, 0], y: [0, 8, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full blur-3xl"
          style={{
            background: 'rgba(96, 165, 250, 0.12)'
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4">
              <span className="block text-white">AI Code Review &</span>
              <span className="block gradient-text mt-2">Bug Detection Platform</span>
            </h1>
            <p className="text-xl max-w-2xl mx-auto leading-relaxed text-slate-300">
              Detect syntax errors, vulnerabilities, and quality issues instantly. Ship cleaner code faster with actionable AI feedback.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/editor" className="button-gradient inline-flex items-center gap-2 px-8 py-4 font-semibold text-white">
              Start Analyzing
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/dashboard" className="px-8 py-4 font-semibold border rounded-lg transition text-slate-300" style={{
              borderColor: 'rgba(96, 165, 250, 0.3)',
              background: 'rgba(96, 165, 250, 0.1)'
            }}>
              View Dashboard
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { icon: Code2, title: 'Smart Analysis', desc: 'Detect code smells and syntax issues quickly.', color: '#6366f1' },
            { icon: Shield, title: 'Security Checks', desc: 'Catch risky patterns before deployment.', color: '#10b981' },
            { icon: Zap, title: 'Fast Feedback', desc: 'Real-time scoring and execution output.', color: '#f59e0b' },
          ].map((feature, index) => (
            <motion.div 
              key={feature.title} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12 }}
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

              {/* Card */}
              <div 
                className="relative p-7 rounded-xl border-2 transition-all duration-300 backdrop-blur-sm h-full"
                style={{
                  background: `linear-gradient(135deg, rgba(${feature.color === '#6366f1' ? '99, 102, 241' : feature.color === '#10b981' ? '16, 185, 129' : '245, 158, 11'}, 0.15) 0%, rgba(${feature.color === '#6366f1' ? '99, 102, 241' : feature.color === '#10b981' ? '16, 185, 129' : '245, 158, 11'}, 0.05) 100%)`,
                  borderColor: feature.color,
                  borderWidth: '2px',
                  boxShadow: `0 0 25px ${feature.color}25, 0 4px 12px rgba(0, 0, 0, 0.2)`
                }}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `rgba(${feature.color === '#6366f1' ? '99, 102, 241' : feature.color === '#10b981' ? '16, 185, 129' : '245, 158, 11'}, 0.2)`,
                    borderColor: feature.color,
                    borderWidth: '2px',
                    boxShadow: `0 0 15px ${feature.color}30 inset`
                  }}
                >
                  <feature.icon className="h-6 w-6" style={{ color: feature.color, strokeWidth: 2.5 }} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                <p className="mb-0 text-slate-300" style={{ fontWeight: 500 }}>{feature.desc}</p>

                {/* Bottom Accent Line */}
                <div 
                  className="mt-6 h-1 rounded-full transition-all duration-300 origin-left group-hover:w-full"
                  style={{
                    width: '40px',
                    background: `linear-gradient(90deg, ${feature.color}, transparent)`,
                    opacity: 0.7
                  }}
                ></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


