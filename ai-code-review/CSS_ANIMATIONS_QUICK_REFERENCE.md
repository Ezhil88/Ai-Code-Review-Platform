# 🎨 CSS Animations - Quick Reference Card

## Animation Classes Cheat Sheet

### FADE IN ANIMATIONS
| Class | Duration | Use Case |
|-------|----------|----------|
| `animate-fade-in` | 0.5s | Default fade in effect |
| `animate-fade-in-slow` | 1s | Slower, elegant appearance |
| `animate-fade-in-fast` | 0.3s | Quick, snappy appearance |

### SLIDE UP ANIMATIONS  
| Class | Duration | Use Case |
|-------|----------|----------|
| `animate-slide-up` | 0.5s | Default slide-up effect |
| `animate-slide-up-slow` | 0.8s | Slower entrance animation |
| `animate-slide-up-fast` | 0.3s | Quick slide-up |

### BACKGROUND ANIMATIONS
| Class | Effect | Use Case |
|-------|--------|----------|
| `gradient-bg` | Shifting gradient | Hero section background |
| `gradient-bg-slow` | Slow gradient shift | Subtle background effect |

### FLOATING ANIMATIONS
| Class | Duration | Distance | Use Case |
|-------|----------|----------|----------|
| `float-card` | 4s | ±15px | Feature cards |
| `float-card-slow` | 5s | ±15px | Slower float effect |
| `float-card-fast` | 3s | ±15px | Faster float effect |
| `float-slight` | 3s | ±8px | Subtle float |

### TEXT ANIMATIONS
| Class | Duration | Use Case |
|-------|----------|----------|
| `gradient-text` | 8s | Animated gradient text |
| `gradient-text-fast` | 4s | Fast gradient text |
| `heading-gradient` | 8s + glow | Main headings |
| `text-gradient` | 6s | General gradient text |
| `text-shimmer` | 3s | Shimmering effect |

### BUTTON ANIMATIONS
| Class | Gradient | Glow | Use Case |
|-------|----------|------|----------|
| `btn-primary-glow` | Blue→Purple | Yes | Primary CTA |
| `btn-secondary-glow` | Pink→Red | Yes | Secondary CTA |
| `btn-glow` | Purple→Pink | Yes | General buttons |
| `glow-button` | Blue→Purple | Animated | Alternative primary |
| `glow-button-pink` | Pink→Red | Animated | Alternative secondary |

### CARD ANIMATIONS
| Class | Float | Hover Effect | Use Case |
|-------|-------|--------------|----------|
| `feature-card` | No | Lift +8px | Static cards |
| `feature-card-float` | Yes 4s | Stops float, lifts +15px | Dynamic cards |
| `card` | - | Basic lift | General cards |
| `card-float` | Yes | Enhanced lift | Premium cards |
| `dashboard-card` | No | Gradient shift + lift | Dashboard items |

### GLOW EFFECTS
| Class | Duration | Effect | Use Case |
|-------|----------|--------|----------|
| `glow` | 3s | Pulsing blue glow | Element emphasis |
| `badge-glow` | 4s | Box glow effect | Badge styling |

### SPECIAL ANIMATIONS
| Class | Type | Duration | Use Case |
|-------|------|----------|----------|
| `pulse` | Opacity pulse | 2s | Loading states |
| `pulse-fast` | Fast opacity | 1s | Alert states |
| `bounce` | Vertical bounce | 1s | Attention-grabbing |
| `bounce-slow` | Slow bounce | 2s | Gentle bounce |
| `scale-pulse` | Scale pulse | 2s | Icon emphasis |
| `loading-spinner` | 360° rotation | 1s | Loading indicator |
| `icon-bounce` | Vertical bounce | 1s | Icon animation |
| `icon-rotate` | 360° rotation | 2s | Rotating icon |
| `icon-pulse` | Scale pulse | 2s | Pulsing icon |

---

## 🎯 Quick Copy-Paste Examples

### Hero Section
```jsx
<section className="gradient-bg min-h-screen flex items-center justify-center">
  <div className="animate-fade-in">
    <h1 className="gradient-text text-5xl font-bold">
      AI Code Review
    </h1>
    <button className="btn-primary-glow mt-6">Start Now</button>
  </div>
</section>
```

### Feature Cards
```jsx
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  {features.map((f, i) => (
    <div key={i} className="feature-card-float p-6 rounded-lg">
      <h3 className="heading-gradient text-xl font-bold">{f.title}</h3>
      <p className="text-slate-300">{f.description}</p>
    </div>
  ))}
</div>
```

### Buttons
```jsx
<button className="btn-primary-glow">Primary Action</button>
<button className="btn-secondary-glow">Secondary Action</button>
```

### Text with Gradient
```jsx
<h1 className="text-white text-4xl font-bold">
  AI Code <span className="gradient-text">Review</span>
</h1>
```

### Animated Section
```jsx
<section className="animate-section py-20">
  <div className="animate-slide-up">
    <h2 className="heading-gradient text-4xl font-bold">Section Title</h2>
  </div>
</section>
```

### Loading State
```jsx
<div className="loading-spinner text-4xl">⚙️</div>
```

### Badge
```jsx
<div className="badge-glow inline-block">
  ✨ Powered by AI
</div>
```

