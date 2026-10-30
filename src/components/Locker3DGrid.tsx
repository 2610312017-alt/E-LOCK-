import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  Search,
  SlidersHorizontal,
  Lock,
  Unlock,
  Scale,
  Eye,
  ArrowUpRight,
  DoorOpen,
  Image as ImageIcon,
} from 'lucide-react';
import { ToolItem, ToolCategory, Workstation } from '../types/locker';
import { determineLockerBadgeStatus, evaluateErgonomicPlacement } from '../logic/lockerEngine';
import { soundManager } from '../utils/audio';

interface Locker3DGridProps {
  tools: ToolItem[];
  activeWorkstation: Workstation;
  selectedToolId: string | null;
  onSelectTool: (tool: ToolItem) => void;
  openLockerSlots: Set<string>;
  onToggleSlotDoor: (slotId: string) => void;
  onOpenAllDoors?: () => void;
  onCloseAllDoors?: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ToolCategory | 'ALL';
  onCategoryChange: (cat: ToolCategory | 'ALL') => void;
}

export const Locker3DGrid: React.FC<Locker3DGridProps> = ({
  tools,
  activeWorkstation,
  selectedToolId,
  onSelectTool,
  openLockerSlots,
  onToggleSlotDoor,
  onOpenAllDoors,
  onCloseAllDoors,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}) => {
  const [is3dPerspective, setIs3dPerspective] = useState(true);

  const rows = [4, 3, 2, 1];

  const categories: (ToolCategory | 'ALL')[] = [
    'ALL',
    'Precision Measurement',
    'Torque & Assembly',
    'Cutting & Machining',
    'Electrical & Diagnostics',
    'Pneumatics & Safety',
  ];

  const isToolMatchingSearch = (tool: ToolItem) => {
    const query = searchQuery.trim().toLowerCase();
    if (selectedCategory !== 'ALL' && tool.category !== selectedCategory) return false;
    if (!query) return true;
    return (
      tool.name.toLowerCase().includes(query) ||
      tool.slotId.toLowerCase().includes(query) ||
      tool.model.toLowerCase().includes(query) ||
      tool.category.toLowerCase().includes(query)
    );
  };

  return (
    <section id="lockers" className="bg-white rounded-3xl border border-black/[0.06] shadow-sm p-6 sm:p-8">
      {/* Top Header: Apple-style Minimalist */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#86868b] font-medium block">
            OUTPUT 1 • INTERACTIVE 3D
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1d1d1f] mt-0.5">
            Digital Locker Grid
          </h3>
          <p className="text-xs sm:text-sm text-[#86868b] mt-1">
            16 precision-engineered bays • Click any slot to trigger smooth 3D opening & holographic telemetry.
          </p>
        </div>

        {/* Locker Grid Action Controls */}
        <div className="flex items-center gap-2">
          {onOpenAllDoors && onCloseAllDoors && (
            <button
              onClick={openLockerSlots.size >= tools.length ? onCloseAllDoors : onOpenAllDoors}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all bg-[#f5f5f7] hover:bg-[#e5e5ea] text-slate-800 border border-black/[0.06] shadow-2xs"
              title="Toggle all 16 locker doors open to inspect inside pictures"
            >
              <DoorOpen className="w-3.5 h-3.5 text-slate-600" />
              <span>{openLockerSlots.size >= tools.length ? 'Close All Bays' : 'Open All Bays'}</span>
            </button>
          )}

          <button
            onClick={() => setIs3dPerspective(!is3dPerspective)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              is3dPerspective
                ? 'bg-black text-white shadow-sm'
                : 'bg-[#f5f5f7] text-slate-700 hover:bg-[#ebebeb] border border-black/[0.06]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{is3dPerspective ? '3D Perspective: ON' : 'Flat Wall View'}</span>
          </button>
        </div>
      </div>

      {/* Apple Search & Category Pills */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6 bg-[#f5f5f7] p-2 rounded-2xl border border-black/[0.04]">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tool name, slot ID (e.g. L-05), or category..."
            className="w-full bg-white border border-black/[0.06] rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-medium"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1 hidden lg:block" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`text-[11px] whitespace-nowrap px-3 py-1.5 rounded-full font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-black/[0.04]'
              }`}
            >
              {cat === 'ALL' ? 'All Tools' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Ergonomic Zone Guide Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6 text-xs text-slate-600">
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#f5f5f7] border border-black/[0.04]">
          <span className="w-2 h-2 rounded-full bg-slate-400"></span>
          <span>Row 4: Overhead Shelf (Light/Rare)</span>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-800 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Rows 2-3: Golden Zone (Waist/Chest)</span>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#f5f5f7] border border-black/[0.04]">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          <span>Row 1: Heavy Base (&gt;5kg Tools)</span>
        </div>
      </div>

      {/* 3D Locker Wall Stage in Apple Ceramic & Titanium Finish */}
      <div
        className={`transition-all duration-500 p-3 sm:p-6 rounded-3xl bg-gradient-to-b from-[#e5e5ea] via-[#ececee] to-[#dcdce0] border border-black/[0.08] shadow-inner ${
          is3dPerspective ? '[perspective:1200px]' : ''
        }`}
      >
        <div
          className={`grid grid-rows-4 gap-3 sm:gap-4 transition-transform duration-500 ${
            is3dPerspective ? 'rotate-x-2 rotate-y-[-1deg] scale-[0.99]' : ''
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {rows.map((rowNum) => {
            const rowTools = tools
              .filter((t) => t.slotRow === rowNum)
              .sort((a, b) => a.slotCol - b.slotCol);

            const isGoldenZoneRow = rowNum === 2 || rowNum === 3;

            return (
              <div key={rowNum} className="relative">
                {/* 4 Bays in this Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {rowTools.map((tool) => {
                    const isOpen = openLockerSlots.has(tool.slotId);
                    const isSelected = selectedToolId === tool.id;
                    const matchesSearch = isToolMatchingSearch(tool);
                    const badge = determineLockerBadgeStatus(tool, activeWorkstation);

                    // Refined Apple Color Codes
                    let statusPillClass = 'bg-blue-50 text-[#0071e3] border-blue-200/80';
                    let ledAccent = 'bg-[#0071e3]';

                    if (badge.code === 'green') {
                      statusPillClass = 'bg-emerald-50 text-[#34c759] border-emerald-200/80';
                      ledAccent = 'bg-[#34c759]';
                    } else if (badge.code === 'red') {
                      statusPillClass = 'bg-red-50 text-[#ff3b30] border-red-200/80';
                      ledAccent = 'bg-[#ff3b30]';
                    }

                    const isHighlighted = searchQuery.trim().length > 0 && matchesSearch;

                    return (
                      <div
                        key={tool.id}
                        className={`relative group h-44 sm:h-48 rounded-2xl bg-white border transition-all duration-300 [perspective:1000px] shadow-sm ${
                          isHighlighted
                            ? 'ring-2 ring-black scale-[1.02] shadow-lg'
                            : ''
                        } ${!matchesSearch && searchQuery.trim().length > 0 ? 'opacity-30' : 'opacity-100'} ${
                          isSelected ? 'ring-2 ring-black' : 'border-black/[0.08]'
                        }`}
                      >
                        {/* 1. INTERIOR COMPARTMENT (Revealed when door is swung open) */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#fafafc] to-[#f2f2f4] p-3.5 flex flex-col justify-between overflow-hidden">
                          {/* Top Interior Strip */}
                          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                            <span className="font-bold text-slate-900">{tool.slotId}</span>
                            <span className="flex items-center gap-1 text-[10px] text-slate-700 font-medium">
                              <Scale className="w-3 h-3 text-slate-400" />
                              {tool.status === 'borrowed' ? 'In Use' : `${tool.nominalWeightGrams}g`}
                            </span>
                          </div>

                          {/* Tool Graphic / Photo in illuminated shelf */}
                          <div className="relative my-auto flex flex-col items-center justify-center">
                            {tool.status === 'borrowed' ? (
                              <div className="flex flex-col items-center justify-center py-2 text-center">
                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-1">
                                  <Lock className="w-4 h-4" />
                                </div>
                                <span className="text-[11px] font-semibold text-red-700">Checked Out</span>
                                <span className="text-[9px] text-slate-500 truncate max-w-[120px]">
                                  {tool.lastBorrower?.name || 'In Use'}
                                </span>
                              </div>
                            ) : (
                              <div className="relative flex flex-col items-center">
                                <img
                                  src={tool.image}
                                  alt={tool.name}
                                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain p-1.5 rounded-2xl bg-white border border-black/[0.06] shadow-2xs group-hover:scale-105 transition-transform"
                                />
                                <span className="text-[10px] font-medium text-slate-800 text-center line-clamp-1 mt-1 max-w-[140px]">
                                  {tool.name}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Action Bar inside */}
                          <div className="flex items-center gap-1.5 pt-1.5 border-t border-black/[0.04]">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectTool(tool);
                              }}
                              className="flex-1 py-1 rounded-full bg-black hover:bg-slate-800 text-white text-[10px] font-medium flex items-center justify-center gap-1 transition-colors"
                            >
                              <Eye className="w-3 h-3" />
                              Details
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                soundManager.playLockerUnlock();
                                onToggleSlotDoor(tool.slotId);
                              }}
                              className="px-2.5 py-1 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-medium"
                              title="Close Locker Door"
                            >
                              Close
                            </button>
                          </div>
                        </div>

                        {/* 2. 3D LOCKER DOOR (Apple Titanium Brushed Door) */}
                        <div
                          onClick={() => {
                            soundManager.playLockerUnlock();
                            onToggleSlotDoor(tool.slotId);
                            onSelectTool(tool);
                          }}
                          className={`absolute inset-0 rounded-2xl cursor-pointer transition-transform duration-700 ease-out flex flex-col justify-between p-3.5 select-none ${
                            isOpen ? '[transform:rotateY(-110deg)] pointer-events-none' : '[transform:rotateY(0deg)]'
                          }`}
                          style={{
                            transformOrigin: 'left center',
                            backfaceVisibility: 'hidden',
                            background:
                              'linear-gradient(155deg, #ffffff 0%, #f6f6f8 60%, #ededf0 100%)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06), inset 0 1px 1px rgba(255,255,255,0.8)',
                          }}
                        >
                          {/* Top Door Bar */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-xs font-bold text-slate-900">
                                {tool.slotId}
                              </span>
                              {isGoldenZoneRow && (
                                <span
                                  className="w-1.5 h-1.5 rounded-full bg-[#34c759]"
                                  title="Golden Zone (Waist/Chest)"
                                />
                              )}
                            </div>

                            {/* Minimalist Status OLED Tag */}
                            <div
                              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium border ${statusPillClass}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${ledAccent}`} />
                              <span>{badge.label}</span>
                            </div>
                          </div>

                          {/* Minimalist Clean Bevel Line */}
                          <div className="h-[1px] w-full bg-black/[0.04] rounded-full my-1" />

                          {/* Tool Name */}
                          <div>
                            <p className="text-xs font-semibold text-slate-900 line-clamp-1 leading-snug group-hover:text-black transition-colors">
                              {tool.name}
                            </p>
                            <p className="text-[10px] text-slate-400 truncate mt-0.5 font-mono">
                              {tool.model}
                            </p>
                          </div>

                          {/* Bottom Door Controls */}
                          <div className="flex items-center justify-between pt-1.5 border-t border-black/[0.04]">
                            <span className="text-[10px] font-mono text-slate-500">
                              {tool.nominalWeightGrams}g
                            </span>

                            <div className="flex items-center gap-1 text-[11px] font-medium text-slate-800 group-hover:translate-x-0.5 transition-transform">
                              <span>Open</span>
                              <Unlock className="w-3 h-3" />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
