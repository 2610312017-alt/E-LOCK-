import React, { useState } from 'react';
import {
  Scale,
  CheckCircle2,
  AlertTriangle,
  X,
  Sliders,
  Check,
} from 'lucide-react';
import { ToolItem, Employee } from '../types/locker';
import { verifyLoadCellWeight } from '../logic/lockerEngine';
import { soundManager } from '../utils/audio';

interface LoadCellModalProps {
  tool: ToolItem;
  currentEmployee: Employee;
  onClose: () => void;
  onConfirmReturn: (toolId: string, measuredWeight: number) => void;
}

export const LoadCellModal: React.FC<LoadCellModalProps> = ({
  tool,
  currentEmployee,
  onClose,
  onConfirmReturn,
}) => {
  const [measuredWeight, setMeasuredWeight] = useState<number>(tool.nominalWeightGrams);
  const [isStabilizing, setIsStabilizing] = useState<boolean>(false);

  const verification = verifyLoadCellWeight(
    measuredWeight,
    tool.nominalWeightGrams,
    tool.weightToleranceGrams
  );

  const handleSimulateWeight = (weight: number) => {
    setIsStabilizing(true);
    setMeasuredWeight(weight);
    setTimeout(() => {
      setIsStabilizing(false);
      if (
        verifyLoadCellWeight(weight, tool.nominalWeightGrams, tool.weightToleranceGrams).isValid
      ) {
        soundManager.playLoadCellPass();
      } else {
        soundManager.playAlertBuzz();
      }
    }, 400);
  };

  const handleTareZero = () => {
    soundManager.playRfidBeep();
    handleSimulateWeight(0);
  };

  const handleCompleteReturn = () => {
    if (!verification.isValid) {
      soundManager.playAlertBuzz();
      return;
    }
    soundManager.playLockerUnlock();
    onConfirmReturn(tool.id, measuredWeight);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-black/[0.08] p-6 sm:p-8 shadow-2xl text-slate-900 overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#f5f5f7] border border-black/[0.06] flex items-center justify-center text-slate-800">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#86868b] font-medium block">
                INPUT 3 • LOAD CELL TELEMETRY
              </span>
              <h3 className="text-xl font-bold tracking-tight text-[#1d1d1f] mt-0.5">
                Return Tool Verification ({tool.slotId})
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f5f5f7] hover:bg-slate-200 text-slate-500 hover:text-black flex items-center justify-center transition-colors"
            title="Cancel"
            aria-label="Cancel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tool Summary */}
        <div className="p-3.5 rounded-2xl bg-[#f5f5f7] border border-black/[0.04] flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <img
              src={tool.image}
              alt={tool.name}
              className="w-12 h-12 rounded-xl object-contain p-1 bg-white border border-black/[0.06]"
            />
            <div>
              <h4 className="font-semibold text-sm text-slate-900">{tool.name}</h4>
              <p className="text-xs text-slate-500">
                Nominal: <strong className="text-black">{tool.nominalWeightGrams}g</strong> (±
                {tool.weightToleranceGrams}g)
              </p>
            </div>
          </div>

          <span className="text-xs font-mono font-medium text-slate-600 bg-white px-3 py-1 rounded-full border border-black/[0.06]">
            Bay {tool.slotId}
          </span>
        </div>

        {/* Digital Scale Readout (Apple Measure style) */}
        <div className="p-6 rounded-2xl bg-[#fafafc] border border-black/[0.08] mb-5 text-center shadow-inner">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-2">
            <span>STRAIN-GAUGE BRIDGE</span>
            <span>{isStabilizing ? 'STABILIZING...' : 'SENSOR LOCKED'}</span>
          </div>

          {/* Large Clean Weight Numbers */}
          <div className="py-2">
            <span className="font-sans font-extrabold text-5xl tracking-tight text-slate-900">
              {isStabilizing ? '---.-' : `${measuredWeight.toFixed(1)} g`}
            </span>
          </div>

          {/* Validation Status Badge */}
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium">
            {verification.isValid ? (
              <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Weight Verified (Delta: {verification.deltaGrams}g)
              </span>
            ) : (
              <span className="text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded-full flex items-center gap-1.5 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" />
                Tolerance Deviation: {verification.status}
              </span>
            )}
          </div>
        </div>

        {/* Message */}
        <p
          className={`text-xs p-3 rounded-xl border mb-5 ${
            verification.isValid
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {verification.message}
        </p>

        {/* Simulation Presets */}
        <div className="mb-5 bg-[#f5f5f7] p-4 rounded-2xl border border-black/[0.04]">
          <div className="flex items-center justify-between text-xs text-slate-700 mb-2.5">
            <span className="font-medium flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-slate-500" />
              Sensor Simulation Scenarios:
            </span>
            <button
              onClick={handleTareZero}
              className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold"
            >
              Tare Zero
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* Scenario 1 */}
            <button
              onClick={() => handleSimulateWeight(tool.nominalWeightGrams)}
              className="p-2 rounded-xl bg-white hover:bg-slate-50 border border-black/[0.06] text-xs text-slate-800 flex flex-col items-center transition-colors shadow-2xs"
            >
              <span className="font-semibold text-emerald-700">Exact Weight</span>
              <span className="text-[10px] text-slate-500">{tool.nominalWeightGrams}g (Pass)</span>
            </button>

            {/* Scenario 2 */}
            <button
              onClick={() =>
                handleSimulateWeight(Math.round(tool.nominalWeightGrams - tool.weightToleranceGrams * 2.5))
              }
              className="p-2 rounded-xl bg-white hover:bg-slate-50 border border-black/[0.06] text-xs text-slate-800 flex flex-col items-center transition-colors shadow-2xs"
            >
              <span className="font-semibold text-amber-700">Missing Part</span>
              <span className="text-[10px] text-slate-500">Deficit</span>
            </button>

            {/* Scenario 3 */}
            <button
              onClick={() =>
                handleSimulateWeight(Math.round(tool.nominalWeightGrams + tool.weightToleranceGrams * 3))
              }
              className="p-2 rounded-xl bg-white hover:bg-slate-50 border border-black/[0.06] text-xs text-slate-800 flex flex-col items-center transition-colors shadow-2xs"
            >
              <span className="font-semibold text-red-700">Foreign Item</span>
              <span className="text-[10px] text-slate-500">Excess</span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-black/[0.06]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full text-xs font-medium text-slate-600 hover:bg-[#f5f5f7] transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleCompleteReturn}
            disabled={!verification.isValid || isStabilizing}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-xs transition-all ${
              verification.isValid && !isStabilizing
                ? 'bg-black hover:bg-slate-800 text-white shadow-sm cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            <span>Confirm Return & Lock Bay {tool.slotId}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
