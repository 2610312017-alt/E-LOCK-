import React, { useState } from 'react';
import { BarChart3, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ToolItem } from '../types/locker';
import { evaluateErgonomicPlacement } from '../logic/lockerEngine';

interface UsageErgonomicsChartProps {
  tools: ToolItem[];
  onSelectTool: (tool: ToolItem) => void;
}

export const UsageErgonomicsChart: React.FC<UsageErgonomicsChartProps> = ({ tools, onSelectTool }) => {
  const [filterMode, setFilterMode] = useState<'ALL' | 'TOP_DEMAND' | 'ERGONOMIC_MISMATCH'>('ALL');

  const sortedTools = [...tools].sort((a, b) => b.loanFrequencyMonthly - a.loanFrequencyMonthly);

  const displayedTools = sortedTools.filter((tool) => {
    if (filterMode === 'TOP_DEMAND') {
      return tool.loanFrequencyMonthly >= 25;
    }
    if (filterMode === 'ERGONOMIC_MISMATCH') {
      const evalRes = evaluateErgonomicPlacement(tool);
      return !evalRes.isRecommendedPlacement;
    }
    return true;
  });

  const maxFrequency = Math.max(...tools.map((t) => t.loanFrequencyMonthly), 70);

  return (
    <section id="analytics" className="bg-white rounded-3xl border border-black/[0.06] shadow-sm p-6 sm:p-8 flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#86868b] font-medium block">
              OUTPUT 3 • ERGONOMICS
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f] mt-0.5">
              Usage Statistics & Golden Zone
            </h3>
            <p className="text-xs text-[#86868b] mt-0.5">
              Monthly requisitions vs ergonomic waist-to-chest tier placement.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-[#f5f5f7] p-1 rounded-full border border-black/[0.04] self-start sm:self-auto">
            <button
              onClick={() => setFilterMode('ALL')}
              className={`text-[11px] font-medium px-3 py-1 rounded-full transition-colors ${
                filterMode === 'ALL'
                  ? 'bg-black text-white shadow-xs'
                  : 'text-slate-600 hover:text-black'
              }`}
            >
              All (16)
            </button>
            <button
              onClick={() => setFilterMode('TOP_DEMAND')}
              className={`text-[11px] font-medium px-3 py-1 rounded-full transition-colors ${
                filterMode === 'TOP_DEMAND'
                  ? 'bg-black text-white shadow-xs'
                  : 'text-slate-600 hover:text-black'
              }`}
            >
              Top Demand
            </button>
            <button
              onClick={() => setFilterMode('ERGONOMIC_MISMATCH')}
              className={`text-[11px] font-medium px-3 py-1 rounded-full transition-colors ${
                filterMode === 'ERGONOMIC_MISMATCH'
                  ? 'bg-black text-white shadow-xs'
                  : 'text-slate-600 hover:text-black'
              }`}
            >
              Needs Re-tier
            </button>
          </div>
        </div>

        {/* Ergonomic Zone Key */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 mb-5 bg-[#f5f5f7] p-2.5 rounded-2xl border border-black/[0.04]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#34c759]" /> Golden Zone (Rows 2-3, Waist/Chest)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0071e3]" /> Upper Rack (Row 4, Light/Diagnostic)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff9f0a]" /> Bottom Base (Row 1, Heavy Machining)
          </span>
        </div>

        {/* Interactive Bar Chart List */}
        <div className="space-y-3 max-h-[310px] overflow-y-auto pr-1">
          {displayedTools.map((tool) => {
            const percentage = Math.round((tool.loanFrequencyMonthly / maxFrequency) * 100);
            const ergonomic = evaluateErgonomicPlacement(tool);
            const isGolden = tool.slotRow === 2 || tool.slotRow === 3;

            let barColor = 'bg-[#0071e3]';
            if (isGolden) {
              barColor = 'bg-[#34c759]';
            } else if (tool.slotRow === 1) {
              barColor = 'bg-[#ff9f0a]';
            }

            return (
              <div
                key={tool.id}
                onClick={() => onSelectTool(tool)}
                className="group p-3 rounded-2xl bg-[#fafafc] hover:bg-[#f2f2f5] border border-black/[0.04] hover:border-black/[0.12] cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-black/[0.08] text-slate-800">
                      {tool.slotId}
                    </span>
                    <span className="font-medium text-slate-900 group-hover:text-black line-clamp-1 max-w-[220px]">
                      {tool.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="text-slate-400">Row {tool.slotRow}</span>
                    <span className="font-bold text-slate-900">{tool.loanFrequencyMonthly} req/mo</span>
                  </div>
                </div>

                {/* Apple Health style Pill Bar */}
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden relative">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {/* Tagline */}
                <div className="flex items-center justify-between mt-1.5 text-[10px] text-slate-500">
                  <span>{tool.category}</span>
                  {ergonomic.isRecommendedPlacement ? (
                    <span className="text-emerald-700 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Ergonomic Match
                    </span>
                  ) : (
                    <span className="text-amber-700 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-amber-600" /> Recommend Row 2/3
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Industrial Engineering Pareto Principle Note */}
      <div className="mt-4 pt-4 border-t border-black/[0.04] text-xs text-slate-500 flex items-center justify-between">
        <span>Pareto 80/20: Top 5 tools account for 68% of monthly requisitions.</span>
      </div>
    </section>
  );
};
