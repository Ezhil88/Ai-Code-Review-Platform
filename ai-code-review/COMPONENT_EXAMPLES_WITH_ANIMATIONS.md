# 🎨 Complete Component Examples with Animations

## Modern Animated Components Ready to Use

---

## 1️⃣ ANIMATED HERO SECTION

```jsx
// Hero.jsx with all animations applied
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="gradient-bg min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 float" />
        <div className="absolute -top-20 right-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 float-slow" />
        <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 float-card" />
      </div>

      {/* Content Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="badge-glow mb-6 inline-block"
        >
          ✨ Powered by AI
        </motion.div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
          AI Code Review &{' '}
          <span className="gradient-text">Bug Detection</span>
        </h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Automatically detect bugs, security vulnerabilities, and code quality
          issues in real-time. Get AI-powered suggestions to improve performance
          and follow best practices.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
        >
          <button className="btn-primary-glow px-8 py-3 sm:px-10 sm:py-4">
            Start Analyzing
          </button>
          <button className="btn-secondary-glow px-8 py-3 sm:px-10 sm:py-4">
            View Documentation
          </button>
        </motion.div>

        {/* Floating Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { label: 'Analysis', value: '50K+' },
            { label: 'Bugs Detected', value: '100K+' },
            { label: 'Active Users', value: '5K+' },
          ].map((stat, i) => (
            <div key={i} className="hover-lift">
              <div className="gradient-text text-2xl sm:text-3xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
```

---

## 2️⃣ ANIMATED FEATURE CARDS SECTION

```jsx
// Features.jsx with floating cards
import { Code, Zap, CheckCircle2, BarChart3 } from 'lucide-react';

export default function Features() {
  const features = [
    {
      id: 1,
      title: 'Code Analysis',
      description: 'Deep analysis of code to detect bugs and vulnerabilities.',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      delay: 0,
    },
    {
      id: 2,
      title: 'Performance Optimization',
      description: 'Get AI suggestions to improve code performance.',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      delay: 0.1,
    },
    {
      id: 3,
      title: 'Best Practices',
      description: 'Automatically enforce coding standards.',
      icon: CheckCircle2,
      color: 'from-green-500 to-emerald-500',
      delay: 0.2,
    },
    {
      id: 4,
      title: 'Quality Metrics',
      description: 'Track code quality with detailed analytics.',
      icon: BarChart3,
      color: 'from-orange-500 to-red-500',
      delay: 0.3,
    },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 animate-section">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="heading-gradient text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Powerful Features for{' '}
            <span className="block mt-2">Code Excellence</span>
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Everything you need to write better, safer, and more efficient code.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="feature-card-float group relative h-full"
                style={{ animationDelay: `${feature.delay * 0.2}s` }}
              >
                {/* Glassmorphism Card */}
                <div className="relative h-full p-6 sm:p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all duration-300 overflow-hidden">
                  {/* Glow effect on hover */}
                  <div
                    className={`absolute -inset-32 bg-gradient-to-r ${feature.color} rounded-full filter blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}
                  />

                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${feature.color} p-0.5 mb-4 sm:mb-6 transition-transform duration-500 group-hover:rotate-360`}
                  >
                    <div className="w-full h-full flex items-center justify-center rounded-lg bg-slate-900">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Bottom accent bar */}
                  <div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.color} w-0 group-hover:w-full transition-all duration-300`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

---

## 3️⃣ ANIMATED HOW IT WORKS SECTION

```jsx
// HowItWorks.jsx with step animations
import { Upload, Cpu, Lightbulb, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Upload Your Code',
      description: 'Paste or upload your code files. We support JS, Python, Java, TypeScript, and more.',
      icon: Upload,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      number: '02',
      title: 'AI Analyzes',
      description: 'Our advanced AI engine analyzes your code for bugs, vulnerabilities, and quality issues.',
      icon: Cpu,
      color: 'from-purple-500 to-pink-500',
    },
    {
      number: '03',
      title: 'Get Suggestions',
      description: 'Receive detailed reports, bug detection, and improvement suggestions with explanations.',
      icon: Lightbulb,
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 animate-section">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="heading-gradient text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Three simple steps to analyze and improve your code.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {/* Connecting Lines (hidden on mobile) */}
            <div className="hidden md:block absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 opacity-20" />

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative text-center animate-slide-up"
                >
                  {/* Number Circle */}
                  <div className="inline-block mb-6 relative">
                    {/* Background glow */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity`}
                    />

                    {/* Number circle */}
                    <div
                      className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br ${step.color} p-1`}
                    >
                      <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                        <span className="text-2xl sm:text-3xl font-bold text-white">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="absolute -bottom-2 -right-2 bg-slate-900 p-3 rounded-full border-2 border-slate-800">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Arrow indicator for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:flex absolute -right-6 top-32 text-purple-400 animate-bounce">
                      <ArrowRight size={24} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 sm:mt-20"
        >
          <p className="text-slate-300 mb-6 text-lg">
            Ready to improve your code quality?
          </p>
          <button className="btn-primary-glow px-8 py-3 sm:px-10 sm:py-4">
            Get Started Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}
```

---

## 4️⃣ ANIMATED DASHBOARD PREVIEW

