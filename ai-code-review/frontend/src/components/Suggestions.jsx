import { Lightbulb, CheckCircle } from 'lucide-react';

export default function Suggestions({ suggestions }) {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-white to-orange-50 border border-orange-200 rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-orange-50 border-b border-orange-200">
        <div className="flex items-center gap-3">
          <Lightbulb className="h-5 w-5 text-orange-500" />
          <h3 className="text-lg font-semibold text-slate-900">
            Suggested Improvements ({suggestions.length})
          </h3>
        </div>
      </div>

      <div className="divide-y divide-slate-600">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="px-6 py-4 hover:bg-orange-100 transition">
            <div className="flex items-start gap-4">
              <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-slate-800">{suggestion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pro Tips */}
      <div className="px-6 py-4 bg-orange-50 border-t border-orange-200">
        <p className="text-xs text-slate-600 font-semibold mb-3">ðŸ’¡ Pro Tip</p>
        <p className="text-sm text-slate-700 leading-relaxed">
          Implementing these suggestions will improve your code quality, maintainability, and
          overall performance. Start with the critical issues first.
        </p>
      </div>
    </div>
  );
}



