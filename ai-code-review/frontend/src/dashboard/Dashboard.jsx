import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MetricsChart from './MetricsChart';
import DashboardCard from './DashboardCard';
import {
  CheckCircle,
  AlertTriangle,
  Shield,
  TrendingUp,
  Code2,
  Users,
} from 'lucide-react';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data for charts
  const chartDataSets = {
    reviewedPRs: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [12, 19, 8, 15, 22, 18, 25],
    },
    totalReviews: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [45, 52, 38, 61, 73, 68, 82],
    },
    linesAccepted: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [1200, 1450, 980, 1600, 1850, 1700, 2100],
    },
    bugsDetected: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [8, 12, 5, 9, 14, 10, 16],
    },
    securityIssues: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [3, 5, 2, 4, 7, 5, 9],
    },
    qualityTrend: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [78, 82, 75, 85, 88, 86, 91],
    },
  };

  const statCards = [
    {
      title: 'Total PRs Reviewed',
      value: '1,234',
      trend: 12,
      icon: CheckCircle,
      color: 'blue',
      description: 'Pull requests analyzed this month',
    },
    {
      title: 'Bugs Found',
      value: '127',
      trend: 8,
      icon: AlertTriangle,
      color: 'blue',
      description: 'Critical and high priority issues',
    },
    {
      title: 'Security Issues',
      value: '23',
      trend: -5,
      icon: Shield,
      color: 'blue',
      description: 'Vulnerabilities detected',
    },
    {
      title: 'Code Quality Score',
      value: '88.5%',
      trend: 3,
      icon: TrendingUp,
      color: 'blue',
      description: 'Overall code quality average',
    },
  ];

  return (
    <div className="flex h-screen bg-[#ffffff]">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:ml-64">
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="animate-fade-in-up">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-orange-400 to-orange-400 bg-clip-text text-transparent mb-2">
                Welcome back, Developer! ðŸ‘‹
              </h2>
              <p className="text-slate-600">
                Here's your code review analytics for this week
              </p>
            </div>

            {/* Stats Cards Grid - Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {statCards.map((card) => (
                <DashboardCard
                  key={card.title}
                  title={card.title}
                  value={card.value}
                  trend={card.trend}
                  icon={card.icon}
                  color={card.color}
                  description={card.description}
                  action={{
                    label: 'View Details',
                    variant: 'ghost',
                  }}
                />
              ))}
            </div>

            {/* Charts Grid - Row 2 & 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Reviewed PRs Chart */}
              <MetricsChart
                title="Reviewed Pull Requests"
                value="127"
                trend={15}
                data={chartDataSets.reviewedPRs}
                color="blue"
              />

              {/* Total Reviews Chart */}
              <MetricsChart
                title="Total Code Reviews"
                value="528"
                trend={22}
                data={chartDataSets.totalReviews}
                color="blue"
              />
            </div>

            {/* Charts Grid - Row 4 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Lines Accepted Chart */}
              <MetricsChart
                title="Total Lines Accepted"
                value="12.4K"
                trend={18}
                data={chartDataSets.linesAccepted}
                color="blue"
              />

              {/* Quality Trend Chart */}
              <MetricsChart
                title="Code Quality Trend"
                value="88.5%"
                trend={5}
                data={chartDataSets.qualityTrend}
                color="blue"
              />
            </div>

            {/* Charts Grid - Row 5 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bugs Detected Chart */}
              <MetricsChart
                title="Bugs Detected"
                value="94"
                trend={-8}
                data={chartDataSets.bugsDetected}
                color="blue"
              />

              {/* Security Issues Chart */}
              <MetricsChart
                title="Security Issues Found"
                value="38"
                trend={-12}
                data={chartDataSets.securityIssues}
                color="blue"
              />
            </div>

            {/* Bottom Section - Recent Activity */}
            <div className="bg-[#fffaf5] rounded-xl border border-white/10 p-6 shadow-lg backdrop-blur hover:border-white/20 transition-all">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between p-4 hover:bg-white/5 rounded-lg transition border border-transparent hover:border-white/10"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-600/20 border border-orange-600/30">
                        <Code2 className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          PR #{1250 + item} reviewed
                        </p>
                        <p className="text-sm text-slate-600">
                          {45 + item * 10} lines of code analyzed
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-orange-400">
                        Quality: 92%
                      </p>
                      <p className="text-xs text-slate-500">
                        {2 + item} hours ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-slate-500 pb-6">
              <p>Last updated: {new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