```jsx
// DashboardPreview.jsx with code animations
export default function DashboardPreview() {
  const codeLines = [
    'function analyzeCode(code) {',
    '  const issues = detectIssues(code);',
    '  const metrics = {',
    '    complexity: calculate(),',
    '    score: calculateQualityScore()',
    '  };',
    '  return formatResults(issues, metrics);',
    '}',
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 animate-section">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="heading-gradient text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            See It In Action
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            A glimpse into the powerful code analysis interface.
          </p>
        </div>

        {/* Dashboard Preview Card */}
        <div className="feature-card-float p-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl">
          <div className="relative bg-slate-950 rounded-2xl overflow-hidden">
            {/* Card Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 pointer-events-none" />

            <div className="relative bg-slate-900/95 backdrop-blur-xl">
              {/* Header */}
              <div className="bg-slate-800/50 border-b border-slate-700/50 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-400 ml-2">
                    code-analyzer.js
                  </span>
                </div>
              </div>

              {/* Code Editor Area */}
              <div className="md:grid md:grid-cols-2 grid-cols-1">
                {/* Code Section */}
                <div className="relative border-r border-slate-700/50 p-4 sm:p-6">
                  <div className="space-y-2 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {codeLines.map((line, i) => (
                      <div
                        key={i}
                        className="flex gap-4 animate-slide-up opacity-0"
                        style={{
                          animation: `slideUp 0.5s ease-out ${i * 0.08}s forwards`,
                        }}
                      >
                        <span className="text-slate-600 w-6 text-right select-none">
                          {i + 1}
                        </span>
                        <code className="flex-1 text-slate-300">{line}</code>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results Section */}
                <div className="p-4 sm:p-6 border-t md:border-t-0 border-slate-700/50">
                  <div className="space-y-4">
                    {/* Quality Score */}
                    <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-300">
                          Code Quality
                        </span>
                        <span className="gradient-text text-xs font-bold">
                          85%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 scale-pulse"
                          style={{ width: '85%' }}
                        />
                      </div>
                    </div>

                    {/* Issues Found */}
                    <div
                      className="space-y-2 pt-4 border-t border-slate-700/50 animate-slide-up"
                      style={{ animationDelay: '0.5s' }}
                    >
                      <h4 className="text-sm font-semibold text-slate-300">
                        Issues Found:
                      </h4>
                      {[
                        { type: 'Security', count: 2, color: 'text-red-400' },
                        { type: 'Performance', count: 1, color: 'text-yellow-400' },
                        { type: 'Best Practice', count: 3, color: 'text-blue-400' },
                      ].map((issue, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between text-xs"
                        >
                          <span className="text-slate-400">{issue.type}</span>
                          <span className={`font-bold ${issue.color}`}>
                            {issue.count} found
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Features */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {[
            { label: 'Real-time Analysis', desc: 'Instant feedback' },
            { label: 'Multiple Languages', desc: 'JS, Python, Java+' },
            { label: 'Detailed Reports', desc: 'Export & Share' },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-4 sm:p-6 rounded-xl border border-slate-700/50 text-center hover-lift"
            >
              <div className="font-semibold text-white mb-1">
                {feature.label}
              </div>
              <div className="text-xs sm:text-sm text-slate-400">
                {feature.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 5️⃣ ANIMATED FOOTER

```jsx
// Footer.jsx with animations
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#' },
        { name: 'Pricing', href: '#' },
        { name: 'Security', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '#' },
        { name: 'API Reference', href: '#' },
        { name: 'Blog', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '#' },
        { name: 'Contact', href: '#' },
        { name: 'Privacy', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="relative border-t border-slate-700/50">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute -bottom-40 right-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      </div>

      <div className="relative z-10">
        {/* CTA Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center animate-section">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Start Analyzing Your Code Today
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of developers improving their code quality.
          </p>
          <button className="btn-primary-glow px-8 py-3 sm:px-10 sm:py-4">
            Get Started Free
          </button>
        </div>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

        {/* Main Footer */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1 animate-slide-up">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <span className="text-xl font-bold text-white">AI</span>
                </div>
                <div>
                  <div className="font-bold text-white">AI Code Review</div>
                  <div className="text-xs text-slate-400">v1.0.0</div>
                </div>
              </div>
              <p className="text-sm text-slate-400 mb-6">
                Powered by AI to help you write better code.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={i}
                      href={social.href}
                      className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover-lift"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Links */}
            {footerLinks.map((section, i) => (
              <div key={i} className="animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <h4 className="font-semibold text-white mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href={link.href}
                        className="text-sm text-slate-400 hover:text-purple-400 transition-colors hover-lift"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <span>© {currentYear} AI Code Review. Made with</span>
              <Heart size={16} className="text-red-500 fill-red-500 scale-pulse" />
              <span>for developers.</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-slate-200 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-slate-200 transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

## 🚀 How to Use These Components

1. **Copy the component code** from above
2. **Import required icons** from lucide-react
3. **Import motion** from framer-motion (if using Framer Motion)
4. **Apply animation classes** from CSS files
5. **Test in your browser** at http://localhost:5173

---

## ✨ Animation Classes Applied in Examples

| Component | Classes Used |
|-----------|---|
| Hero | `gradient-bg`, `badge-glow`, `animate-slide-up`, `gradient-text`, `btn-primary-glow`, `btn-secondary-glow`, `hover-lift` |
| Features | `animate-section`, `heading-gradient`, `feature-card-float`, `group-hover:*` |
| HowItWorks | `animate-section`, `heading-gradient`, `animate-slide-up`, `animate-bounce`, `btn-primary-glow` |
| Dashboard | `feature-card-float`, `gradient-text`, `scale-pulse`, `animate-slide-up`, `hover-lift` |
| Footer | `animate-section`, `animate-slide-up`, `hover-lift`, `scale-pulse` |

---

## 🎯 Next Steps

1. Copy the component you want to use
2. Adjust colors, text, and spacing to match your brand
3. Test animations on mobile devices
4. Customize animation timing as needed
5. Deploy to production!

Ready to implement? Start with **Hero.jsx** and build from there! 🚀
