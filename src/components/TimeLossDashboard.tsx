import React, { useState } from 'react';
import {
  Clock,
  DollarSign,
  ShieldCheck,
  Zap,
  Sliders,
} from 'lucide-react';
import { calculateTimeLossMetrics } from '../logic/lockerEngine';

export const TimeLossDashboard: React.FC = () => {
  const [dailyRequisitions, setDailyRequisitions] = useState(48);
  const [technicianWage, setTechnicianWage] = useState(28.5);

  const metrics = calculateTimeLossMetrics(dailyRequisitions, technicianWage);

  return (
    <section id="roi" className="bg-white rounded-3xl border border-black/[0.06] shadow-sm p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1d1d1f]">
            Time-Loss Reduction & ROI
          </h3>
          <p className="text-xs sm:text-sm text-[#86868b] mt-1">
            Industrial Engineering comparative analytics: Traditional Tool Crib vs E-LOCK Smart Locker.
          </p>
        </div>

        <span className="self-start sm:self-auto text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80">
          -{metrics.percentageTimeReduction}% Time Waste Eliminated
        </span>
      </div>

      {/* 4 Apple Keynote Big Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-[#f5f5f7] border border-black/[0.04]">
          <div className="flex items-center justify-between text-xs text-[#86868b] mb-2 font-medium">
            <span>Retrieval Time</span>
            <Clock className="w-4 h-4 text-slate-500" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              {metrics.elockMinutesPerReq}
            </span>
            <span className="text-xs text-slate-500 font-medium">min/req</span>
          </div>
          <p className="text-xs text-[#86868b] mt-1.5">
            vs <span className="line-through text-slate-400">14.5 min</span> traditional
          </p>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-[#f5f5f7] border border-black/[0.04]">
          <div className="flex items-center justify-between text-xs text-[#86868b] mb-2 font-medium">
            <span>Daily Hours Saved</span>
            <Zap className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-emerald-600">
              {metrics.dailyHoursSaved}
            </span>
            <span className="text-xs text-slate-500 font-medium">hrs/day</span>
          </div>
          <p className="text-xs text-[#86868b] mt-1.5">Reclaimed for active assembly</p>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-[#f5f5f7] border border-black/[0.04]">
          <div className="flex items-center justify-between text-xs text-[#86868b] mb-2 font-medium">
            <span>Annual Projected ROI</span>
            <DollarSign className="w-4 h-4 text-slate-700" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              ${metrics.annualSavingsUsd.toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-[#86868b] mt-1.5">Productivity wage recovery</p>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-[#f5f5f7] border border-black/[0.04]">
          <div className="flex items-center justify-between text-xs text-[#86868b] mb-2 font-medium">
            <span>Tool Loss Rate</span>
            <ShieldCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              {metrics.lostToolsPerYearAfter}
            </span>
            <span className="text-xs text-slate-500 font-medium">tools/yr</span>
          </div>
          <p className="text-xs text-emerald-600 font-medium mt-1.5">
            Down from <span className="line-through text-slate-400">{metrics.lostToolsPerYearBefore} tools/yr</span>
          </p>
        </div>
      </div>

      {/* Visual Workflow Comparison: Traditional vs E-LOCK */}
      <div className="p-5 rounded-2xl bg-[#fafafc] border border-black/[0.06] mb-8">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
          Step-by-Step Retrieval Lifecycle Comparison
        </h4>

        {/* Traditional Row */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-700">Traditional Tool Crib Counter</span>
            <span className="text-slate-500 font-mono">14.5 minutes total</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-200/70 border border-slate-300 text-slate-700">
              1. Walk to Crib (4.2m)
            </div>
            <div className="p-2.5 rounded-xl bg-slate-200/70 border border-slate-300 text-slate-700">
              2. Attendant Queue (3.8m)
            </div>
            <div className="p-2.5 rounded-xl bg-slate-200/70 border border-slate-300 text-slate-700">
              3. Paper Log Signing (3.5m)
            </div>
            <div className="p-2.5 rounded-xl bg-slate-200/70 border border-slate-300 text-slate-700">
              4. Return Walk (3.0m)
            </div>
          </div>
        </div>

        {/* E-LOCK Row */}
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-black">E-LOCK Smart Locker System</span>
            <span className="font-bold text-emerald-600">1.6 minutes total (-89%)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-white border border-black/[0.08] text-slate-900 shadow-2xs font-medium">
              1. Optimized Route (0.6m)
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-black/[0.08] text-slate-900 shadow-2xs font-medium">
              2. RFID Tap (0.1m)
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-black/[0.08] text-slate-900 shadow-2xs font-medium">
              3. Auto-Lit Door (0.2m)
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-black/[0.08] text-slate-900 shadow-2xs font-medium">
              4. Load Cell Verify (0.7m)
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Simulation Sliders */}
      <div className="bg-[#f5f5f7] p-5 rounded-2xl border border-black/[0.04]">
        <div className="flex items-center justify-between mb-4">
          <span className="font-bold text-xs text-slate-900 flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-slate-600" />
            Interactive Simulation Parameters
          </span>
          <span className="text-[11px] text-[#86868b]">Live Recalculation</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          {/* Daily Requisitions Slider */}
          <div>
            <div className="flex justify-between text-slate-700 mb-2">
              <span>Daily Tool Requisitions:</span>
              <span className="font-bold text-black">{dailyRequisitions} reqs/day</span>
            </div>
            <input
              type="range"
              min="10"
              max="120"
              value={dailyRequisitions}
              onChange={(e) => setDailyRequisitions(Number(e.target.value))}
              className="w-full accent-black h-2 bg-slate-300 rounded-lg cursor-pointer"
            />
          </div>

          {/* Technician Wage Slider */}
          <div>
            <div className="flex justify-between text-slate-700 mb-2">
              <span>Technician Hourly Labor Cost:</span>
              <span className="font-bold text-black">${technicianWage.toFixed(2)}/hr</span>
            </div>
            <input
              type="range"
              min="15"
              max="75"
              step="0.5"
              value={technicianWage}
              onChange={(e) => setTechnicianWage(Number(e.target.value))}
              className="w-full accent-black h-2 bg-slate-300 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
