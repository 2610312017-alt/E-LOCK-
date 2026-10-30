import React from 'react';
import { Plus, Feather, ArrowRight } from 'lucide-react';

interface AppleHeroSectionProps {
  onExploreClick: () => void;
  onWhyElockClick: () => void;
  totalTools: number;
  availableTools: number;
}

export const AppleHeroSection: React.FC<AppleHeroSectionProps> = ({
  onWhyElockClick,
  totalTools,
  availableTools,
}) => {
  return (
    <section id="hero" className="pt-8 sm:pt-14 pb-12 sm:pb-16 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Grand Minimalist Header */}
      <div className="text-center mb-10 sm:mb-14">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-[#1d1d1f]">
          E-LOCK
        </h1>
        <p className="mt-2.5 text-base sm:text-xl font-normal text-[#86868b] tracking-normal">
          Built for everything you engineer.
        </p>
      </div>

      {/* Bento Cards Layout: 2 Top Cards + Full-Width Bottom Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto w-full">
        {/* 1. Environmental / Load Cell Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-black/[0.06] shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 mb-3">
              <Feather className="w-4 h-4" />
            </div>
            <p className="text-sm font-semibold text-slate-900 leading-tight mb-1">
              Strain-gauge precision
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Continuous weight sensing with sub-gram tolerance thresholds on all 16 modular slots.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>SERIES 400</span>
            <span className="text-emerald-600 font-semibold">{availableTools}/{totalTools} Ready</span>
          </div>
        </div>

        {/* 2. 100% Traceability Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-black/[0.06] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold tracking-tight text-slate-900">100%</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-sm font-semibold text-slate-900 leading-tight mb-1">
              Traceability
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every checkout, return, and calibration audit logged in real time with zero paperwork.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
            RFID + LOAD CELL SYNC
          </div>
        </div>

        {/* 3. Why E-LOCK: Moved below the 2 boxes, full-width across layout */}
        <div
          onClick={onWhyElockClick}
          className="sm:col-span-2 w-full p-5 sm:p-6 rounded-2xl bg-white border border-black/[0.06] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 hover:shadow-md transition-all group text-center sm:text-left"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-black/15 flex items-center justify-center text-slate-700 group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all shrink-0">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm sm:text-base font-semibold text-slate-900 block">
                Why E-LOCK
              </span>
              <span className="text-xs text-slate-500 mt-0.5 block">
                View Academic Logic & Formulas • Interactive System Architecture
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-[#f5f5f7] px-4 py-2 rounded-full border border-black/[0.04] group-hover:bg-black group-hover:text-white transition-colors shrink-0">
            <span>Explore Engineering Logic</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </section>
  );
};
