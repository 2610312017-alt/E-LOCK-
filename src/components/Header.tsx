import React from 'react';
import {
  MapPin,
  Clock,
  Volume2,
  VolumeX,
  BookOpen,
  AlertTriangle,
  Grid,
} from 'lucide-react';
import { Employee, Workstation } from '../types/locker';
import { soundManager } from '../utils/audio';

interface HeaderProps {
  currentEmployee: Employee;
  allEmployees: Employee[];
  onSelectEmployee: (emp: Employee) => void;
  activeWorkstation: Workstation;
  allWorkstations: Workstation[];
  onSelectWorkstation: (ws: Workstation) => void;
  onOpenRfidModal: () => void;
  onOpenAcademicModal: () => void;
  hasOverdueAlert: boolean;
  onOpenOverdueModal: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  currentTimeStr: string;
  onAdvanceShiftSimulation: () => void;
  onScrollTo: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentEmployee,
  allEmployees,
  onSelectEmployee,
  activeWorkstation,
  allWorkstations,
  onSelectWorkstation,
  onOpenRfidModal,
  onOpenAcademicModal,
  hasOverdueAlert,
  onOpenOverdueModal,
  isMuted,
  onToggleMute,
  currentTimeStr,
  onAdvanceShiftSimulation,
  onScrollTo,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-black/[0.06] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between text-xs">
        {/* Left: Apple-like Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onScrollTo('hero')}
            className="flex items-center gap-2 text-slate-900 hover:opacity-75 transition-opacity"
          >
            {/* Minimalist E-LOCK Logo */}
            <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white">
              <span className="text-[10px] font-black tracking-tighter">E</span>
            </div>
            <span className="font-semibold text-sm tracking-tight text-black">
              E-LOCK
            </span>
          </button>

          {/* Overdue Alert Pill if active */}
          {hasOverdueAlert && (
            <button
              onClick={onOpenOverdueModal}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-600 border border-red-200/80 font-medium text-[11px] hover:bg-red-100 transition-colors"
            >
              <AlertTriangle className="w-3 h-3 text-red-500 animate-pulse" />
              <span>1 Overdue</span>
            </button>
          )}
        </div>

        {/* Center: Apple-style Minimal Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 font-medium text-slate-500 text-[11px] tracking-wide uppercase">
          <button
            onClick={() => onScrollTo('lockers')}
            className="hover:text-black transition-colors"
          >
            Locker Grid
          </button>
          <button
            onClick={() => onScrollTo('map')}
            className="hover:text-black transition-colors"
          >
            Factory Map
          </button>
          <button
            onClick={() => onScrollTo('analytics')}
            className="hover:text-black transition-colors"
          >
            Analytics
          </button>
          <button
            onClick={() => onScrollTo('roi')}
            className="hover:text-black transition-colors"
          >
            Time-Loss ROI
          </button>
          <button
            onClick={onOpenAcademicModal}
            className="hover:text-black transition-colors flex items-center gap-1 text-slate-800"
          >
            <span>Logic</span>
            <BookOpen className="w-3 h-3" />
          </button>
        </nav>

        {/* Right: Controls & Active Operator */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Workstation Selector */}
          <div className="flex items-center gap-1.5 bg-[#f5f5f7] border border-black/[0.06] rounded-full px-2.5 py-1 text-slate-700">
            <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
            <select
              value={activeWorkstation.id}
              onChange={(e) => {
                const ws = allWorkstations.find((w) => w.id === e.target.value);
                if (ws) onSelectWorkstation(ws);
              }}
              className="bg-transparent text-slate-900 font-medium text-[11px] focus:outline-none cursor-pointer pr-1"
            >
              {allWorkstations.map((ws) => (
                <option key={ws.id} value={ws.id} className="text-slate-900 bg-white">
                  {ws.zone}: {ws.name}
                </option>
              ))}
            </select>
          </div>

          {/* Shift Time Clock & +30m */}
          <div className="hidden sm:flex items-center gap-1.5 bg-[#f5f5f7] border border-black/[0.06] rounded-full px-2.5 py-1 text-[11px] text-slate-700">
            <Clock className="w-3 h-3 text-slate-500 shrink-0" />
            <span className="font-mono font-medium">{currentTimeStr}</span>
            <button
              onClick={() => {
                soundManager.playRfidBeep();
                onAdvanceShiftSimulation();
              }}
              className="text-[10px] text-slate-500 hover:text-black font-semibold ml-1 pl-1 border-l border-slate-300"
              title="Advance time +30m"
            >
              +30m
            </button>
          </div>

          {/* Audio Mute/Unmute */}
          <button
            onClick={onToggleMute}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-[#f5f5f7] hover:bg-slate-200 border border-black/[0.06] text-slate-600 transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Active Employee Pill */}
          <button
            onClick={onOpenRfidModal}
            className="flex items-center gap-2 bg-[#f5f5f7] hover:bg-slate-200 border border-black/[0.06] rounded-full py-1 px-1.5 pr-2.5 transition-colors group"
            title="Switch Operator"
          >
            <img
              src={currentEmployee.avatarUrl}
              alt={currentEmployee.name}
              className="w-5 h-5 rounded-full object-cover"
            />
            <span className="text-[11px] font-medium text-slate-900 group-hover:text-black">
              {currentEmployee.name.split(' ')[0]}
            </span>
            {/* 4-dot menu icon from the reference image */}
            <div className="grid grid-cols-2 gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
              <span className="w-1 h-1 rounded-full bg-slate-900" />
              <span className="w-1 h-1 rounded-full bg-slate-900" />
              <span className="w-1 h-1 rounded-full bg-slate-900" />
              <span className="w-1 h-1 rounded-full bg-slate-900" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
