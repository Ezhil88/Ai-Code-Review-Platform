import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export default function DashboardPreview() {
  const { isDark } = useTheme();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ 
      background: isDark ? 'var(--bg-primary)' : 'var(--bg-primary)', 
      color: 'var(--text-primary)' 
    }}>
      <div className="max-w-4xl mx-auto">
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
            }}>Get in Touch</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative"
        >
          {/* Card Background Glow */}
          <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-75 transition-all duration-300 blur" 
            style={{ 
              background: 'linear-gradient(135deg, #6366f1, #10b981, #f59e0b)',
              zIndex: -1 
            }}>
          </div>

          {/* Main Card */}
          <div 
            className="relative p-10 rounded-2xl border-3 transition-all duration-300 backdrop-blur-sm"
            style={{
              background: isDark 
                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(16, 185, 129, 0.05) 50%, rgba(245, 158, 11, 0.05) 100%)'
                : 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(16, 185, 129, 0.04) 50%, rgba(245, 158, 11, 0.04) 100%)',
              borderColor: isDark ? '#3b5bdb' : 'rgba(99, 102, 241, 0.3)',
              borderWidth: '3px',
              boxShadow: isDark 
                ? '0 0 40px rgba(99, 102, 241, 0.25), 0 8px 24px rgba(0, 0, 0, 0.2)'
                : '0 0 30px rgba(99, 102, 241, 0.15), 0 4px 16px rgba(0, 0, 0, 0.08)'
            }}
          >
            <div className="space-y-8 text-center">
              {/* Profile Info */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <motion.h3 
                  className="text-4xl font-black mb-3" 
                  style={{ color: 'var(--text-primary)' }}
                  whileHover={{ scale: 1.05 }}
                >
                  Ezhilan V
                </motion.h3>
                <p className="text-xl font-bold" style={{ color: '#6366f1' }}>B.E Electronics & Communication</p>
                <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>Full-Stack Developer | Code Quality Enthusiast</p>
                <p className="text-sm mt-2" style={{ color: '#10b981' }}>
                  GitHub: <a href="https://github.com/Ezhil88" target="_blank" rel="noopener noreferrer" className="underline">github.com/Ezhil88</a>
                </p>
                <p className="text-base font-bold mt-4" style={{ color: '#ec4899' }}>
                  +91 8807257258
                </p>
              </motion.div>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-6 pt-6">
                <motion.a
                  href="https://linkedin.com/in/ezhilan-ezhil-1b308b301"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="group/link relative p-4 rounded-xl transition-all"
                  style={{
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0.1) 100%)',
                    border: '2px solid rgba(99, 102, 241, 0.4)',
                    color: '#6366f1',
                    boxShadow: '0 0 20px rgba(99, 102, 241, 0.2) inset'
                  }}
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <Linkedin size={32} strokeWidth={2} />
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold whitespace-nowrap opacity-0 group-hover/link:opacity-100 transition-all" style={{ color: '#6366f1' }}>LinkedIn</div>
                </motion.a>
                
                <motion.a
                  href="https://github.com/Ezhil88"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="group/link relative p-4 rounded-xl transition-all"
                  style={{
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%)',
                    border: '2px solid rgba(16, 185, 129, 0.4)',
                    color: '#10b981',
                    boxShadow: '0 0 20px rgba(16, 185, 129, 0.2) inset'
                  }}
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <Github size={32} strokeWidth={2} />
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold whitespace-nowrap opacity-0 group-hover/link:opacity-100 transition-all" style={{ color: '#10b981' }}>GitHub</div>
                </motion.a>

                <motion.a
                  href="mailto:ezhil7706096@gmail.com"
                  whileHover={{ scale: 1.15, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="group/link relative p-4 rounded-xl transition-all"
                  style={{
                    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(245, 158, 11, 0.1) 100%)',
                    border: '2px solid rgba(245, 158, 11, 0.4)',
                    color: '#f59e0b',
                    boxShadow: '0 0 20px rgba(245, 158, 11, 0.2) inset'
                  }}
                  aria-label="Email"
                  title="Email"
                >
                  <Mail size={32} strokeWidth={2} />
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold whitespace-nowrap opacity-0 group-hover/link:opacity-100 transition-all" style={{ color: '#f59e0b' }}>Email</div>
                </motion.a>

                <motion.a
                  href="tel:+918807257258"
                  whileHover={{ scale: 1.15, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="group/link relative p-4 rounded-xl transition-all"
                  style={{
                    background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(236, 72, 153, 0.1) 100%)',
                    border: '2px solid rgba(236, 72, 153, 0.4)',
                    color: '#ec4899',
                    boxShadow: '0 0 20px rgba(236, 72, 153, 0.2) inset'
                  }}
                  aria-label="Phone"
                  title="Phone"
                >
                  <Phone size={32} strokeWidth={2} />
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold whitespace-nowrap opacity-0 group-hover/link:opacity-100 transition-all" style={{ color: '#ec4899' }}>Phone</div>
                </motion.a>
              </div>

              {/* Status Message */}
              <motion.p 
                className="text-sm font-bold mt-8 pt-6" 
                style={{ 
                  color: 'var(--text-secondary)',
                  borderTop: `2px solid var(--border-color)`
                }}
                whileHover={{ scale: 1.05 }}
              >
                🚀 Available for collaboration and exciting projects
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


