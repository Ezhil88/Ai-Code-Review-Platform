import { Link } from 'react-router-dom';
import { Code2, Zap, Shield, BarChart3, ArrowRight } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <Code2 className="h-8 w-8" />,
      title: 'Code Analysis',
      description: 'Deep analysis of your code to detect issues and vulnerabilities',
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Performance Optimization',
      description: 'Get suggestions to optimize your code for better performance',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Best Practices',
      description: 'Follow coding best practices and standards automatically',
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'Quality Metrics',
      description: 'Track code quality with comprehensive metrics and reports',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 pt-12">
            <div className="inline-block mb-6">
              <span className="bg-orange-500/10 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold border border-orange-500/30">
                âœ¨ Poweblue by AI
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              AI Code Review &<br />
              <span className="bg-gradient-to-r from-orange-500 to-orange-500 bg-clip-text text-transparent">
                Bug Detection
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              Detect bugs, code issues, and security vulnerabilities in seconds. Analyze your code with advanced AI algorithms and get actionable improvements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/editor"
                className="group bg-gradient-to-r from-orange-500 to-orange-500 text-slate-900 px-8 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-orange-500/50 transition flex items-center justify-center gap-2"
              >
                Start Analyzing
                <ArrowRight className="group-hover:translate-x-1 transition" size={20} />
              </Link>
              <button className="border-2 border-orange-200 hover:border-slate-500 text-slate-900 px-8 py-3 rounded-lg font-bold transition">
                View Documentation
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-orange-50 border border-orange-200 rounded-lg p-6 hover:border-orange-500/50 hover:bg-orange-100 transition group"
              >
                <div className="text-orange-400 mb-4 group-hover:text-orange-400 transition">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-orange-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Paste Your Code',
                description: 'Upload or paste your code into our Monaco Editor',
              },
              {
                step: '2',
                title: 'AI Analysis',
                description: 'Our AI analyzes your code for issues and vulnerabilities',
              },
              {
                step: '3',
                title: 'Get Recommendations',
                description: 'Receive detailed suggestions and improvements',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-orange-500 to-orange-500 rounded-full mb-4">
                  <span className="text-2xl font-bold text-slate-900">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-orange-600 to-orange-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Ready to improve your code?</h2>
          <p className="text-orange-100 mb-8 text-lg">
            Start analyzing your code today and write better, cleaner code
          </p>
          <Link
            to="/editor"
            className="inline-block bg-white text-orange-600 px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition"
          >
            Launch Code Editor
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-orange-200 py-8 px-4 bg-orange-50">
        <div className="max-w-7xl mx-auto text-center text-slate-600">
          <p>&copy; 2024 AI Code Review Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}



