import React from 'react';
import {
  Box,
  Lock,
  Cpu,
  Settings,
} from 'lucide-react';

interface AppleBentoDetailsProps {
  onCardClick?: (sectionId: string) => void;
}

export const AppleBentoDetails: React.FC<AppleBentoDetailsProps> = () => {
  return (
    <section className="py-8 sm:py-12 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Big Apple Headline */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1d1d1f] leading-none">
          Innovation.
          <br />
          In every detail.
        </h2>
      </div>

      {/* Feature Strip */}
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
