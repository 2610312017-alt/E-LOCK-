import React from 'react';
import {
  ArrowUpRight,
  Shield,
  Layers,
  Zap,
  Box,
  Lock,
  Cpu,
  Settings,
  Scale,
  Sparkles,
} from 'lucide-react';

interface AppleBentoDetailsProps {
  onCardClick: (sectionId: string) => void;
}

export const AppleBentoDetails: React.FC<AppleBentoDetailsProps> = ({ onCardClick }) => {
  return (
    <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Big Apple Headline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1d1d1f] leading-none">
            Innovation.
            <br />
            In every detail.
          </h2>
        </div>
        <div className="flex items-center gap-3 text-slate-500 max-w-md">
          <p className="text-xs sm:text-sm text-slate-500 leading-normal">
            Integrated load cells, ergonomic golden zone slot placement, and zero-latency walking routes.
          </p>
          <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-slate-700 shrink-0">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 3 High-Contrast Bento Cards: Dark / Light / Dark */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {/* Card 1: Dark Obsidian Black Card */}
        <div
          onClick={() => onCardClick('lockers')}
          className="rounded-3xl bg-[#000000] text-white p-6 sm:p-7 flex flex-col justify-between aspect-[4/5] cursor-pointer hover:scale-[1.01] transition-transform shadow-xl relative overflow-hidden group"
        >
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight mb-1">
              A design that
              <br />
              feels just right.
            </h3>
            <p className="text-xs text-white/60">
              Premium materials.
              <br />
              Brushed aluminum & titanium slots.
            </p>
          </div>

          {/* Minimalist Graphic inside Card from user-provided image */}
          <div className="my-auto py-2 flex items-center justify-center">
            <div className="relative w-44 h-28 rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-slate-900 group-hover:border-cyan-400/50 transition-colors">
              <img
                src="/assets/aistudio/image_1c25e20e.png"
                alt="Titanium Craftsmanship"
                className="w-full h-full object-cover object-[15%_80%] group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[9px] font-mono text-cyan-300 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-white/10">
                <span>BAY L-09</span>
                <span className="text-emerald-400">TITANIUM READY</span>
              </div>
            </div>
          </div>

          <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white/80 self-start">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 2: Clean Ceramic White Card */}
        <div
          onClick={() => onCardClick('lockers')}
          className="rounded-3xl bg-white border border-black/[0.06] text-slate-900 p-6 sm:p-7 flex flex-col justify-between aspect-[4/5] cursor-pointer hover:scale-[1.01] transition-transform shadow-sm relative overflow-hidden group"
        >
          <div>
            <h3 className="text-lg font-bold text-slate-950 tracking-tight mb-1">
              Pro load cell system.
            </h3>
            <p className="text-xs text-slate-500">
              Capture every gram
              <br />
              in incredible sub-tolerance detail.
            </p>
          </div>

          {/* Minimalist Optical / Load Cell Sensor Graphic from user asset */}
          <div className="my-auto py-2 flex items-center justify-center">
            <div className="relative w-44 h-28 rounded-2xl overflow-hidden border border-black/10 shadow-md bg-white">
              <img
                src="/assets/aistudio/image_1c25e20e.png"
                alt="Pro Optical & Load Cell Sensor"
                className="w-full h-full object-cover object-[48%_81%] group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[9px] font-mono text-slate-900 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-black/10">
                <span className="font-bold">±5g ACCURACY</span>
                <span className="text-slate-500">DYNAMIC SCALE</span>
              </div>
            </div>
          </div>

          <div className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center text-slate-700 self-start">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 3: Dark Obsidian Black Card with Glowing Battery / Status */}
        <div
          onClick={() => onCardClick('roi')}
          className="rounded-3xl bg-[#000000] text-white p-6 sm:p-7 flex flex-col justify-between aspect-[4/5] cursor-pointer hover:scale-[1.01] transition-transform shadow-xl relative overflow-hidden group"
        >
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight mb-1">
              Zero lost tools.
            </h3>
            <p className="text-xs text-white/60">
              More uptime
              <br />
              for what matters most.
            </p>
          </div>

          {/* Glowing Battery / Telemetry Graphic from user asset */}
          <div className="my-auto py-2 flex items-center justify-center">
            <div className="relative w-44 h-28 rounded-2xl overflow-hidden border border-amber-400/30 shadow-[0_0_25px_rgba(251,191,36,0.25)] bg-slate-950">
              <img
                src="/assets/aistudio/image_1c25e20e.png"
                alt="All-day Battery Telemetry"
                className="w-full h-full object-cover object-[79%_81%] group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[9px] font-mono text-amber-300 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-amber-400/20">
                <span>99.8% UPTIME</span>
                <span className="text-emerald-400">SHIFT COMPLIANT</span>
              </div>
            </div>
          </div>

          <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white/80 self-start">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Feature Strip (Exact replica of the bottom strip in the reference image) */}
      <div className="rounded-2xl bg-white border border-black/[0.06] shadow-sm p-4 sm:p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {/* Feature 1 */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#f5f5f7] flex items-center justify-center text-slate-700 shrink-0">
              <Box className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900 leading-tight">Fast and efficient</p>
              <p className="text-[11px] text-slate-500 leading-tight">1.6 min retrieval</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#f5f5f7] flex items-center justify-center text-slate-700 shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900 leading-tight">Advanced access</p>
              <p className="text-[11px] text-slate-500 leading-tight">RFID security lock</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#f5f5f7] flex items-center justify-center text-slate-700 shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900 leading-tight">Real-time telemetry</p>
              <p className="text-[11px] text-slate-500 leading-tight">Integrated strain bridge</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#f5f5f7] flex items-center justify-center text-slate-700 shrink-0">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900 leading-tight">Built to last</p>
              <p className="text-[11px] text-slate-500 leading-tight">Every shift. Every day.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
