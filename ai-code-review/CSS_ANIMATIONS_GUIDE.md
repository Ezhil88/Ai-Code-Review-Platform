# 🎨 CSS Animations Guide - AI Code Review Platform

## Complete Animation Classes Reference

### ✨ Installation & Setup

The animations are now built into your project's CSS files:
- **index.css** - Core animation keyframes and utility classes
- **App.css** - Component-specific animations

No additional dependencies needed! All animations use pure CSS with Framer Motion for fade-in effects.

---

## 📚 Animation Classes Available

### 1. FADE & SLIDE ANIMATIONS

#### Fade In
```html
<!-- Fade in with default timing (0.5s) -->
<div className="animate-fade-in">Content</div>

<!-- Fade in slowly (1s) -->
<div className="animate-fade-in-slow">Content</div>

<!-- Fade in fast (0.3s) -->
<div className="animate-fade-in-fast">Content</div>
```

#### Slide Up
```html
<!-- Slide up with default timing (0.5s) -->
<div className="animate-slide-up">Content</div>

<!-- Slide up slowly (0.8s) -->
<div className="animate-slide-up-slow">Content</div>

<!-- Slide up fast (0.3s) -->
<div className="animate-slide-up-fast">Content</div>
```

---

### 2. GRADIENT BACKGROUNDS

#### Animated Gradient Background
```html
<!-- Shifting gradient background -->
<div className="gradient-bg">Background shifts colors</div>

<!-- Slower gradient animation -->
<div className="gradient-bg-slow">Slower color shifting</div>
```

**Usage in Hero Section:**
```jsx
export default function Hero() {
  return (
    <section className="gradient-bg min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="heading-gradient text-5xl font-bold">
          AI Code Review
        </h1>
      </div>
    </section>
  );
}
```

---

### 3. FLOATING ANIMATIONS

#### Float Cards
```html
<!-- Card with floating animation -->
<div className="float-card bg-slate-900 p-8 rounded-lg">
  <h3>Feature Card</h3>
  <p>This card floats up and down</p>
</div>

<!-- Slower floating -->
<div className="float-card-slow">Content</div>

<!-- Faster floating -->
<div className="float-card-fast">Content</div>

<!-- Subtle float -->
<div className="float-slight">Content</div>
```

**Usage Example:**
```jsx
export default function Features() {
  const features = [
    { title: 'Code Analysis', icon: '💻' },
    { title: 'Performance', icon: '⚡' },
    // ...
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, i) => (
        <div key={i} className="float-card float-slight">
          <div className="card p-6 rounded-lg hover:shadow-lg transition">
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h3 className="heading-gradient text-xl font-bold">
              {feature.title}
            </h3>
            <p className="text-slate-400 mt-2">
              Description of the feature
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

### 4. GLOWING BUTTONS

#### Button with Glow Effect
```html
<!-- Primary glow button -->
<button className="btn-primary-glow">
  Start Analysis
</button>

<!-- Secondary glow button -->
<button className="btn-secondary-glow">
  View Documentation
</button>

<!-- Standard glow button -->
<button className="btn-glow">
  Click Me
</button>
```

**Usage in Navigation:**
```jsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur">
      <div className="flex items-center justify-between p-4">
        <h1>AI Code Review</h1>
        
        <Link to="/editor" className="btn-primary-glow">
          Start Analysis
        </Link>
      </div>
    </nav>
  );
}
```

---

### 5. GRADIENT TEXT

#### Animated Gradient Text
```html
<!-- Animated gradient text (slow) -->
<h1 className="gradient-text text-5xl font-bold">
  AI Code Review & Bug Detection
</h1>

<!-- Faster gradient animation -->
<h2 className="gradient-text-fast text-3xl font-bold">
  Improve Your Code
</h2>
```

**Better Usage with span for partial gradient:**
```jsx
export default function Hero() {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold text-white mb-4">
        AI Code Review &{' '}
        <span className="gradient-text">Bug Detection</span>
      </h1>
      <p className="text-xl text-slate-300">
        Automatically detect bugs and improve code quality
      </p>
    </div>
  );
}
```

---

### 6. CARD HOVER EFFECTS

#### Feature Cards with Hover
```html
<!-- Card with hover lift effect -->
<div className="feature-card">
  <h3>Card Title</h3>
  <p>Card description</p>
