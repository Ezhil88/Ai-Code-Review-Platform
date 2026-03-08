# 🚀 AI Code Review Platform - Setup & Running Guide

## System Requirements

- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher (or yarn)
- **OS**: Windows, macOS, or Linux
- **RAM**: 2GB minimum
- **Browser**: Chrome, Firefox, Safari, or Edge (latest versions)

## Pre-Installation Checklist

- [ ] Node.js installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Git installed (for cloning/version control)
- [ ] Port 5000 available (backend)
- [ ] Port 5173 available (frontend)

## Installation Steps

### Step 1: Navigate to Project Directory

```bash
cd c:\Users\ezhil\Desktop\ai-code-review\ai-code-review
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

Expected installation time: 2-3 minutes

**Installed Packages:**
- express
- cors
- body-parser

### Step 3: Start Backend Server

```bash
node server.js
```

**Expected Output:**
```
🚀 Server running on http://localhost:5000
📊 API available at http://localhost:5000/analyze
```

✅ **Backend is now running!**

### Step 4: Install Frontend Dependencies (in a new terminal)

```bash
cd frontend
npm install
```

Expected installation time: 3-5 minutes

**Installed Packages:**
- react
- react-dom
- react-router-dom
- @monaco-editor/react
- axios
- lucide-react
- tailwindcss
- postcss
- autoprefixer

### Step 5: Start Frontend Development Server

```bash
npm run dev
```

**Expected Output:**
```
VITE v8.0.0-beta.13 ready in XXX ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

✅ **Frontend is now running!**

## 🌍 Accessing the Application

Once both servers are running, open your browser and navigate to:

**http://localhost:5173**

You should see the home page with:
- Hero section
- Features grid
- How it works section
- Call-to-action buttons

## 📱 Application Pages

### 1. Home Page (`/`)
- Landing page with features
- Overview of the platform
- Call-to-action buttons

### 2. Code Editor Page (`/editor`)
- Monaco code editor
- File upload functionality
- Analysis button
- Real-time results display
- Download report button

### 3. Dashboard Page (`/dashboard`)
- Analysis history
- Quality score trends
- Common issues
- Statistics

## 🧪 Testing the Application

### Quick Test

1. Go to **Code Editor** page
2. Paste this sample code:

```javascript
var x = 10;
var y = 20;
var unused = 30;

function calculateSum() {
  let total = 0;
  for(let i = 0; i < 10; i++) {
    for(let j = 0; j < 10; j++) {
      total += i * j;
    }
  }
  console.log(total);
  console.log("Result");
  return total;
}

calculateSum();
```

3. Click **"Analyze Code"**
4. You should see:
   - Code quality score (around 65-70)
   - Issues detected:
     - Using 'var' instead of 'let'/'const'
     - Nested loops detected
     - Unused variable detected
   - Suggestions for improvement
5. Download the report

## ⚙️ API Testing

### Test the Backend API Directly

Using curl or Postman:

```bash
curl -X POST http://localhost:5000/analyze \
  -H "Content-Type: application/json" \
  -d '{"code":"var x = 10; console.log(x);"}'
```

**Expected Response:**
```json
{
  "code_quality_score": 75,
  "issues": ["❌ Using 'var' instead of 'let' or 'const'"],
  "suggestions": ["✓ Replace 'var' with 'let' or 'const'"]
}
```

## 🛠️ Development Commands

### Frontend

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Backend

Currently, the backend doesn't have npm scripts other than the default. You can add:

```bash
# Add this to backend/package.json to enable auto-reload
npm install --save-dev nodemon

# Then run:
npx nodemon server.js
```

Or continue using:
```bash
node server.js
```

## 🐛 Troubleshooting

### Issue: Port Already in Use

**Backend (Port 5000):**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual ID)
taskkill /PID <PID> /F
```

**Frontend (Port 5173):**
The frontend should automatically use a different port if 5173 is in use.

### Issue: Module Not Found

```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue: Backend Connection Error

1. Verify backend is running on port 5000
2. Check firewall settings
3. Ensure CORS is enabled

### Issue: Monaco Editor Not Loading

- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check browser console for errors

## 📊 Project Statistics

- **Total Lines of Code**: 1500+
- **React Components**: 7
- **Pages**: 3
- **API Endpoints**: 2 (analyze + health check)
- **Code Analysis Rules**: 8+
- **Supported Languages**: 6+ (JS, TS, Python, Java, C++, Go)

## 🎯 Next Steps After Installation

1. ✅ Verify both servers are running
2. ✅ Test the application with sample code
3. ✅ Explore all pages
4. ✅ Download a report
5. ✅ Check the dashboard

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Node.js Documentation](https://nodejs.org/docs)
- [Express.js Documentation](https://expressjs.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Monaco Editor Documentation](https://microsoft.github.io/monaco-editor/)

## 🆘 Getting Help

If you encounter issues:

1. Check error messages in console
2. Review the troubleshooting section
3. Check browser console (F12) for frontend errors
4. Check terminal output for backend errors
5. Verify all dependencies are installed

## 📝 Notes

- Data is stored in browser's localStorage (clears on cache clear)
- No database is used (can be added for persistence)
- All analysis happens server-side (more secure)
- Code is NOT stored on server (analyzed and discarded)

## 🎉 You're All Set!

Your AI Code Review Platform is ready to use!

**Happy Code Reviewing!** 🚀
