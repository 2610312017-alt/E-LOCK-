import React, { useState } from 'react';
import {
  BookOpen,
  X,
  Cpu,
  Sparkles,
  Scale,
} from 'lucide-react';

interface AcademicEngineeringModalProps {
  onClose: () => void;
}

export const AcademicEngineeringModal: React.FC<AcademicEngineeringModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'ALGORITHMS' | 'MATRIX' | 'FORMULAS'>('OVERVIEW');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white border border-black/[0.08] p-6 sm:p-8 shadow-2xl text-slate-900 max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#f5f5f7] border border-black/[0.06] flex items-center justify-center text-slate-800">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#86868b] font-medium block">
                ACADEMIC COURSEWORK SPECIFICATION
              </span>
              <h3 className="text-xl font-bold tracking-tight text-[#1d1d1f] mt-0.5">
                Logika Pemrograman & Industrial Systems
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f5f5f7] hover:bg-slate-200 text-slate-500 hover:text-black flex items-center justify-center transition-colors"
            title="Close"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation in Apple pill style */}
        <div className="flex items-center gap-2 border-b border-black/[0.06] pb-3 mb-4 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('OVERVIEW')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeTab === 'OVERVIEW'
                ? 'bg-black text-white'
                : 'text-slate-600 hover:text-black bg-[#f5f5f7]'
            }`}
          >
            1. Overview
          </button>
          <button
            onClick={() => setActiveTab('ALGORITHMS')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeTab === 'ALGORITHMS'
                ? 'bg-black text-white'
                : 'text-slate-600 hover:text-black bg-[#f5f5f7]'
            }`}
          >
            2. Logic & Pseudocode
          </button>
          <button
            onClick={() => setActiveTab('MATRIX')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeTab === 'MATRIX'
                ? 'bg-black text-white'
                : 'text-slate-600 hover:text-black bg-[#f5f5f7]'
            }`}
          >
            3. 6 Inputs x 6 Outputs
          </button>
          <button
            onClick={() => setActiveTab('FORMULAS')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeTab === 'FORMULAS'
                ? 'bg-black text-white'
                : 'text-slate-600 hover:text-black bg-[#f5f5f7]'
            }`}
          >
            4. Formulations
          </button>
        </div>

        {/* Tab Body */}
        <div className="overflow-y-auto pr-2 space-y-4 text-xs text-slate-700 leading-relaxed">
          {activeTab === 'OVERVIEW' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-[#fafafc] border border-black/[0.06]">
                <h4 className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-slate-700" />
                  Industrial Engineering Problem Statement
                </h4>
                <p className="text-slate-600">
                  Technicians lose an average of <strong>14.5 minutes per tool requisition</strong> walking to traditional tool cribs, waiting for attendants, and filling paper manifests. Furthermore, misplaced tools cause assembly downtime and costly calibration loss.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-[#fafafc] border border-black/[0.06]">
                  <h5 className="font-semibold text-xs text-slate-900 mb-1">E-LOCK Solution</h5>
                  <p className="text-[11px] text-slate-500">
                    Decentralized smart locker hub using RFID badge authentication, strain-gauge load cell return validation, and ergonomic slot placement to reduce retrieval time down to 1.6 minutes.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#fafafc] border border-black/[0.06]">
                  <h5 className="font-semibold text-xs text-slate-900 mb-1">Logika Pemrograman</h5>
                  <p className="text-[11px] text-slate-500">
                    Combines finite state machines, multi-condition tolerance branches, Pareto array evaluations, and 2D spatial coordinate routing algorithms.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ALGORITHMS' && (
            <div className="space-y-4 font-mono text-[11px]">
              <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/[0.06]">
                <div className="flex items-center justify-between text-slate-900 font-bold mb-2">
                  <span>Algorithm 1: Load Cell Tolerance Verification</span>
                  <Scale className="w-3.5 h-3.5" />
                </div>
                <pre className="bg-white p-3 rounded-xl border border-black/[0.06] text-slate-800 overflow-x-auto text-[11px]">
{`function verifyLoadCell(measured, nominal, tolerance):
    delta = measured - nominal
    if measured < nominal * 0.1:
        return { status: "EMPTY", valid: false }
    if measured < nominal - tolerance:
        return { status: "UNDERWEIGHT", valid: false, deficit: abs(delta) }
    if measured > nominal + tolerance:
        return { status: "OVERWEIGHT", valid: false, excess: delta }
    return { status: "PASS", valid: true, delta: delta }`}
                </pre>
              </div>

              <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/[0.06]">
                <div className="flex items-center justify-between text-slate-900 font-bold mb-2">
                  <span>Algorithm 2: Pareto 80/20 & Golden Zone Tiering</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <pre className="bg-white p-3 rounded-xl border border-black/[0.06] text-slate-800 overflow-x-auto text-[11px]">
{`function evaluateErgonomics(tool):
    isGolden = (tool.slotRow == 2 || tool.slotRow == 3)
    isHighDemand = (tool.loanFrequencyMonthly >= 25)
    
    if isHighDemand and isGolden:
        return { recommended: true, score: 10 }
    if isHighDemand and not isGolden:
        return { recommended: false, score: 4, advice: "Relocate to Row 2/3" }
    return { recommended: true, score: 8 }`}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'MATRIX' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[11px] border border-black/[0.06] rounded-2xl overflow-hidden">
                <thead className="bg-[#f5f5f7] text-slate-900">
                  <tr>
                    <th className="p-3 border-b border-black/[0.06]">The 6 Inputs (Data Parameters)</th>
                    <th className="p-3 border-b border-black/[0.06]">The 6 Outputs (Visual Results)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06] text-slate-600 text-[11px]">
                  <tr>
                    <td className="p-3">1. Employee Access ID (RFID / Barcode)</td>
                    <td className="p-3 font-semibold text-slate-900">1. Interactive 3D Digital Locker Grid</td>
                  </tr>
                  <tr>
                    <td className="p-3">2. Tool Requisition Request (Web/App)</td>
                    <td className="p-3 font-semibold text-slate-900">2. Optimal Walking Route Map (2D)</td>
                  </tr>
                  <tr>
                    <td className="p-3">3. Weight Sensors & Presence Data</td>
                    <td className="p-3 font-semibold text-slate-900">3. Usage Bar Chart (Ergonomics)</td>
                  </tr>
                  <tr>
                    <td className="p-3">4. Workstation Coordinates</td>
                    <td className="p-3 font-semibold text-slate-900">4. Status Indicator Badges (Blue/Green/Red)</td>
                  </tr>
                  <tr>
                    <td className="p-3">5. Historical Usage Logs</td>
                    <td className="p-3 font-semibold text-slate-900">5. Overdue Reminder Pop-Up</td>
                  </tr>
                  <tr>
                    <td className="p-3">6. Tool Maintenance Status</td>
                    <td className="p-3 font-semibold text-slate-900">6. Time-Loss Reduction Dashboard</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'FORMULAS' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/[0.06]">
                <h5 className="font-bold text-slate-900 mb-2">1. Distance & Walking Time Formulations:</h5>
                <p className="text-slate-700 mb-1">
                  <strong>Euclidean Distance:</strong>{' '}
                  <span className="text-blue-700">d = √((x₂ - x₁)² + (y₂ - y₁)²)</span>
                </p>
                <p className="text-slate-700 mb-1">
                  <strong>Manhattan Distance:</strong>{' '}
                  <span className="text-blue-700">d_manhattan = |x₂ - x₁| + |y₂ - y₁|</span>
                </p>
                <p className="text-slate-700">
                  <strong>Walking Time:</strong>{' '}
                  <span className="text-emerald-700">t = d / v_walk</span> (where v_walk = 1.25 m/s)
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/[0.06]">
                <h5 className="font-bold text-slate-900 mb-2">2. Productivity & ROI Equations:</h5>
                <p className="text-slate-700 mb-1">
                  <strong>Time Saved per Requisition:</strong>{' '}
                  <span className="text-emerald-700">Δt = 14.5m - 1.6m = 12.9 mins saved</span>
                </p>
                <p className="text-slate-700">
                  <strong>Annual Cost Savings:</strong>{' '}
                  <span className="text-emerald-700">ROI = (Daily_reqs × Δt / 60) × 22 × 12 × Wage_rate</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-black/[0.06] shrink-0 text-xs">
          <span className="text-slate-500 font-mono">Coursework Logic Verified</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-black hover:bg-slate-800 text-white font-medium transition-colors"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
};
