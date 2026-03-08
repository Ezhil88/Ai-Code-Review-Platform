import { useState } from 'react';
import {
  Home,
  BarChart3,
  Settings,
  Users,
  Zap,
  FileText,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }) {
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [activeItem, setActiveItem] = useState('Home');

  const menuItems = [
    { icon: Home, label: 'Home', href: '#' },
    { icon: FileText, label: 'Projects', href: '#' },
    { icon: BarChart3, label: 'Metrics', href: '#' },
    { icon: Settings, label: 'Resources', href: '#' },
    { icon: Users, label: 'Teams', href: '#' },
    { icon: Zap, label: 'Automation', href: '#' },
  ];

  const toggleMenu = (label) => {
    setExpandedMenu(expandedMenu === label ? null : label);
    setActiveItem(label);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 hover:bg-white/10 rounded-lg text-slate-900 transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-[#ffffff] border-r border-white/10 w-64 transform transition-transform duration-300 z-40 md:translate-x-0 pt-6 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-4 mb-8">
          <div className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-orange-600 to-orange-600 p-2.5 rounded-xl group-hover:shadow-lg group-hover:shadow-orange-500/30 transition-all duration-300">
              <BarChart3 className="h-6 w-6 text-slate-900" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">AI Review</h2>
              <p className="text-xs text-orange-400 font-semibold">Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2 px-4">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isExpanded = expandedMenu === item.label;
            const isActive = activeItem === item.label;

            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-600/20 to-orange-500/20 border border-orange-500/30 text-slate-900'
                      : 'text-slate-600 hover:text-orange-700 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent className={`h-5 w-5 transition-all duration-300 ${
                      isActive ? 'text-orange-400 glow' : 'text-slate-600 group-hover:text-orange-400'
                    }`} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  {item.label !== 'Home' && (
                    <ChevronDown
                      size={16}
                      className={`text-slate-500 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>

                {/* Submenu */}
                {isExpanded && item.label !== 'Home' && (
                  <div className="bg-white/5 rounded-lg mt-2 py-2 px-2 space-y-1 border border-white/5">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-slate-600 hover:text-orange-400 hover:bg-white/10 rounded transition-colors"
                    >
                      View All
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-slate-600 hover:text-orange-400 hover:bg-white/10 rounded transition-colors"
                    >
                      Recent
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-slate-600 hover:text-orange-400 hover:bg-white/10 rounded transition-colors"
                    >
                      Settings
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-[#fffaf5]/50">
          <div className="bg-gradient-to-br from-orange-500/20 to-orange-500/20 border border-orange-500/30 rounded-xl p-4">
            <p className="text-xs font-semibold text-slate-900 mb-2">
              Upgrade to Pro
            </p>
            <p className="text-xs text-slate-600 mb-3">
              Get advanced features and unlimited access
            </p>
            <button className="btn-primary-glow w-full text-xs font-semibold py-2 rounded-lg transition-all duration-300">
              Upgrade
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}


