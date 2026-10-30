import React, { useState } from 'react';
import { Radio, Barcode, X, ArrowRight } from 'lucide-react';
import { Employee } from '../types/locker';
import { soundManager } from '../utils/audio';

interface RfidScanModalProps {
  currentEmployee: Employee;
  allEmployees: Employee[];
  onSelectEmployee: (employee: Employee) => void;
  onClose: () => void;
}

export const RfidScanModal: React.FC<RfidScanModalProps> = ({
  currentEmployee,
  allEmployees,
  onSelectEmployee,
  onClose,
}) => {
  const [manualCode, setManualCode] = useState('');
  const [scanSuccessAnim, setScanSuccessAnim] = useState<string | null>(null);

  const handleSelect = (emp: Employee) => {
    soundManager.playRfidBeep();
    setScanSuccessAnim(emp.id);
    setTimeout(() => {
      onSelectEmployee(emp);
      onClose();
    }, 450);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = manualCode.trim().toLowerCase();
    const matched = allEmployees.find(
      (emp) =>
        emp.rfidCode.toLowerCase().includes(query) ||
        emp.barcode.toLowerCase().includes(query) ||
        emp.id.toLowerCase().includes(query)
    );
    if (matched) {
      handleSelect(matched);
    } else {
      soundManager.playAlertBuzz();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-black/[0.08] p-6 sm:p-8 shadow-2xl text-slate-900 overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#f5f5f7] border border-black/[0.06] flex items-center justify-center text-slate-800">
              <Radio className="w-5 h-5 text-black" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#86868b] font-medium block">
                INPUT 1 • RFID / NFC ACCESS
              </span>
              <h3 className="text-xl font-bold tracking-tight text-[#1d1d1f] mt-0.5">
                Operator Identity
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

        {/* Apple Wallet / NFC Tap Box */}
        <div className="relative p-6 rounded-2xl bg-[#fafafc] border border-black/[0.08] flex flex-col items-center justify-center text-center mb-5 group">
          <div className="w-14 h-14 rounded-full bg-white border border-black/[0.08] shadow-sm flex items-center justify-center text-black mb-2 relative">
            <Radio className="w-6 h-6 animate-ping absolute opacity-20" />
            <Radio className="w-6 h-6 relative z-10" />
          </div>
          <p className="text-sm font-semibold text-slate-900">Hold Near Reader</p>
          <p className="text-xs text-slate-500 mt-0.5 font-mono">13.56 MHz NFC / ISO 14443-A</p>
        </div>

        {/* Manual Barcode / RFID Code Input */}
        <form onSubmit={handleManualSubmit} className="mb-5 flex gap-2">
          <div className="relative flex-1">
            <Barcode className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              placeholder="Enter Employee ID (e.g. EMP-8492 or RFID-99A1)..."
              className="w-full bg-[#f5f5f7] border border-black/[0.06] rounded-xl pl-10 pr-3 py-2 text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-black hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <span>Scan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Quick Technician Profiles List */}
        <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
          <span className="text-[11px] font-mono uppercase text-[#86868b] block px-1 font-medium">
            Registered Technicians:
          </span>
          {allEmployees.map((emp) => {
            const isCurrent = emp.id === currentEmployee.id;
            const isScanning = scanSuccessAnim === emp.id;

            return (
              <div
                key={emp.id}
                onClick={() => handleSelect(emp)}
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  isScanning
                    ? 'bg-emerald-50 border-emerald-400 scale-[1.02]'
                    : isCurrent
                    ? 'bg-[#f5f5f7] border-black shadow-xs'
                    : 'bg-white border-black/[0.06] hover:bg-[#fafafc]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={emp.avatarUrl}
                    alt={emp.name}
                    className="w-10 h-10 rounded-full object-cover border border-black/[0.08]"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-xs text-slate-900">{emp.name}</span>
                      {isCurrent && (
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-black text-white">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500">{emp.role}</p>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                      {emp.rfidCode} • {emp.department}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono text-slate-500 px-2 py-1 rounded-lg bg-[#f5f5f7] border border-black/[0.04]">
                  {emp.id}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
