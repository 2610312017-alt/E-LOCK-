import React from 'react';
import {
  AlertTriangle,
  Clock,
  RotateCcw,
  X,
  Volume2,
  Send,
} from 'lucide-react';
import { ToolItem } from '../types/locker';
import { checkOverdueStatus } from '../logic/lockerEngine';
import { soundManager } from '../utils/audio';

interface OverdueModalProps {
  overdueTools: ToolItem[];
  onClose: () => void;
  onInitiateReturn: (tool: ToolItem) => void;
  onSendCommsReminder: (tool: ToolItem) => void;
}

export const OverdueModal: React.FC<OverdueModalProps> = ({
  overdueTools,
  onClose,
  onInitiateReturn,
  onSendCommsReminder,
}) => {
  if (overdueTools.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-black/[0.08] p-6 sm:p-8 shadow-2xl text-slate-900 overflow-hidden">
        {/* Top Accent */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-red-600 font-semibold block">
                OUTPUT 5 • OVERDUE ALERT
              </span>
              <h3 className="text-xl font-bold tracking-tight text-[#1d1d1f] mt-0.5">
                Shift Overdue Tools ({overdueTools.length})
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f5f5f7] hover:bg-slate-200 text-slate-500 hover:text-black flex items-center justify-center transition-colors"
            title="Dismiss Pop-up"
            aria-label="Dismiss Pop-up"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-600 mb-5 bg-[#f5f5f7] p-3 rounded-2xl border border-black/[0.04]">
          The following tool(s) were not returned to their smart locker bay prior to the scheduled shift deadline. Automated disciplinary log entry recorded.
        </p>

        {/* Overdue Tools List */}
        <div className="space-y-3 max-h-[310px] overflow-y-auto pr-1">
          {overdueTools.map((tool) => {
            const overdueInfo = checkOverdueStatus(tool, new Date());
            const borrower = tool.lastBorrower;

            return (
              <div
                key={tool.id}
                className="p-4 rounded-2xl bg-[#fafafc] border border-red-200/90 flex flex-col gap-3 shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900 px-2 py-0.5 rounded-full bg-white border border-black/[0.08]">
                        {tool.slotId}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900">{tool.name}</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                      Model: {tool.model} • SN: {tool.serialNumber}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-red-600 px-2.5 py-1 rounded-full bg-red-50 border border-red-200">
                    <Clock className="w-3 h-3" />
                    +{overdueInfo.overdueMinutes}m Late
                  </span>
                </div>

                {borrower && (
                  <div className="flex items-center justify-between text-xs bg-white p-3 rounded-xl border border-black/[0.06]">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={borrower.avatarUrl}
                        alt={borrower.name}
                        className="w-7 h-7 rounded-full object-cover border border-black/[0.08]"
                      />
                      <div>
                        <span className="text-slate-900 font-semibold block">{borrower.name}</span>
                        <span className="text-[10px] text-slate-500">{borrower.role}</span>
                      </div>
                    </div>

                    <div className="text-right text-[10px] text-slate-500">
                      <span>{borrower.workOrder}</span>
                      <span className="block text-red-600 font-medium">Due: {new Date(borrower.dueAt).toLocaleTimeString()}</span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => {
                      soundManager.playAlertBuzz();
                      onSendCommsReminder(tool);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-black/[0.08] transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Pager Alert</span>
                  </button>

                  <button
                    onClick={() => onInitiateReturn(tool)}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-white bg-black hover:bg-slate-800 shadow-sm transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Return Now</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-black/[0.06] text-xs">
          <button
            onClick={() => soundManager.playAlertBuzz()}
            className="flex items-center gap-1.5 text-red-600 hover:text-red-700 font-medium"
          >
            <Volume2 className="w-4 h-4" />
            <span>Sound Alarm</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#f5f5f7] hover:bg-slate-200 text-slate-900 font-medium transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
