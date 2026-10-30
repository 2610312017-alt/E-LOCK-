import React from 'react';
import { Plus, Feather } from 'lucide-react';

interface AppleHeroSectionProps {
  onExploreClick: () => void;
  onWhyElockClick: () => void;
  totalTools: number;
  availableTools: number;
}

export const AppleHeroSection: React.FC<AppleHeroSectionProps> = ({
  onExploreClick,
  onWhyElockClick,
  totalTools,
  availableTools,
}) => {
  return (
    <section id="hero" className="pt-8 sm:pt-14 pb-12 sm:pb-16 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Grand Minimalist Header (like "iPhone / Built for everything you love.") */}
      <div className="text-center mb-10 sm:mb-14">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-[#1d1d1f]">
          E-LOCK
        </h1>
        <p className="mt-2.5 text-base sm:text-xl font-normal text-[#86868b] tracking-normal">
          Built for everything you engineer.
        </p>
      </div>

      {/* Hero Bento Arrangement: Center Showcase & Right Bento Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center max-w-4xl mx-auto">
        {/* Center: Hero Product Device Feature Display */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl bg-gradient-to-b from-white via-[#fafafc] to-[#f0f0f2] border border-black/[0.08] shadow-xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
            {/* Subtle Metallic Specular Lighting */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-slate-200/50 rounded-full blur-3xl pointer-events-none" />

            {/* Top Device Specs */}
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-mono text-[11px] tracking-wide text-slate-400">SERIES 400 INDUSTRIAL</span>
              <span className="font-medium text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                {availableTools} / {totalTools} Available
              </span>
            </div>

            {/* Center Product Illustration / Hardware Showcase from user asset */}
            <div className="my-auto py-2 text-center flex flex-col items-center">
              <div className="relative mx-auto w-56 sm:w-64 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-black/[0.08] bg-[#f5f5f7] group">
                <img
                  src="/assets/aistudio/image_1c25e20e.png"
                  alt="E-LOCK Industrial Architecture"
                  className="w-full h-full object-cover object-[50%_25%] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Glass Status Badge */}
                <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-between text-[10px] font-mono text-white">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    RFID & LOAD CELLS ONLINE
                  </span>
                  <span className="text-white/70">16 BAYS</span>
                </div>
              </div>
            </div>

            {/* Bottom Tagline */}
            <div className="text-center pt-2">
              <p className="text-xs font-semibold text-slate-900">
                16 Auto-Lit Modular Slots
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Precision strain gauge & proximity mapping built into every tier.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column Bento Cards */}
        <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5">
          {/* Environmental / Load Cell Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-black/[0.06] shadow-sm">
            <div className="w-6 h-6 text-slate-600 mb-2">
              <Feather className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-slate-900 leading-tight">
              Strain-gauge
            </p>
            <p className="text-xs font-semibold text-slate-900 leading-tight mb-1.5">
              precision.
            </p>
            <p className="text-[11px] text-slate-500 leading-normal">
              Continuous weight sensing with sub-gram tolerance thresholds.
            </p>
          </div>

          {/* 100% Traceability Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-black/[0.06] shadow-sm">
            <p className="text-2xl font-bold tracking-tight text-slate-900 mb-1">
              100%
            </p>
            <p className="text-xs font-semibold text-slate-900 leading-tight mb-1">
              Traceability.
            </p>
            <p className="text-[11px] text-slate-500 leading-normal">
              Every checkout, return, and calibration audit logged in real time.
            </p>
          </div>

          {/* Circular Button: Why E-LOCK */}
          <div
            onClick={onWhyElockClick}
            className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-sm flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors group"
          >
            <div className="w-11 h-11 rounded-full border border-black/15 flex items-center justify-center text-slate-700 group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all mb-2">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-900">
              Why E-LOCK
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">
              View Academic Logic & Formulas
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
