import React from 'react';
import { History } from 'lucide-react';
import { ActivityLog } from '../types/locker';

interface ActivityLogsTableProps {
  logs: ActivityLog[];
}

export const ActivityLogsTable: React.FC<ActivityLogsTableProps> = ({ logs }) => {
  return (
    <section id="logs" className="bg-white rounded-3xl border border-black/[0.06] shadow-sm p-6 sm:p-8">
      <div className="flex items-center justify-between gap-2 mb-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#86868b] font-medium block">
            AUDIT TRAIL • TELEMETRY
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f] mt-0.5">
            Activity & Sensor Event Ledger
          </h3>
          <p className="text-xs text-[#86868b] mt-0.5">
            Real-time event recording: RFID checkouts, load cell return tests, and alarms.
          </p>
        </div>
        <span className="text-xs text-slate-500 font-mono bg-[#f5f5f7] px-3 py-1 rounded-full border border-black/[0.04]">
          Live Stream
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border border-black/[0.06] rounded-2xl overflow-hidden">
          <thead className="bg-[#f5f5f7] text-slate-600 text-[11px] uppercase tracking-wider">
            <tr>
              <th className="p-3 font-medium">Time</th>
              <th className="p-3 font-medium">Event</th>
              <th className="p-3 font-medium">Slot / Tool</th>
              <th className="p-3 font-medium">Technician</th>
              <th className="p-3 font-medium">Telemetry Details</th>
              <th className="p-3 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.04] text-slate-800">
            {logs.map((log) => {
              let badgeColor = 'bg-blue-50 text-[#0071e3] border-blue-200';
              if (log.status === 'SUCCESS') {
                badgeColor = 'bg-emerald-50 text-[#34c759] border-emerald-200';
              } else if (log.status === 'ALERT') {
                badgeColor = 'bg-red-50 text-[#ff3b30] border-red-200';
              } else if (log.status === 'WARNING') {
                badgeColor = 'bg-amber-50 text-[#ff9f0a] border-amber-200';
              }

              return (
                <tr key={log.id} className="hover:bg-[#fafafc] transition-colors">
                  <td className="p-3 font-mono text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                  <td className="p-3 font-semibold text-slate-900">{log.type}</td>
                  <td className="p-3">
                    <span className="font-mono font-bold text-black mr-2 bg-[#f5f5f7] px-2 py-0.5 rounded-md border border-black/[0.04]">
                      {log.slotId}
                    </span>
                    <span className="text-slate-600 text-xs truncate">{log.toolName}</span>
                  </td>
                  <td className="p-3 font-medium text-slate-900 whitespace-nowrap">{log.employeeName}</td>
                  <td className="p-3 text-slate-500 max-w-xs truncate">{log.details}</td>
                  <td className="p-3 text-right whitespace-nowrap">
                    <span
                      className={`inline-block text-[10px] font-semibold px-2.5 py-0.5 rounded-full border uppercase ${badgeColor}`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
