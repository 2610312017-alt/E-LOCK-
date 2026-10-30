import React, { useState, useRef } from 'react';
import {
  X,
  Scale,
  Calendar,
  Clock,
  MapPin,
  TrendingUp,
  User,
  ShieldCheck,
  AlertTriangle,
  Lock,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Upload,
  Maximize2,
  Image as ImageIcon,
  Check,
} from 'lucide-react';
import { ToolItem, Employee, Workstation } from '../types/locker';
import {
  calculateEuclideanDistance,
  estimateWalkTimeSeconds,
  evaluateErgonomicPlacement,
  determineLockerBadgeStatus,
} from '../logic/lockerEngine';
import { RAW_USER_PROVIDED_IMAGE, USER_TOOL_CROPS } from '../data/toolImages';

interface HolographicToolCardProps {
  tool: ToolItem;
  currentEmployee: Employee;
  activeWorkstation: Workstation;
  onClose: () => void;
  onBorrowTool: (tool: ToolItem) => void;
  onReturnTool: (tool: ToolItem) => void;
  onUpdateToolImage?: (toolId: string, newImage: string) => void;
}

export const HolographicToolCard: React.FC<HolographicToolCardProps> = ({
  tool,
  currentEmployee,
  activeWorkstation,
  onClose,
  onBorrowTool,
  onReturnTool,
  onUpdateToolImage,
}) => {
  const [showFullImageModal, setShowFullImageModal] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const badge = determineLockerBadgeStatus(tool, activeWorkstation);
  const ergonomic = evaluateErgonomicPlacement(tool);
  const distanceMeters = calculateEuclideanDistance({ x: activeWorkstation.x, y: activeWorkstation.y });
  const walkTimeSec = estimateWalkTimeSeconds(distanceMeters);

  const isLockedForMaintenance = tool.status === 'maintenance';
  const isCurrentlyBorrowed = tool.status === 'borrowed';

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdateToolImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          onUpdateToolImage(tool.id, result);
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 2500);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-fadeIn">
      {/* Apple-style Clean Card Container */}
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-black/[0.08] p-6 sm:p-8 shadow-2xl text-slate-900 overflow-hidden">
        {/* Top Header Bar */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-[#f5f5f7] border border-black/[0.06] text-black font-mono text-sm font-bold">
              {tool.slotId}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase text-[#86868b] tracking-wider">
                  {tool.category}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase border ${
                    badge.code === 'green'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : badge.code === 'red'
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}
                >
                  {badge.label}
                </span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-[#1d1d1f] mt-0.5">{tool.name}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f5f5f7] hover:bg-slate-200 text-slate-500 hover:text-black flex items-center justify-center transition-colors"
            title="Close Card"
            aria-label="Close Card"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Grid: Photo + Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {/* Tool Photo */}
          <div className="flex flex-col gap-2.5">
            <div className="relative rounded-2xl overflow-hidden border border-black/[0.06] bg-[#f5f5f7] aspect-video flex items-center justify-center group">
              <img
                src={tool.image}
                alt={tool.name}
                className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Maximize / View Original Button */}
              <button
                onClick={() => setShowFullImageModal(true)}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white transition-colors"
                title="View Full Resolution Original Photo"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>

              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg">
                <span className="truncate">{tool.model}</span>
                <span className="opacity-80 shrink-0 ml-1">{tool.serialNumber}</span>
              </div>
            </div>

            {/* Image Customizer & User Asset Selector */}
            <div className="flex items-center gap-1.5 text-[10px]">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              {onUpdateToolImage && (
                <>
                  <button
                    onClick={() => {
                      if (USER_TOOL_CROPS[tool.id]) {
                        onUpdateToolImage(tool.id, USER_TOOL_CROPS[tool.id]);
                        setUploadSuccess(true);
                        setTimeout(() => setUploadSuccess(false), 2000);
                      }
                    }}
                    className="flex-1 py-1 px-2 rounded-lg bg-[#f5f5f7] hover:bg-slate-200 text-slate-700 font-medium truncate border border-black/[0.04]"
                    title="Reset to User-Provided Apple Crop"
                  >
                    Apple Crop
                  </button>

                  <button
                    onClick={() => {
                      onUpdateToolImage(tool.id, RAW_USER_PROVIDED_IMAGE);
                      setUploadSuccess(true);
                      setTimeout(() => setUploadSuccess(false), 2000);
                    }}
                    className="flex-1 py-1 px-2 rounded-lg bg-[#f5f5f7] hover:bg-slate-200 text-slate-700 font-medium truncate border border-black/[0.04]"
                    title="Use Raw Provided Flyer Picture"
                  >
                    Raw Flyer
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="py-1 px-2.5 rounded-lg bg-black hover:bg-slate-800 text-white font-medium flex items-center gap-1 shadow-2xs"
                    title="Upload Custom Tool Picture"
                  >
                    {uploadSuccess ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Done</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3 h-3" />
                        <span>Upload</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </div>

            {/* Ergonomic Assessment */}
            <div className="p-3 rounded-2xl bg-[#f5f5f7] border border-black/[0.04] text-xs">
              <div className="flex items-center justify-between font-medium text-slate-800 mb-1">
                <span className="flex items-center gap-1.5 text-black">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  {ergonomic.tierName}
                </span>
                <span className="font-mono text-emerald-700 font-bold">{ergonomic.ergonomicScore}/10</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">{ergonomic.reason}</p>
            </div>
          </div>

          {/* Telemetry Metrics */}
          <div className="flex flex-col justify-between gap-2.5 bg-[#f5f5f7] p-4 rounded-2xl border border-black/[0.04] text-xs">
            {/* Monthly Loans */}
            <div className="flex items-center justify-between pb-2 border-b border-black/[0.06]">
              <span className="text-[#86868b] flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-slate-600" />
                Monthly Loans
              </span>
              <span className="text-slate-900 font-bold text-sm">
                {tool.loanFrequencyMonthly} <span className="text-[10px] text-slate-500 font-normal">reqs</span>
              </span>
            </div>

            {/* Load Cell Weight */}
            <div className="flex items-center justify-between pb-2 border-b border-black/[0.06]">
              <span className="text-[#86868b] flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-slate-600" />
                Nominal Weight
              </span>
              <div className="text-right">
                <span className="text-slate-900 font-bold">{tool.nominalWeightGrams} g</span>
                <span className="text-[10px] text-slate-500 block">±{tool.weightToleranceGrams}g tolerance</span>
              </div>
            </div>

            {/* Distance */}
            <div className="flex items-center justify-between pb-2 border-b border-black/[0.06]">
              <span className="text-[#86868b] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-600" />
                From Station
              </span>
              <div className="text-right">
                <span className="text-slate-900 font-bold">{distanceMeters} m</span>
                <span className="text-[10px] text-slate-500 block">~{walkTimeSec}s walk</span>
              </div>
            </div>

            {/* Calibration Health */}
            <div className="flex items-center justify-between">
              <span className="text-[#86868b] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-600" />
                Calibration
              </span>
              <div className="text-right">
                <span className="font-bold text-emerald-700">
                  {tool.maintenance.healthScore}% Valid
                </span>
                <span className="text-[10px] text-slate-500 block">Due: {tool.maintenance.nextCalibrationDue}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Borrower Information Banner */}
        {isCurrentlyBorrowed && tool.lastBorrower && (
          <div className="mb-5 p-3.5 rounded-2xl bg-red-50/80 border border-red-200/80 text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-red-900 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-red-600" />
                Checked out by {tool.lastBorrower.name}
              </span>
              <span className="text-[10px] font-mono text-red-700">
                {tool.lastBorrower.workOrder}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-600 mt-1">
              <span>Checkout: {new Date(tool.lastBorrower.borrowedAt).toLocaleTimeString()}</span>
              <span>Due: {new Date(tool.lastBorrower.dueAt).toLocaleTimeString()}</span>
            </div>
          </div>
        )}

        {/* Maintenance Lockout Notice */}
        {isLockedForMaintenance && (
          <div className="mb-5 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-900">Safety Lockout Active</p>
              <p className="text-[11px] text-amber-700 mt-0.5">
                {tool.maintenance.lockReason || 'Tool undergoing routine calibration and metrology inspection.'}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons in Apple pill style */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-black/[0.06]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full text-xs font-medium text-slate-600 hover:bg-[#f5f5f7] transition-colors"
          >
            Cancel
          </button>

          {isCurrentlyBorrowed ? (
            <button
              onClick={() => onReturnTool(tool)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Return Tool (Simulate Load Cell)</span>
            </button>
          ) : isLockedForMaintenance ? (
            <button
              disabled
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-200 text-slate-400 font-medium text-xs cursor-not-allowed"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Electronically Locked</span>
            </button>
          ) : (
            <button
              onClick={() => onBorrowTool(tool)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-black hover:bg-slate-800 text-white font-semibold text-xs shadow-sm transition-all cursor-pointer"
            >
              <span>Authorize & Checkout ({currentEmployee.name.split(' ')[0]})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Full-screen Lightbox for User-provided Reference Image */}
      {showFullImageModal && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-lg flex flex-col items-center justify-center p-4">
          <div className="relative max-w-2xl w-full max-h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-black/[0.06] bg-[#f5f5f7]">
              <div>
                <h4 className="text-sm font-bold text-slate-900">User Provided Reference Asset</h4>
                <p className="text-[11px] text-slate-500 font-mono">/assets/aistudio/image_1c25e20e.png (1200 x 1494)</p>
              </div>
              <button
                onClick={() => setShowFullImageModal(false)}
                className="w-8 h-8 rounded-full bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors border border-black/[0.06]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-[#fafafc]">
              <img
                src={RAW_USER_PROVIDED_IMAGE}
                alt="User Provided Original Asset"
                className="max-h-[70vh] object-contain rounded-xl shadow-md border border-black/[0.06]"
              />
            </div>

            <div className="p-3 bg-[#f5f5f7] border-t border-black/[0.06] flex items-center justify-between text-xs">
              <span className="text-slate-500 text-[11px]">Directly integrated across Series 400 bays and bento showcases</span>
              <button
                onClick={() => {
                  if (onUpdateToolImage) {
                    onUpdateToolImage(tool.id, RAW_USER_PROVIDED_IMAGE);
                  }
                  setShowFullImageModal(false);
                }}
                className="px-3 py-1.5 rounded-full bg-black hover:bg-slate-800 text-white font-medium text-xs shadow-2xs"
              >
                Apply Full Flyer to This Slot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
