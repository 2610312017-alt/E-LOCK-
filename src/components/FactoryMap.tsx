import React from 'react';
import { Navigation, Footprints, Clock, CornerDownRight, ArrowUpRight } from 'lucide-react';
import { Workstation, ToolItem } from '../types/locker';
import {
  calculateEuclideanDistance,
  calculateManhattanDistance,
  estimateWalkTimeSeconds,
  LOCKER_COORDINATES,
} from '../logic/lockerEngine';

interface FactoryMapProps {
  workstations: Workstation[];
  activeWorkstation: Workstation;
  onSelectWorkstation: (ws: Workstation) => void;
  selectedTool: ToolItem | null;
}

export const FactoryMap: React.FC<FactoryMapProps> = ({
  workstations,
  activeWorkstation,
  onSelectWorkstation,
  selectedTool,
}) => {
  const euclidean = calculateEuclideanDistance({ x: activeWorkstation.x, y: activeWorkstation.y });
  const manhattan = calculateManhattanDistance({ x: activeWorkstation.x, y: activeWorkstation.y });
  const walkTimeSec = estimateWalkTimeSeconds(euclidean);

  const lockerX = LOCKER_COORDINATES.x;
  const lockerY = LOCKER_COORDINATES.y;
  const techX = activeWorkstation.x;
  const techY = activeWorkstation.y;

  const cornerX = lockerX;
  const cornerY = techY;

  return (
    <section id="map" className="bg-white rounded-3xl border border-black/[0.06] shadow-sm p-6 sm:p-8 flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f]">
            Optimal Walking Route Map
          </h3>
          <p className="text-xs text-[#86868b] mt-0.5">
            Shortest path routing from machine to smart locker.
          </p>
        </div>

        <span className="text-xs text-slate-500 font-mono self-start sm:self-auto bg-[#f5f5f7] px-3 py-1 rounded-full border border-black/[0.04]">
          Scale: 100m x 100m
        </span>
      </div>

      {/* 2D Mini-Factory Floorplan Canvas (Apple Architectural Style) */}
      <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#fafafc] border border-black/[0.06] overflow-hidden p-2 shadow-inner">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle minimal grid lines every 10m */}
          <defs>
            <pattern id="appleFactoryGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e5e5ea" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#appleFactoryGrid)" />

          {/* Factory Main Logistics Aisle */}
          <rect x="46" y="0" width="8" height="100" fill="#f2f2f7" opacity="0.9" />
          <rect x="0" y="46" width="100" height="8" fill="#f2f2f7" opacity="0.9" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="#d1d1d6" strokeDasharray="1,2" strokeWidth="0.5" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#d1d1d6" strokeDasharray="1,2" strokeWidth="0.5" />

          {/* Machinery Danger Zones / Production Island Obstacles */}
          <rect x="8" y="8" width="22" height="18" rx="3" fill="#ffffff" stroke="#d1d1d6" strokeWidth="0.8" />
          <text x="19" y="18" fill="#86868b" fontSize="2.8" textAnchor="middle" fontFamily="sans-serif" fontWeight="500">CNC Line</text>

          <rect x="70" y="15" width="24" height="20" rx="3" fill="#ffffff" stroke="#d1d1d6" strokeWidth="0.8" />
          <text x="82" y="26" fill="#86868b" fontSize="2.8" textAnchor="middle" fontFamily="sans-serif" fontWeight="500">Assembly B</text>

          <rect x="12" y="70" width="24" height="20" rx="3" fill="#ffffff" stroke="#d1d1d6" strokeWidth="0.8" />
          <text x="24" y="81" fill="#86868b" fontSize="2.8" textAnchor="middle" fontFamily="sans-serif" fontWeight="500">QC Lab</text>

          <rect x="68" y="68" width="22" height="20" rx="3" fill="#ffffff" stroke="#d1d1d6" strokeWidth="0.8" />
          <text x="79" y="79" fill="#86868b" fontSize="2.8" textAnchor="middle" fontFamily="sans-serif" fontWeight="500">Press D</text>

          {/* Aisle Walking Path (Apple Blue `#0071e3`) */}
          <path
            d={`M ${techX} ${techY} L ${cornerX} ${cornerY} L ${lockerX} ${lockerY}`}
            fill="none"
            stroke="#0071e3"
            strokeWidth="1.2"
            strokeDasharray="2.5,1.5"
            strokeLinecap="round"
          />

          {/* Central E-LOCK Hub */}
          <g transform={`translate(${lockerX}, ${lockerY})`}>
            <circle r="6" fill="#0071e3" fillOpacity="0.1" />
            <circle r="4" fill="#ffffff" stroke="#0071e3" strokeWidth="1" />
            <rect x="-2" y="-2" width="4" height="4" fill="#0071e3" rx="1" />
            <text x="0" y="8" fill="#1d1d1f" fontSize="2.8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              E-LOCK HUB
            </text>
          </g>

          {/* Workstation Markers */}
          {workstations.map((ws) => {
            const isActive = ws.id === activeWorkstation.id;
            return (
              <g
                key={ws.id}
                transform={`translate(${ws.x}, ${ws.y})`}
                onClick={() => onSelectWorkstation(ws)}
                className="cursor-pointer group"
              >
                {isActive && (
                  <circle r="5" fill="#0071e3" fillOpacity="0.15" />
                )}
                <circle
                  r={isActive ? '3.5' : '2.5'}
                  fill={isActive ? '#0071e3' : '#8e8e93'}
                  stroke="#ffffff"
                  strokeWidth="0.8"
                />
                <circle r={isActive ? '1.5' : '1'} fill="#ffffff" />
                <text
                  x="0"
                  y={ws.y > 50 ? -4 : 6}
                  fill={isActive ? '#0071e3' : '#86868b'}
                  fontSize="2.4"
                  fontWeight={isActive ? 'bold' : '500'}
                  textAnchor="middle"
                  fontFamily="sans-serif"
                >
                  {ws.zone}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend Overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-black/[0.06] text-[10px] text-slate-600 shadow-2xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-[#0071e3] rounded" /> Aisle Path
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0071e3]" /> Technician
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded bg-black" /> Locker Hub
          </span>
        </div>
      </div>

      {/* Telemetry Cards below */}
      <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-black/[0.04]">
        <div className="bg-[#f5f5f7] p-3 rounded-2xl">
          <span className="text-[11px] text-[#86868b] flex items-center gap-1">
            <Footprints className="w-3.5 h-3.5 text-slate-500" />
            Euclidean
          </span>
          <p className="text-slate-900 font-bold text-base mt-0.5">{euclidean} m</p>
        </div>

        <div className="bg-[#f5f5f7] p-3 rounded-2xl">
          <span className="text-[11px] text-[#86868b] flex items-center gap-1">
            <CornerDownRight className="w-3.5 h-3.5 text-slate-500" />
            Aisle Distance
          </span>
          <p className="text-slate-900 font-bold text-base mt-0.5">{manhattan} m</p>
        </div>

        <div className="bg-[#f5f5f7] p-3 rounded-2xl">
          <span className="text-[11px] text-[#86868b] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            Duration
          </span>
          <p className="text-emerald-600 font-bold text-base mt-0.5">~{walkTimeSec}s</p>
        </div>
      </div>

      {/* Route Guidance */}
      <div className="mt-3 text-xs text-slate-600 bg-[#f5f5f7] px-3.5 py-2.5 rounded-xl flex items-center justify-between">
        <span>
          Selected: <strong>{activeWorkstation.name}</strong> to Central Locker
        </span>
        {selectedTool && (
          <span className="font-mono text-black font-semibold">
            Slot: {selectedTool.slotId}
          </span>
        )}
      </div>
    </section>
  );
};