</div>

<!-- Floating card that stops floating on hover -->
<div className="feature-card-float">
  <h3>Floating Card</h3>
  <p>Hovers up higher when you interact</p>
</div>

<!-- Standard card -->
<div className="card hover-lift">
  <h3>Hoverable Card</h3>
</div>
```

**Complete Feature Card Example:**
```jsx
export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="feature-card-float p-6 rounded-2xl bg-slate-900/50 border border-slate-700">
      <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
        <Icon className="w-7 h-7 text-white" />
      </div>
      
      <h3 className="text-lg font-bold text-white mb-2">
        {title}
      </h3>
      
      <p className="text-slate-300">
        {description}
      </p>
    </div>
  );
}
```

**Usage:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {features.map((feature) => (
    <FeatureCard
      key={feature.id}
      icon={feature.icon}
      title={feature.title}
      description={feature.description}
    />
  ))}
</div>
```

---

### 7. OTHER ANIMATIONS

#### Pulse Animation
```html
<!-- Pulsing element -->
<div className="pulse">Pulsing element</div>

<!-- Faster pulse -->
<div className="pulse-fast">Fast pulsing</div>
```

#### Bounce Animation
```html
<!-- Bouncing element -->
<div className="bounce">Bouncing</div>

<!-- Slower bounce -->
<div className="bounce-slow">Slow bounce</div>
```

#### Scale Pulse
```html
<!-- Scale up and down -->
<div className="scale-pulse">Scale pulsing</div>
```

#### Glow Effect
```html
<!-- Continuous glow -->
<div className="glow p-6 rounded-lg">Glowing element</div>

<!-- Glow with button -->
<button className="glow-button">Glow Button</button>
<button className="glow-button-pink">Pink Glow Button</button>
```

---

## 🎬 Complete Component Examples

### Hero Section with All Animations
```jsx
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="gradient-bg min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 float" />
        <div className="absolute -top-20 right-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 float-slow" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-4 text-center animate-fade-in-slow"
      >
        {/* Badge */}
        <motion.div className="badge-glow mb-6 inline-block">
          ✨ Powered by AI
        </motion.div>

        {/* Main Heading with Gradient Text */}
        <motion.h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          AI Code Review &{' '}
          <span className="gradient-text">Bug Detection</span>
        </motion.h1>

        {/* Description */}
        <motion.p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
          Automatically detect bugs, security vulnerabilities, and code quality
          issues in real-time. Get AI-powered suggestions to improve performance
          and follow best practices.
        </motion.p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-primary-glow">
            Start Analyzing
          </button>
          <button className="btn-secondary-glow">
            View Documentation
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8">
          <div className="animate-slide-up-slow">
            <div className="gradient-text text-3xl font-bold">50K+</div>
            <div className="text-slate-400 text-sm">Analysis Requests</div>
          </div>
          <div className="animate-slide-up-slow" style={{ animationDelay: '0.1s' }}>
            <div className="gradient-text text-3xl font-bold">100K+</div>
            <div className="text-slate-400 text-sm">Bugs Detected</div>
          </div>
          <div className="animate-slide-up-slow" style={{ animationDelay: '0.2s' }}>
            <div className="gradient-text text-3xl font-bold">5K+</div>
            <div className="text-slate-400 text-sm">Users Active</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
```

