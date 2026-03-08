import React, { useState } from 'react';
import { Code2, Menu, X, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

export default function LandingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#howitworks' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed top-0 w-full z-50 backdrop-blur-sm border-b"
      style={{
        background: isDark ? 'rgba(15, 23, 41, 0.92)' : 'rgba(255, 255, 255, 0.9)',
        borderColor: isDark ? 'rgba(96, 165, 250, 0.2)' : 'rgba(251, 146, 60, 0.2)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div style={{
              background: isDark ? 'rgba(96, 165, 250, 0.15)' : 'rgba(251, 146, 60, 0.15)',
              borderColor: isDark ? 'rgba(96, 165, 250, 0.35)' : 'rgba(251, 146, 60, 0.35)'
            }} className="p-2 border rounded-lg transition">
              <Code2 style={{ color: isDark ? '#60a5fa' : '#fb923c' }} className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span style={{ color: 'var(--text-primary)' }} className="font-bold text-base">CodeReview</span>
              <span style={{ color: 'var(--text-secondary)' }} className="text-xs font-medium">Analysis</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ backgroundColor: isDark ? 'rgba(96, 165, 250, 0.12)' : 'rgba(251, 146, 60, 0.12)' }}
                className="relative px-4 py-2 transition font-medium text-sm rounded-lg"
                style={{
                  color: isDark ? 'var(--text-secondary)' : 'var(--text-secondary)'
                }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="hidden md:flex p-2.5 rounded-lg transition"
            style={{
              background: isDark ? 'rgba(96, 165, 250, 0.15)' : 'rgba(251, 146, 60, 0.15)',
              color: isDark ? '#60a5fa' : '#fb923c',
              border: isDark ? '1px solid rgba(96, 165, 250, 0.3)' : '1px solid rgba(251, 146, 60, 0.3)'
            }}
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          {/* Desktop CTA Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="hidden md:block"
          >
            <Link
              to="/editor"
              className="btn-gradient px-6 py-2.5 font-semibold rounded-lg transition"
              style={{ color: isDark ? '#ffffff' : '#1f2937' }}
            >
              Start Analysis
            </Link>
          </motion.div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg transition"
              style={{
                background: isDark ? 'rgba(96, 165, 250, 0.15)' : 'rgba(251, 146, 60, 0.15)',
                color: isDark ? '#60a5fa' : '#fb923c'
              }}
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg transition"
              style={{
                color: 'var(--text-secondary)',
                background: isDark ? 'rgba(96, 165, 250, 0.1)' : 'rgba(251, 146, 60, 0.1)'
              }}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: mobileOpen ? 1 : 0, height: mobileOpen ? 'auto' : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="md:hidden overflow-hidden"
          style={{
            borderColor: isDark ? 'rgba(96, 165, 250, 0.2)' : 'rgba(251, 146, 60, 0.2)',
            borderTopWidth: '1px'
          }}
        >
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={mobileOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: i * 0.05 }}
                className="block px-4 py-2.5 rounded-lg transition font-medium"
                style={{
                  color: 'var(--text-secondary)',
                  background: isDark ? 'rgba(96, 165, 250, 0.1)' : 'rgba(251, 146, 60, 0.1)'
                }}
              >
                {link.name}
              </motion.a>
            ))}
            <Link
              to="/editor"
              onClick={() => setMobileOpen(false)}
              className="block w-full mt-4 px-4 py-3 btn-gradient text-slate-900 font-semibold text-center rounded-lg transition-all duration-300"
            >
              Start Analysis
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}




