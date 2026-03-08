import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import Navbar from './components/Navbar';
import Editor from './pages/Editor';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import LanguageSupport from './pages/LanguageSupport';
import LandingPage from './landing/LandingPage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing Page - No Additional Navbar (has its own) */}
          <Route path="/" element={<LandingPage />} />

          {/* Main App Pages - With Navbar */}
          <Route
            path="/*"
            element={
              <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
                <Navbar />
                <Routes>
                  <Route path="/editor" element={<Editor />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/languages" element={<LanguageSupport />} />
                </Routes>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

