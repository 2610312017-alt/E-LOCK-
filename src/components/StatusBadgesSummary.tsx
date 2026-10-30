import React from 'react';
import { CheckCircle2, Sparkles, AlertOctagon, Wrench, ShieldAlert } from 'lucide-react';
import { ToolItem, Workstation } from '../types/locker';
import { determineLockerBadgeStatus } from '../logic/lockerEngine';

interface StatusBadgesSummaryProps {
  tools: ToolItem[];
  activeWorkstation: Workstation;
  activeFilter: 'ALL' | 'BLUE' | 'GREEN' | 'RED';
  onFilterChange: (filter: 'ALL' | 'BLUE' | 'GREEN' | 'RED') => void;
}

export const StatusBadgesSummary: React.FC<StatusBadgesSummaryProps> = ({
  tools,
  activeWorkstation,
  activeFilter,
  onFilterChange,
}) => {
  let blueCount = 0;
  let greenCount = 0;
  let redCount = 0;

  tools.forEach((tool) => {
    const badge = determineLockerBadgeStatus(tool, activeWorkstation);
    if (badge.code === 'green') greenCount++;
    else if (badge.code === 'blue') blueCount++;
    else if (badge.code === 'red') redCount++;
  });

  return (
    <div className="bg-white rounded-3xl border border-black/[0.06] shadow-sm p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f]">
            Status Indicator Badges
          </h3>
          <p className="text-xs text-[#86868b] mt-0.5">
            Real-time color-coded inventory across 16 smart bays.
          </p>
        </div>

        <span className="text-xs text-slate-500 font-medium self-start sm:self-auto bg-[#f5f5f7] px-3 py-1 rounded-full border border-black/[0.04]">
          {activeFilter === 'ALL' ? 'Showing All Bays' : `Filtered: ${activeFilter}`}
        </span>
      </div>

      {/* 4 Clean Apple-style Pill Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Capacity */}
        <button
          onClick={() => onFilterChange('ALL')}
          className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer ${
            activeFilter === 'ALL'
              ? 'bg-[#1d1d1f] text-white border-black shadow-md'
              : 'bg-[#f5f5f7] hover:bg-[#ebebeb] text-[#1d1d1f] border-black/[0.04]'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[11px] font-medium ${activeFilter === 'ALL' ? 'text-white/70' : 'text-[#86868b]'}`}>
              Total Capacity
            </span>
            <Wrench className="w-4 h-4 opacity-70" />
          </div>
          <div className="text-3xl font-extrabold tracking-tight font-sans">
            {tools.length}
          </div>
          <p className={`text-[11px] mt-1 ${activeFilter === 'ALL' ? 'text-white/60' : 'text-[#86868b]'}`}>
            16 Smart Bays
          </p>
        </button>

        {/* Blue: Standard Available */}
        <button
          onClick={() => onFilterChange('BLUE')}
          className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer ${
            activeFilter === 'BLUE'
              ? 'bg-[#0071e3] text-white border-[#0071e3] shadow-md shadow-blue-500/20'
              : 'bg-[#f5f5f7] hover:bg-[#ebebeb] text-[#1d1d1f] border-black/[0.04]'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[11px] font-medium flex items-center gap-1.5 ${
              activeFilter === 'BLUE' ? 'text-white/90' : 'text-[#0071e3]'
            }`}>
              <span className="w-2 h-2 rounded-full bg-[#0071e3]"></span>
              Blue: Available
            </span>
            <CheckCircle2 className="w-4 h-4 opacity-70" />
          </div>
          <div className="text-3xl font-extrabold tracking-tight font-sans">
            {blueCount}
          </div>
          <p className={`text-[11px] mt-1 ${activeFilter === 'BLUE' ? 'text-white/80' : 'text-[#86868b]'}`}>
            Ready for checkout
          </p>
        </button>

        {/* Green: Recommended / Golden Zone */}
        <button
          onClick={() => onFilterChange('GREEN')}
          className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer ${
            activeFilter === 'GREEN'
              ? 'bg-[#34c759] text-white border-[#34c759] shadow-md shadow-emerald-500/20'
              : 'bg-[#f5f5f7] hover:bg-[#ebebeb] text-[#1d1d1f] border-black/[0.04]'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[11px] font-medium flex items-center gap-1.5 ${
              activeFilter === 'GREEN' ? 'text-white/90' : 'text-[#34c759]'
            }`}>
              <span className="w-2 h-2 rounded-full bg-[#34c759]"></span>
              Green: Recommended
            </span>
            <Sparkles className="w-4 h-4 opacity-70" />
          </div>
          <div className="text-3xl font-extrabold tracking-tight font-sans">
            {greenCount}
          </div>
          <p className={`text-[11px] mt-1 ${activeFilter === 'GREEN' ? 'text-white/80' : 'text-[#86868b]'}`}>
            Ergonomic Golden Zone
          </p>
        </button>

        {/* Red: In Use / Maintenance */}
        <button
          onClick={() => onFilterChange('RED')}
          className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer ${
            activeFilter === 'RED'
              ? 'bg-[#ff3b30] text-white border-[#ff3b30] shadow-md shadow-red-500/20'
              : 'bg-[#f5f5f7] hover:bg-[#ebebeb] text-[#1d1d1f] border-black/[0.04]'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[11px] font-medium flex items-center gap-1.5 ${
              activeFilter === 'RED' ? 'text-white/90' : 'text-[#ff3b30]'
            }`}>
              <span className="w-2 h-2 rounded-full bg-[#ff3b30]"></span>
              Red: In Use / Maint.
            </span>
            <AlertOctagon className="w-4 h-4 opacity-70" />
          </div>
          <div className="text-3xl font-extrabold tracking-tight font-sans">
            {redCount}
          </div>
          <p className={`text-[11px] mt-1 ${activeFilter === 'RED' ? 'text-white/80' : 'text-[#86868b]'}`}>
            Locked or deployed
          </p>
        </button>
      </div>
    </div>
  );
};
