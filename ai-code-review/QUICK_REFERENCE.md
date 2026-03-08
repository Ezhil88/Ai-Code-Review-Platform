# 🚀 Quick Start - Developer Reference Guide

## ⚡ 60-Second Setup

```bash
# Terminal 1: Backend
cd backend
npm install
node server.js
# ✅ Server running on http://localhost:5000

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
# ✅ Open http://localhost:5173
```

## 📁 File Structure Cheat Sheet

```
ai-code-review/
├── 📖 README.md                 # Main documentation
├── 📖 SETUP_GUIDE.md            # Detailed setup steps
├── 📖 DOCUMENTATION.md          # Full technical docs
├── 📖 QUICK_REFERENCE.md        # This file
├── 🧪 SAMPLE_CODE.js            # Test code samples
│
├── 🔧 backend/
│   ├── server.js                # Express server setup
│   ├── analyzer.js              # Code analysis logic
│   ├── package.json             # Dependencies
│   └── .gitignore
│
└── 🎨 frontend/
    ├── src/
    │   ├── components/          # Reusable UI components
    │   │   ├── Navbar.jsx
    │   │   ├── CodeEditor.jsx
    │   │   ├── ResultPanel.jsx
    │   │   ├── QualityScoreDisplay.jsx
    │   │   ├── IssuesList.jsx
    │   │   └── Suggestions.jsx
    │   ├── pages/               # Route pages
    │   │   ├── Home.jsx
    │   │   ├── Editor.jsx
    │   │   └── Dashboard.jsx
    │   ├── App.jsx              # Main app component
    │   ├── App.css              # App styles
    │   ├── main.jsx             # Entry point
    │   └── index.css            # Global styles
    ├── index.html               # HTML template
    ├── tailwind.config.js        # Tailwind configuration
    ├── postcss.config.js         # PostCSS configuration
    ├── vite.config.js            # Vite configuration
    └── package.json              # Dependencies
```

## 🔨 Common Commands

### Backend

```bash
# Start server
node server.js

# With auto-reload (after: npm install -D nodemon)
npx nodemon server.js

# Install dependencies
npm install

# Check if running
curl http://localhost:5000/health
```

### Frontend

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview

# Lint code
npm run lint

# Install dependencies
npm install
```

## 🌐 URLs Reference

| Purpose | URL |
|---------|-----|
| Frontend App | http://localhost:5173 |
| Home Page | http://localhost:5173/ |
| Editor Page | http://localhost:5173/editor |
| Dashboard | http://localhost:5173/dashboard |
| Backend Server | http://localhost:5000 |
| Health Check | http://localhost:5000/health |
| Analyze API | http://localhost:5000/analyze |

## 📤 API Quick Reference

### Analyze Code

```bash
# Using curl
curl -X POST http://localhost:5000/analyze \
  -H "Content-Type: application/json" \
  -d '{"code":"var x = 10;"}'

# Response
{
  "code_quality_score": 80,
  "issues": ["❌ Using 'var'..."],
  "suggestions": ["✓ Use let/const..."]
}
```

### Health Check

```bash
curl http://localhost:5000/health
# Response: {"status":"Server is running"}
```

## 🧪 Testing Code Samples

### Sample 1: Simple Issues
```javascript
var x = 10;
console.log(x);
```

### Sample 2: Complex Issues
```javascript
var data = [];
var unused = true;

for(let i = 0; i < 10; i++) {
  for(let j = 0; j < 10; j++) {
    data.push(i + j);
  }
}

console.log("Done");
```

### Sample 3: Good Code
```javascript
const MAX_ITEMS = 100;

function processItems(items) {
  return items
    .filter(item => item.active)
    .map(item => item.value);
}
```

## 🔧 Configuration Files

### `tailwind.config.js` - Customize colors
```javascript
theme: {
  extend: {
    colors: {
      primary: '#6366f1',
      secondary: '#ec4899',
    }
  }
}
```

### `vite.config.js` - Bundler settings
```javascript
export default {
  plugins: [react()],
  // Add your config here
}
```

## 📊 Code Analysis Checks

| Check | Penalty | Symbol |
|-------|---------|--------|
| var usage | -10 | ❌ |
| Unused variables | -5 | ⚠️ |
| Nested loops | -8 | ⚠️ |
| Long functions | -12 | ❌ |
| High complexity | -6 | ⚠️ |
| console.log | -3 | ⚠️ |
| No error handling | -5 | ⚠️ |
| Magic numbers | -4 | ⚠️ |

## 🎯 Quality Score Scale

```
Score: 80-100  🟢 Excellent - Ready for production
Score: 60-79   🟡 Good - Minor improvements needed
Score: 40-59   🟠 Fair - Several issues to fix
Score: 0-39    🔴 Critical - Significant refactoring needed
```

## 🐛 Debugging Tips

### Check Backend Logs
```bash
# Terminal running backend
node server.js
# Look for errors in output
```

### Check Frontend Logs
```bash
# Browser Console (F12 → Console tab)
# Look for errors and warnings
```

### Check Network Requests
```bash
# Browser DevTools (F12 → Network tab)
# Monitor POST requests to /analyze
```

### Test API Directly
```bash
# Use Postman or curl to test API
curl -X POST http://localhost:5000/analyze \
  -H "Content-Type: application/json" \
  -d '{"code":"test code"}'
```

## 📦 Install Dependencies

```bash
# Backend (in backend/ folder)
npm install express cors

# Frontend (in frontend/ folder)
npm install
```

## 🚀 Production Checklist

- [ ] Environment variables configured
- [ ] Error handling in place
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Database connection (optional)
- [ ] SSL/HTTPS enabled
- [ ] Security headers added
- [ ] Logging configured
- [ ] Backup strategy defined
- [ ] Monitoring setup

## 💾 Data Storage

### Frontend (Browser)
```javascript
// localStorage stores analysis history
localStorage.getItem('analyses')
localStorage.setItem('analyses', data)
localStorage.removeItem('analyses')
```

### Backend
```javascript
// Currently no database
// Add MongoDB/PostgreSQL for persistence
```

## 🎨 UI Customization

### Change Primary Color
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#YOUR_COLOR_HEX',
}
```

### Change Font
Edit `index.css`:
```css
body {
  font-family: 'Your Font', sans-serif;
}
```

### Change Theme
The app uses dark theme by default in `index.html`:
```html
<body class="dark">
```

## 🔐 Security Notes

- ✅ Code analyzed server-side (not exposed)
- ✅ CORS enabled for development
- ⚠️ Add authentication for production
- ⚠️ Use HTTPS in production
- ⚠️ Implement rate limiting
- ⚠️ Validate all inputs

## 📚 Learning Path

1. **Day 1**: Setup and run the application
2. **Day 2**: Understand component structure
3. **Day 3**: Modify analyzer rules
4. **Day 4**: Add new features
5. **Day 5**: Deploy to production

## 🆘 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Port in use | Kill process: `taskkill /F /PID <id>` |
| Module not found | `npm install` |
| CORS error | Check backend CORS settings |
| Monaco won't load | Clear cache, hard refresh |
| Analysis fails | Check backend logs |

## 📞 Support Resources

- 📖 README.md - Overview
- 📖 SETUP_GUIDE.md - Installation steps
- 📖 DOCUMENTATION.md - Complete docs
- 🧪 SAMPLE_CODE.js - Test code
- 💬 GitHub Issues - Community support

## 🎓 Learning Resources

- [React Hooks](https://react.dev/reference/react/hooks)
- [Express.js](https://expressjs.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)

---

**Pro Tip**: Bookmark this file for quick reference! 🚀
