import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Download } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function MetricsChart({ title, value, trend, data, color = 'blue' }) {
  const colorStyles = {
    blue: {
      border: 'rgb(96, 165, 250)',
      bg: 'rgba(96, 165, 250, 0.15)',
      accent: 'bg-orange-600/20 text-orange-500 border-orange-600/30',
      badge: 'bg-orange-600/20 text-orange-500',
    },
    blue: {
      border: 'rgb(74, 222, 128)',
      bg: 'rgba(74, 222, 128, 0.15)',
      accent: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      badge: 'bg-orange-500/20 text-orange-400',
    },
    blue: {
      border: 'rgb(196, 181, 253)',
      bg: 'rgba(196, 181, 253, 0.15)',
      accent: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      badge: 'bg-orange-500/20 text-orange-400',
    },
    blue: {
      border: 'rgb(251, 146, 60)',
      bg: 'rgba(251, 146, 60, 0.15)',
      accent: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      badge: 'bg-orange-500/20 text-orange-400',
    },
    blue: {
      border: 'rgb(248, 113, 113)',
      bg: 'rgba(248, 113, 113, 0.15)',
      accent: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      badge: 'bg-orange-500/20 text-orange-400',
    },
  };

  const style = colorStyles[color] || colorStyles.blue;

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: title,
        data: data.values,
        borderColor: style.border,
        backgroundColor: style.bg,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: style.border,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(186, 230, 253, 0.95)',
        padding: 12,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        titleColor: 'rgba(15, 23, 42, 0.95)',
        bodyColor: 'rgba(51, 65, 85, 0.85)',
        borderColor: 'rgba(135, 206, 250, 0.5)',
        borderWidth: 2,
        cornerRadius: 8,
        callbacks: {
          label: function (context) {
            return `${title}: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false,
        },
        ticks: {
          color: 'rgba(148, 163, 184, 0.6)',
          font: { size: 12 },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(148, 163, 184, 0.6)',
          font: { size: 12 },
        },
      },
    },
  };

  const handleExport = () => {
    alert(`Exporting ${title} chart...`);
  };

  return (
    <div className="bg-[#fffaf5] rounded-xl border border-white/10 p-6 shadow-lg hover-lift transition-all duration-300 h-full flex flex-col backdrop-blur">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <p className="text-sm text-slate-600 font-medium">{title}</p>
          <div className="flex items-end space-x-3 mt-2">
            <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
            {trend && (
              <span
                className={`text-sm font-semibold ${
                  trend > 0
                    ? 'text-orange-400'
                    : trend < 0
                    ? 'text-orange-400'
                    : 'text-slate-600'
                }`}
              >
                {trend > 0 ? 'â†‘' : trend < 0 ? 'â†“' : 'â†’'} {Math.abs(trend)}%
              </span>
            )}
          </div>
        </div>
        <button
          onClick={handleExport}
          className="p-2 text-slate-600 hover:text-orange-700 hover:bg-white/10 rounded-lg transition-all duration-300"
          title="Export chart"
        >
          <Download size={18} />
        </button>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-[200px]">
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Footer Stats */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="text-xs text-gray-500">
          <p>Updated 5 minutes ago</p>
        </div>
        <button className={`text-xs font-semibold px-3 py-1 rounded-full border ${style.accent}`}>
          View Details
        </button>
      </div>
    </div>
  );
}