---

## 🎬 Animation Timing Guide

```
Fast:    0.3s  → Use for: hover effects, quick feedback
Normal:  0.5s  → Use for: standard animations
Slow:    0.8s  → Use for: entrances, emphasis
Very Slow: 1s+ → Use for: background effects, floating
Infinite: ∞    → Use for: floating, pulsing, loading
```

---

## 🔧 Position Guides

### Where to Use Each Animation

**Hero Section:**
- Background: `gradient-bg`
- Heading: `animate-fade-in` + `gradient-text`
- Button: `btn-primary-glow`
- Subtitle: `animate-fade-in-slow`

**Features Section:**
- Section: `animate-section`
- Title: `heading-gradient`
- Cards: `feature-card-float`
- All together: `animate-slide-up-slow` with stagger delay

**Services Section:**
- Cards: `card-float`
- On hover: automatic lift effect
- Icons: `icon-bounce` or `icon-rotate`

**Testimonials:**
- Cards: `float-card`
- Text: `text-gradient`
- Ratings: `pulse` for emphasis

**CTA Section:**
- Button: `btn-primary-glow` or `btn-secondary-glow`
- Background: `gradient-bg-slow`
- Text: `gradient-text-fast`

**Navigation:**
- Links: standard (hover effect built-in)
- Button: `btn-glow`

---

## 📱 Responsive Considerations

All animations automatically adjust on mobile:
- `float-card`: 4s → 3.5s on mobile
- `feature-card:hover`: translateY(-8px) → translateY(-4px) on mobile  
- `gradient-bg`: slower animation for smooth performance
- Button hover: scale(1.05) → scale(1.02) on mobile

---

## ✨ Pro Tips

1. **Stagger Animation for Multiple Elements:**
```jsx
{items.map((item, i) => (
  <div key={i} style={{ animationDelay: `${i * 0.1}s` }}>
    {/* Content */}
  </div>
))}
```

2. **Combine Multiple Classes:**
```jsx
<div className="float-card animate-fade-in">Content</div>
```

3. **Use for Attention:**
```jsx
<div className="scale-pulse text-3xl">⭐</div>
```

4. **Loading States:**
```jsx
{isLoading && <div className="loading-spinner">Loading...</div>}
```

5. **Card Elevation on Hover:**
The `.feature-card:hover` automatically lifts the card 8-10px

---

## 🎨 Color Customization

All gradients use these base colors:
- Blue: `#3b82f6` / `#6366f1`
- Purple: `#a855f7` / `#8b5cf6`
- Pink: `#ec4899` / `#f5576c`
- Green: `#10b981` / `#06b6d4`

Modify gradient colors in CSS:
```css
.gradient-text {
  background: linear-gradient(90deg, #YOUR_COLOR_1, #YOUR_COLOR_2);
}
```

---

## 🚀 Performance Tips

✅ Hardware Accelerated:
- `transform: translateY()`
- `opacity`
- `translate()`, `scale()`, `rotate()`

❌ Avoid (cause repaints):
- `width`, `height`, `top`, `left`
- `background-color` (use opacity instead)
- `border-width`

---

## 📊 Keyframe Reference

| Keyframe | Animation Type | Duration | Use Case |
|----------|---|----------|----------|
| `fadeIn` | Opacity from 0→1 | 0.5s | Element appearance |
| `slideUp` | TranslateY + opacity | 0.5s | Entrance animation |
| `gradientShift` | Background position | 15-20s | Background |
| `float` | TranslateY oscillation | 4-5s | Floating cards |
| `glow` | Box-shadow pulse | 3s | Glowing effects |
| `gradientText` | Background position | 6-8s | Text animation |
| `pulse` | Opacity pulse | 2s | Loading/emphasis |
| `bounce` | TranslateY bounce | 1s | Attention |
| `rotate` | Transform rotate | 1-2s | Spinning |
| `scalePulse` | Scale pulse | 2s | Growth animation |

---

## 🎯 Class Usage Summary

```
// Background Effects
.gradient-bg, .gradient-bg-slow

// Text Effects  
.gradient-text, .gradient-text-fast, .text-gradient, .text-shimmer
.heading-gradient, .heading-fade

// Element Movement
.float-card, .float-card-slow, .float-card-fast, .float-slight
.float-container, .bounce, .bounce-slow

// Appearance
.animate-fade-in, .animate-fade-in-slow, .animate-fade-in-fast
.animate-slide-up, .animate-slide-up-slow, .animate-slide-up-fast

// Interactive Elements
.btn-primary-glow, .btn-secondary-glow, .btn-glow
.glow-button, .glow-button-pink, .glow

// Cards
.card, .card-float, .feature-card, .feature-card-float
.dashboard-card, .hover-lift

// Emphasis
.pulse, .pulse-fast, .scale-pulse
.icon-bounce, .icon-rotate, .icon-pulse

// Sections
.animate-section, .animate-section-delayed
.slide-up-container, .fade-in-container
```

---

## 🔗 Files Modified

✅ **src/index.css** - Core animations & keyframes
✅ **src/App.css** - Component-specific styling

No external dependencies needed!

---

**Ready to use? Copy any class above into your JSX components!** 🚀
