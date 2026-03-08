import { useState } from 'react';
import {
  Bell,
  Share2,
  Download,
  Link2,
  FileJson,
  Image,
  ChevronDown,
  Search,
  Settings,
} from 'lucide-react';

export default function Topbar() {
  const [dateRange, setDateRange] = useState('7days');
  const [filterTeam, setFilterTeam] = useState('All Teams');
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const shareOptions = [
    { icon: Link2, label: 'Copy dashboard link', action: 'copy' },
    { icon: FileJson, label: 'Export as CSV', action: 'csv' },
    { icon: Image, label: 'Export as PNG', action: 'png' },
  ];

  const handleShare = (action) => {
    if (action === 'copy') {
      navigator.clipboard.writeText(window.location.href);
      alert('Dashboard link copied!');
    } else if (action === 'csv') {
      alert('Exporting as CSV...');
    } else if (action === 'png') {
      alert('Exporting as PNG...');
    }
    setShareMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-gradient-to-b from-[#ffffff]/95 via-[#fffaf5]/90 to-transparent border-b border-white/5">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center space-x-6 flex-1">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-orange-400 to-orange-400 bg-clip-text text-transparent">Analytics</h1>

          {/* Date Range Selector */}
          <div className="hidden lg:flex items-center space-x-2">
            <label className="text-sm text-slate-600">Date Range:</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-white/10 rounded-lg text-sm text-slate-900 bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur"
            >
              <option className="bg-[#fffaf5] text-slate-900" value="7days">Last 7 days</option>
              <option className="bg-[#fffaf5] text-slate-900" value="30days">Last 30 days</option>
              <option className="bg-[#fffaf5] text-slate-900" value="90days">Last 90 days</option>
              <option className="bg-[#fffaf5] text-slate-900" value="1year">Last year</option>
            </select>
          </div>

          {/* Filter Dropdown */}
          <div className="hidden lg:flex items-center space-x-2">
            <select
              value={filterTeam}
              onChange={(e) => setFilterTeam(e.target.value)}
              className="px-3 py-2 border border-white/10 rounded-lg text-sm text-slate-900 bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur"
            >
              <option className="bg-[#fffaf5] text-slate-900">All Teams</option>
              <option className="bg-[#fffaf5] text-slate-900">Team A</option>
              <option className="bg-[#fffaf5] text-slate-900">Team B</option>
              <option className="bg-[#fffaf5] text-slate-900">Team C</option>
            </select>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-lg px-3 py-2 hover:bg-white/10 transition-all backdrop-blur">
            <Search size={18} className="text-slate-600" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent ml-2 outline-none text-sm text-slate-900 placeholder-orange-400 w-40"
            />
          </div>

          {/* Notification Icon */}
          <div className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative p-2 text-slate-600 hover:text-orange-700 hover:bg-white/10 rounded-lg transition-all duration-300"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 bg-orange-500 rounded-full animate-pulse"></span>
            </button>

            {/* Notification Dropdown */}
            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-[#fffaf5]/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 z-50">
                <div className="p-4 border-b border-white/10">
                  <h3 className="font-semibold text-slate-900">Notifications</h3>
                </div>
                <div className="divide-y divide-white/5 max-h-64 overflow-y-auto">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="p-4 hover:bg-white/5 transition-colors cursor-pointer">
                      <p className="text-sm font-medium text-slate-900">
                        PRs Analysis Complete
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        5 pull requests analyzed successfully
                      </p>
                      <p className="text-xs text-slate-500 mt-2">2 hours ago</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Share Button with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShareMenuOpen(!shareMenuOpen)}
              className="btn-primary-glow flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300"
            >
              <Share2 size={18} />
              <span className="hidden sm:inline">Share</span>
              <ChevronDown size={16} />
            </button>

            {/* Share Menu */}
            {shareMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#fffaf5]/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 z-50">
                <div className="p-4 border-b border-white/10">
                  <h3 className="font-semibold text-slate-900">Share Dashboard</h3>
                </div>
                <div className="divide-y divide-white/5">
                  {shareOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <button
                        key={option.action}
                        onClick={() => handleShare(option.action)}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-slate-600 hover:text-orange-700 hover:bg-white/10 transition-colors text-left"
                      >
                        <IconComponent size={18} className="text-orange-400" />
                        <span className="text-sm font-medium">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <div className="relative">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="User"
                className="h-8 w-8 rounded-full cursor-pointer hover:ring-2 hover:ring-orange-600 transition"
              />
            </div>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}


