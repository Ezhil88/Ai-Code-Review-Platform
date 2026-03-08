import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PremiumNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Editor', href: '/editor' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Languages', href: '/languages' },
    { label: 'Docs', href: '#' }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-orange-500/20 backdrop-blur-sm" style={{ background: 'rgba(255, 255, 255, 0.92)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-2 rounded-lg bg-orange-500/15 border border-orange-400/35 transition-all duration-300"
          >
            <Code2 className="h-6 w-6 text-orange-300" />
          </motion.div>
          <span className="font-bold text-lg hidden sm:block text-slate-900">CodeReview</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-slate-700 hover:text-orange-700 transition-colors relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-400 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block"
        >
          <Link
            to="/editor"
            className="btn-gradient px-6 py-2 text-slate-900 rounded-lg font-semibold hover:shadow-[0_12px_28px_rgba(8,145,178,0.35)] transition-all duration-300"
          >
            Get Started
          </Link>
        </motion.div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-orange-50 transition-colors"
        >
          {isOpen ? <X className="h-6 w-6 text-slate-700" /> : <Menu className="h-6 w-6 text-slate-700" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t border-orange-500/20 backdrop-blur-xl" style={{ background: 'rgba(255, 247, 237, 0.95)' }}
        >
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-slate-700 hover:text-orange-700 hover:bg-orange-500/10 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/editor"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 btn-gradient text-slate-900 rounded-lg font-semibold text-center"
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}