### Features Section
```jsx
export default function Features() {
  const features = [
    {
      id: 1,
      title: 'Code Analysis',
      description: 'Deep analysis to detect bugs and vulnerabilities',
      icon: '💻',
    },
    {
      id: 2,
      title: 'Performance Optimization',
      description: 'AI suggestions to improve performance',
      icon: '⚡',
    },
    {
      id: 3,
      title: 'Best Practices',
      description: 'Enforce coding standards automatically',
      icon: '✓',
    },
    {
      id: 4,
      title: 'Quality Metrics',
      description: 'Track code quality with detailed analytics',
      icon: '📊',
    },
  ];

  return (
    <section className="py-20 px-4 animate-section">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="heading-gradient text-4xl md:text-5xl font-bold mb-4">
            Powerful Features
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Everything you need for code excellence
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.id}
              className="feature-card-float p-6 rounded-2xl bg-slate-900/50 border border-slate-700 backdrop-blur"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Dashboard Preview
```jsx
export default function DashboardPreview() {
  return (
    <section className="py-20 px-4 animate-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-gradient text-4xl md:text-5xl font-bold mb-4">
            See It In Action
          </h2>
        </div>

        {/* Preview Card with animations */}
        <div className="feature-card-float p-1 bg-gradient-to-r from-blue-500 to-pink-500 rounded-2xl">
          <div className="bg-slate-950 rounded-2xl p-6 md:p-8">
            <div className="md:grid md:grid-cols-2 gap-6">
              {/* Code Section */}
              <div className="mb-6 md:mb-0">
                <div className="font-mono text-sm text-slate-300 space-y-2">
                  {[
                    'function analyzeCode(code) {',
                    '  const issues = detectIssues(code);',
                    '  const score = calculateQuality();',
                    '  return { issues, score };',
                    '}',
                  ].map((line, i) => (
                    <div key={i} className="animate-slide-up opacity-0" 
                         style={{ animation: `slideUp 0.5s ease-out ${i * 0.1}s forwards` }}>
                      <span className="text-slate-600">{i + 1}</span>{' '}
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results Section */}
              <div>
                <h3 className="text-white font-bold mb-4">Analysis Results</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Quality Score</span>
                    <span className="gradient-text font-bold">85%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 scale-pulse"
                      style={{ width: '85%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## 🎯 Quick Implementation Checklist

### For Hero Section
```jsx
<section className="gradient-bg min-h-screen flex items-center">
  <h1 className="animate-fade-in text-5xl font-bold">
    AI Code <span className="gradient-text">Review</span>
  </h1>
  <button className="btn-primary-glow">Start Now</button>
</section>
```

### For Feature Cards
```jsx
<div className="feature-card-float p-6 rounded-2xl">
  <h3 className="heading-gradient text-xl font-bold">Feature Title</h3>
  <p className="text-slate-300">Description</p>
</div>
```

### For CTAs
```jsx
<button className="btn-primary-glow">Primary CTA</button>
<button className="btn-secondary-glow">Secondary CTA</button>
```

### For Sections
```jsx
<section className="animate-section py-20">
  <div className="animate-slide-up">
    <h2 className="heading-gradient text-4xl font-bold">Section Title</h2>
  </div>
</section>
```

---

## 🚀 Performance Tips

✅ **Optimizations Included**:
- Hardware-accelerated transforms (`transform`, `opacity`)
- GPU-friendly keyframes
- Reduced motion respect (`prefers-reduced-motion`)
- Mobile-optimized animation timing
- No JavaScript-heavy libraries needed

✅ **Best Practices**:
1. Use `transform` and `opacity` for animations (GPU accelerated)
2. Avoid animating `width`, `height`, `left`, `top` (forces repaints)
3. Use `will-change` sparingly for complex animations
4. Test on mobile devices for performance

---

## 📱 Mobile Responsive Animations

All animations are automatically optimized for mobile:
- Reduced floating distance on small screens
- Faster animation timing on touch devices
- Respect for `prefers-reduced-motion` media query
- Touch-friendly interactive elements

---

## 🎨 Customization

### Change Animation Duration
```css
/* In index.css or App.css */
.float-card {
  animation: float 4s ease-in-out infinite;
  /* Change 4s to any duration you prefer */
}
```

### Change Gradient Colors
```css
.gradient-bg {
  background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c);
  /* Modify colors as needed */
}
```

### Add Staggered Animation Delay
```jsx
{features.map((feature, i) => (
  <div key={i} style={{ animationDelay: `${i * 0.1}s` }}>
    {/* Content */}
  </div>
))}
```

---

## 🎉 You're All Set!

Your React + Vite project now has:

✅ **20+ Animation Classes**
✅ **GPU-Accelerated Performance**
✅ **Mobile-Optimized**
✅ **Accessibility Support** (respects prefers-reduced-motion)
✅ **Modern SaaS Design**
✅ **Smooth Transitions**
✅ **Gradient Effects**
✅ **Glowing Buttons**
✅ **Floating Cards**
✅ **Animated Text**

Perfect for a modern AI SaaS landing page! 🚀
