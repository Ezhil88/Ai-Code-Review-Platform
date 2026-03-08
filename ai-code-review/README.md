# 🚀 AI Code Review & Bug Detection Platform

A modern, full-stack web application that leverages AI to analyze code for bugs, code quality issues, and provides intelligent suggestions for improvements.

![Platform Features](https://img.shields.io/badge/Features-Code%20Analysis%20%7C%20Quality%20Score%20%7C%20Bug%20Detection-blue)
![Status](https://img.shields.io/badge/Status-Production%20Ready-green)

## ✨ Features

### 🎯 Core Features
- **🧠 AI Code Analysis** - Intelligent code analysis using advanced algorithms
- **📊 Quality Score** - Visual quality score with detailed breakdown
- **🐛 Bug Detection** - Identifies bugs and code issues automatically
- **💡 Smart Suggestions** - AI-powered improvement recommendations
- **📝 Monaco Editor** - Professional VS Code-like code editor with syntax highlighting
- **🎨 Dark Theme** - Modern dark UI optimized for developers
- **📱 Responsive Design** - Works seamlessly on all devices
- **📥 File Upload** - Upload code files for analysis
- **📊 Dashboard** - Track analysis history and progress
- **📱 Report Export** - Download analysis reports

### 🔍 Multi-Language Support
The platform now supports **10 programming languages** with automatic detection and language-specific analysis:

- 🐍 **Python** - Syntax, indentation, imports, security
- ⚡ **JavaScript** - ES6+ checks, async/await, XSS prevention
- 📘 **TypeScript** - Type safety, interfaces, generics
- ☕ **Java** - Classes, exceptions, naming conventions
- 🔧 **C** - Memory management, buffer overflow detection
- ⚙️ **C++** - STL usage, memory leaks, smart pointers
- 🎯 **C#** - Async patterns, properties, naming
- 🚀 **Go** - Error handling, goroutines, sync
- 🦀 **Rust** - Borrowing rules, unwrap safety, ownership
- 🐘 **PHP** - SQL injection, XSS, input validation

### 🔍 Code Analysis Checks (All Languages)
- ✅ **Syntax Validation** - Language-specific syntax errors
- ✅ **Security Issues** - XSS, SQL injection, buffer overflow, eval usage
- ✅ **Code Quality** - Complexity, nesting depth, code duplication
- ✅ **Best Practices** - Naming conventions, design patterns, idioms
- ✅ **Performance** - Memory leaks, inefficient patterns, bottlenecks
- ✅ **Error Handling** - Exception handling, error propagation
- ✅ **Type Safety** - Type errors, implicit conversions
- ✅ **Magic Numbers** - Hard-coded values without explanation

## 🏗️ Project Structure

```
ai-code-review/
│
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── CodeEditor.jsx
│   │   │   ├── ResultPanel.jsx
│   │   │   ├── QualityScoreDisplay.jsx
│   │   │   ├── IssuesList.jsx
│   │   │   └── Suggestions.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Editor.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── App.css
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── package.json
│
└── backend/                  # Node.js + Express backend
    ├── server.js             # Main server file
    ├── analyzer.js           # Code analysis module
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

#### 1. Clone and Setup
```bash
cd ai-code-review
```

#### 2. Backend Setup
```bash
cd backend
npm install
npm start    # Runs on http://localhost:5000
```

#### 3. Frontend Setup (in a new terminal)
```bash
cd frontend
npm install
npm run dev  # Runs on http://localhost:5173
```

### Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Endpoint**: POST http://localhost:5000/analyze

## 📖 Usage Guide

### 1. Analyzing Code (Multi-Language)
1. Navigate to the **Code Editor** page
2. Paste or upload your code (any of 10 supported languages)
3. Click **"Analyze Code"** button
4. View results with:
   - **Detected Language** - Automatically identified (Python, Java, Rust, etc.)
   - Code quality score (0-100)
   - Language-specific detected issues
   - Smart suggestions for improvement

### 2. Exploring Supported Languages
- Click **"Languages"** in the navigation bar
- See all 10 supported programming languages
- View language-specific analysis features
- Understand quality scoring system

### 3. Viewing History
- Go to the **Dashboard** page
- See all your analysis history
- Track quality score trends
- Filter by programming language

### 4. Exporting Reports
- Click **"Download Report"** button
- Get a text file with complete analysis including detected language

## 🔧 API Documentation

### Analyze Code Endpoint
```
POST /analyze
```

**Request:**
```json
{
  "code": "def hello():\n    return True"
}
```

**Response (Multi-Language):**
```json
{
  "language": "Python",
  "code_quality_score": 90,
  "total_issues": 1,
  "issues": [
    {
      "line": 1,
      "type": "Code Style",
      "severity": "Warning",
      "problem": "Missing docstring for function",
      "solution": "Add a docstring to document the function",
      "example_before": "def hello():",
      "example_fix": "def hello():\n    \"\"\"Returns True.\"\"\""
    }
  ],
  "metrics": {
    "totalLines": 2,
    "totalFunctions": 1,
    "complexityScore": 1
  },
  "summary": {
    "critical": 0,
    "errors": 0,
    "warnings": 1,
    "info": 0,
    "recommendation": "Add documentation and your code will be excellent!"
  }
}
```

**Key Features:**
- `language` - Automatically detected programming language
- `code_quality_score` - 0-100 score (100 only when zero issues)
- `total_issues` - Count of all detected issues
- `issues` - Array of detailed issue information per language
- `metrics` - Code metrics (lines, functions, complexity)
- `summary` - Breakdown by severity with recommendations

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Monaco Editor** - Code editor
- **React Router** - Navigation
- **Axios** - HTTP client
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin requests
- **Body Parser** - JSON parsing

## 📊 Quality Score Breakdown

| Score | Rating | Meaning |
|-------|--------|---------|
| 80-100 | 🟢 Excellent | Clean, well-written code |
| 60-79 | 🟡 Good | Minor improvements needed |
| 40-59 | 🟠 Needs Improvement | Several issues to address |
| 0-39 | 🔴 Critical | Significant issues found |

## 🎨 UI Features

### Dark Theme
- Professional developer-focused design
- Easy on the eyes
- Optimized for coding

### Responsive Layout
- Desktop optimized
- Tablet friendly
- Mobile accessible

### Visual Feedback
- Real-time code syntax highlighting
- Animated score display
- Color-coded issues
- Loading states
- Success animations

## 🔒 Security Considerations

- Server-side code analysis (no code leaves your server)
- CORS enabled for controlled access
- Input validation
- Error handling
- Rate limiting ready (can be added)

## 🚀 Performance

- Monaco Editor lazy loading
- Optimized component rendering
- Efficient code analysis algorithms
- Fast API responses

## 📝 Code Analysis Rules

### Critical Issues (❌)
- Using `var` keyword
- Critical security concerns

### Warnings (⚠️)
- Nested loops
- Long functions
- High complexity
- Missing error handling
- Magic numbers
- Multiple console.log statements

## 🛣️ Roadmap

- [ ] User authentication
- [ ] Cloud storage for reports
- [ ] Team collaboration features
- [ ] GitHub integration
- [ ] More language support
- [ ] AI-powered suggestions using OpenAI
- [ ] Custom rulesets
- [ ] Real-time collaboration
- [ ] Code metrics visualization

## 📜 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Support

For issues, questions, or suggestions:
1. Open an issue on GitHub
2. Contact the development team
3. Check the documentation

## 📚 Documentation

### Multi-Language Support
For detailed information about supported languages and analysis features:
- **[MULTI_LANGUAGE_GUIDE.md](./MULTI_LANGUAGE_GUIDE.md)** - Comprehensive guide to all 10 supported languages, analysis features per language, API response format, scoring system
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Quick test snippets for each language, testing procedures, debugging tips, success criteria

### Quick Navigation
- In-app: Click **"Languages"** link in the navbar to explore all supported languages interactively
- API: POST code to `/analyze` endpoint for multi-language analysis

## 🎓 Learning Resources

This project demonstrates:
- Full-stack development with React and Node.js
- RESTful API design
- Multi-language code parsing and analysis
- Code analysis algorithms
- Responsive UI design
- Modern development practices

## 🎉 Get Started

```bash
# Backend
cd backend && npm install && node server.js

# Frontend (in a new terminal)
cd frontend && npm install && npm run dev
```

Visit **http://localhost:5173** and start analyzing code!

---

**Made with ❤️ for developers, by developers**

Happy Code Reviewing! 🚀
