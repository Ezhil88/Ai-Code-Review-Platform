import { TrendingUp, TrendingDown } from 'lucide-react';

export default function DashboardCard({
  title,
  value,
  trend,
  description,
  icon: IconComponent,
  color = 'blue',
  action,
}) {
  const colorStyles = {
    blue: {
      bg: 'bg-[#fffaf5]',
      border: 'border-orange-600/20',
      icon: 'text-orange-500',
      accent: 'bg-orange-600/20',
      badge: 'bg-orange-600',
    },
    blue: {
      bg: 'bg-[#fffaf5]',
      border: 'border-orange-500/20',
      icon: 'text-orange-400',
      accent: 'bg-orange-500/20',
      badge: 'bg-orange-500',
    },
    blue: {
      bg: 'bg-[#fffaf5]',
      border: 'border-orange-500/20',
      icon: 'text-orange-400',
      accent: 'bg-orange-500/20',
      badge: 'bg-orange-500',
    },
    blue: {
      bg: 'bg-[#fffaf5]',
      border: 'border-orange-500/20',
      icon: 'text-orange-400',
      accent: 'bg-orange-500/20',
      badge: 'bg-orange-500',
    },
    blue: {
      bg: 'bg-[#fffaf5]',
      border: 'border-orange-500/20',
      icon: 'text-orange-400',
      accent: 'bg-orange-500/20',
      badge: 'bg-orange-500',
    },
  };

  const style = colorStyles[color] || colorStyles.blue;

  return (
    <div className={`${style.bg} rounded-xl border ${style.border} p-6 shadow-lg hover-lift transition-all duration-300 h-full flex flex-col backdrop-blur hover:border-white/20`}>
      {/* Top Section with Icon and Title */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-slate-600 font-medium">{title}</p>
        </div>
        {IconComponent && (
          <div className={`${style.accent} p-3 rounded-lg`}>
            <IconComponent className={`h-5 w-5 ${style.icon}`} />
          </div>
        )}
      </div>

      {/* Value and Trend */}
      <div className="mb-4">
        <h3 className="text-4xl font-bold text-slate-900 mb-2">{value}</h3>
        {trend !== undefined && (
          <div className="flex items-center space-x-2">
            <span
              className={`flex items-center text-sm font-semibold ${
                trend > 0
                  ? 'text-orange-400'
                  : trend < 0
                  ? 'text-orange-400'
                  : 'text-slate-600'
              }`}
            >
              {trend > 0 ? (
                <TrendingUp size={16} className="mr-1" />
              ) : trend < 0 ? (
                <TrendingDown size={16} className="mr-1" />
              ) : null}
              {Math.abs(trend) > 0 ? `${Math.abs(trend)}%` : 'No change'}
            </span>
            <span className="text-sm text-slate-500">vs last period</span>
          </div>
        )}
      </div>

      {/* Description */}
      {description && <p className="text-sm text-slate-600 mb-4">{description}</p>}

      {/* Progress Bar (Optional) */}
      {action?.showProgress && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${style.bg}`}
              style={{ width: `${action.progressValue || 0}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">{action.progressLabel}</p>
        </div>
      )}

      {/* Action Button */}
      {action?.label && (
        <button className={`mt-auto px-4 py-2 rounded-lg font-medium text-sm transition ${
          action.variant === 'ghost'
            ? 'text-orange-600 hover:bg-orange-50'
            : `${style.bg} text-gray-700 hover:border-gray-300`
        } border border-transparent hover:border-gray-200`}>
          {action.label}
        </button>
      )}

      {/* Divider and Footer Stats */}
      {action?.footer && (
        <>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">{action.footer}</p>
          </div>
        </>
      )}
    </div>
  );
}


