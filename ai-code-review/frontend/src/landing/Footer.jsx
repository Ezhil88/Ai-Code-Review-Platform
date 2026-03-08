import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

export default function Footer() {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Product',
      links: ['Features', 'Security', 'Roadmap', 'Pricing'],
    },
    {
      title: 'Resources',
      links: ['Documentation', 'API Reference', 'Blog', 'Community'],
    },
    {
      title: 'Company',
      links: ['About', 'Contact', 'Privacy', 'Terms'],
    },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub' },
    { icon: Twitter, label: 'Twitter' },
    { icon: Linkedin, label: 'LinkedIn' },
    { icon: Mail, label: 'Email' },
  ];

  return (
    <footer className="border-t" style={{
      background: isDark ? 'var(--bg-primary)' : '#ffffff',
      borderColor: isDark ? 'rgba(96, 165, 250, 0.2)' : 'rgba(251, 146, 60, 0.2)',
      color: 'var(--text-primary)'
    }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Start Analyzing Your Code Today</h2>
        <p className="mb-8 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          Join developers using AI insights to improve quality, security, and performance.
        </p>
        <Link to="/editor" className="button-gradient inline-flex items-center px-8 py-3 font-semibold" style={{ color: isDark ? '#ffffff' : '#1f2937' }}>
          Get Started Free
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t" style={{
        borderColor: isDark ? 'rgba(96, 165, 250, 0.2)' : 'rgba(251, 146, 60, 0.2)'
      }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-orange-500/15 border border-orange-400/35">
                <Code2 className="w-5 h-5 text-orange-300" />
              </div>
              <div>
                <div className="font-bold text-slate-900">CodeReview</div>
                <div className="text-xs text-slate-500">v1.0.0</div>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              A clean AI dashboard for code analysis, bug detection, and execution feedback.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.button
                    key={social.label}
                    whileHover={{ scale: 1.08 }}
                    className="w-9 h-9 rounded-lg border border-orange-200 bg-orange-50 text-slate-600 hover:text-orange-700 hover:border-orange-400/35"
                    aria-label={social.label}
                  >
                    <Icon size={16} className="mx-auto" />
                  </motion.button>
                );
              })}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-slate-800 mb-3">{section.title}</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                {section.links.map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-orange-700 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-orange-500/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <span>Â© {currentYear} AI Code Review. Made with</span>
            <Heart size={14} className="text-orange-500 fill-orange-500" />
            <span>for developers.</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-orange-700">Privacy</a>
            <a href="#" className="hover:text-orange-700">Terms</a>
            <a href="#" className="hover:text-orange-700">Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
}



