import React, { useState, useMemo } from 'react';
import {
  INITIAL_EMPLOYEES,
  INITIAL_TOOLS,
  WORKSTATIONS,
  INITIAL_LOGS,
} from './data/mockData';
import { ToolItem, Employee, Workstation, ToolCategory, ActivityLog } from './types/locker';
import { checkOverdueStatus } from './logic/lockerEngine';
import { soundManager } from './utils/audio';

// Apple Minimalist Components
import { Header } from './components/Header';
import { AppleHeroSection } from './components/AppleHeroSection';
import { AppleBentoDetails } from './components/AppleBentoDetails';
import { StatusBadgesSummary } from './components/StatusBadgesSummary';
import { Locker3DGrid } from './components/Locker3DGrid';
import { FactoryMap } from './components/FactoryMap';
import { UsageErgonomicsChart } from './components/UsageErgonomicsChart';
import { TimeLossDashboard } from './components/TimeLossDashboard';
import { HolographicToolCard } from './components/HolographicToolCard';
import { LoadCellModal } from './components/LoadCellModal';
import { RfidScanModal } from './components/RfidScanModal';
import { OverdueModal } from './components/OverdueModal';
import { AcademicEngineeringModal } from './components/AcademicEngineeringModal';
import { ActivityLogsTable } from './components/ActivityLogsTable';

export default function App() {
  // --- Core State ---
  const [tools, setTools] = useState<ToolItem[]>(INITIAL_TOOLS);
  const [currentEmployee, setCurrentEmployee] = useState<Employee>(INITIAL_EMPLOYEES[0]);
  const [activeWorkstation, setActiveWorkstation] = useState<Workstation>(WORKSTATIONS[0]);
  const [logs, setLogs] = useState<ActivityLog[]>(INITIAL_LOGS);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'ALL'>('ALL');
  const [badgeFilter, setBadgeFilter] = useState<'ALL' | 'BLUE' | 'GREEN' | 'RED'>('ALL');

  // Interactive Locker Grid & Doors
  const [openLockerSlots, setOpenLockerSlots] = useState<Set<string>>(new Set(['L-05']));
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);

  // Modals
  const [loadCellTool, setLoadCellTool] = useState<ToolItem | null>(null);
  const [isRfidModalOpen, setIsRfidModalOpen] = useState<boolean>(false);
  const [isOverdueModalOpen, setIsOverdueModalOpen] = useState<boolean>(false);
  const [isAcademicModalOpen, setIsAcademicModalOpen] = useState<boolean>(false);

  // System Audio & Time Simulation
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [simulatedMinutesOffset, setSimulatedMinutesOffset] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Calculated current simulation time
  const currentSimulatedTime = useMemo(() => {
    const base = new Date();
    base.setHours(10, 15 + simulatedMinutesOffset, 0);
    return base;
  }, [simulatedMinutesOffset]);

  const currentTimeStr = currentSimulatedTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Calculate overdue tools
  const overdueTools = useMemo(() => {
    return tools.filter((t) => {
      const overdue = checkOverdueStatus(t, currentSimulatedTime);
      return overdue.isOverdue;
    });
  }, [tools, currentSimulatedTime]);

  const hasOverdueAlert = overdueTools.length > 0;

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundManager.setMuted(nextMuted);
  };

  const handleToggleSlotDoor = (slotId: string) => {
    setOpenLockerSlots((prev) => {
      const next = new Set(prev);
      if (next.has(slotId)) {
        next.delete(slotId);
      } else {
        next.add(slotId);
      }
      return next;
    });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Borrow Tool (Checkout Flow)
  const handleBorrowTool = (tool: ToolItem) => {
    soundManager.playLockerUnlock();
    setOpenLockerSlots((prev) => new Set(prev).add(tool.slotId));

    const updatedTools = tools.map((t) => {
      if (t.id === tool.id) {
        return {
          ...t,
          status: 'borrowed' as const,
          currentWeightGrams: 0,
          loanFrequencyMonthly: t.loanFrequencyMonthly + 1,
          lastBorrower: {
            id: currentEmployee.id,
            name: currentEmployee.name,
            role: currentEmployee.role,
            avatarUrl: currentEmployee.avatarUrl,
            borrowedAt: currentSimulatedTime.toISOString(),
            dueAt: new Date(currentSimulatedTime.getTime() + 120 * 60 * 1000).toISOString(),
            workstationId: activeWorkstation.id,
            workOrder: `WO-2026-${Math.floor(1000 + Math.random() * 9000)} (${activeWorkstation.name})`,
          },
        };
      }
      return t;
    });

    setTools(updatedTools);
    setSelectedTool(null);

    const newLog: ActivityLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: currentTimeStr,
      type: 'CHECKOUT',
      toolId: tool.id,
      toolName: tool.name,
      slotId: tool.slotId,
      employeeName: currentEmployee.name,
      employeeId: currentEmployee.id,
      details: `RFID scan verified. Slot ${tool.slotId} solenoid opened. Load cell zeroed.`,
      status: 'SUCCESS',
    };
    setLogs((prev) => [newLog, ...prev]);

    triggerToast(`Unlocked Bay ${tool.slotId}: ${tool.name} checked out to ${currentEmployee.name}`);
  };

  // Return Tool Flow
  const handleInitiateReturn = (tool: ToolItem) => {
    setSelectedTool(null);
    setIsOverdueModalOpen(false);
    setLoadCellTool(tool);
  };

  const handleConfirmReturn = (toolId: string, measuredWeight: number) => {
    soundManager.playLoadCellPass();

    const targetTool = tools.find((t) => t.id === toolId);
    if (!targetTool) return;

    const updatedTools = tools.map((t) => {
      if (t.id === toolId) {
        return {
          ...t,
          status: 'available' as const,
          currentWeightGrams: measuredWeight,
          lastBorrower: undefined,
        };
      }
      return t;
    });

    setTools(updatedTools);
    setLoadCellTool(null);

    setOpenLockerSlots((prev) => {
      const next = new Set(prev);
      next.delete(targetTool.slotId);
      return next;
    });

    const newLog: ActivityLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: currentTimeStr,
      type: 'RETURN',
      toolId: targetTool.id,
      toolName: targetTool.name,
      slotId: targetTool.slotId,
      employeeName: currentEmployee.name,
      employeeId: currentEmployee.id,
      details: `Load cell verified ${measuredWeight}g (Nominal ${targetTool.nominalWeightGrams}g). Return approved & locked.`,
      status: 'SUCCESS',
    };
    setLogs((prev) => [newLog, ...prev]);

    triggerToast(`Return Verified! Bay ${targetTool.slotId} locked and status set to Available.`);
  };

  const handleAdvanceShiftSimulation = () => {
    setSimulatedMinutesOffset((prev) => prev + 30);
    triggerToast(`Simulation clock advanced +30 minutes. Real-time overdue check updated.`);
  };

  const handleSendCommsReminder = (tool: ToolItem) => {
    soundManager.playRfidBeep();
    triggerToast(`Factory Pager notification transmitted to ${tool.lastBorrower?.name || 'Technician'}`);
  };

  const availableCount = tools.filter((t) => t.status === 'available').length;

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] flex flex-col font-sans selection:bg-black selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-4 z-50 flex items-center gap-2.5 bg-black/90 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-medium animate-slideDown">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        currentEmployee={currentEmployee}
        allEmployees={INITIAL_EMPLOYEES}
        onSelectEmployee={setCurrentEmployee}
        activeWorkstation={activeWorkstation}
        allWorkstations={WORKSTATIONS}
        onSelectWorkstation={setActiveWorkstation}
        onOpenRfidModal={() => setIsRfidModalOpen(true)}
        onOpenAcademicModal={() => setIsAcademicModalOpen(true)}
        hasOverdueAlert={hasOverdueAlert}
        onOpenOverdueModal={() => setIsOverdueModalOpen(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        currentTimeStr={currentTimeStr}
        onAdvanceShiftSimulation={handleAdvanceShiftSimulation}
        onScrollTo={scrollToSection}
      />

      {/* 1. Apple-Inspired Hero Section */}
      <AppleHeroSection
        onExploreClick={() => scrollToSection('lockers')}
        onWhyElockClick={() => setIsAcademicModalOpen(true)}
        totalTools={tools.length}
        availableTools={availableCount}
      />

      {/* 2. Apple-Inspired Bento Details ("Innovation. In every detail.") */}
      <AppleBentoDetails onCardClick={scrollToSection} />

      {/* Main Interactive System Sections */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 space-y-8 pb-16">
        {/* Output 4: Status Indicator Badges & Real-Time Counters */}
        <StatusBadgesSummary
          tools={tools}
          activeWorkstation={activeWorkstation}
          activeFilter={badgeFilter}
          onFilterChange={setBadgeFilter}
        />

        {/* Output 1: Interactive 3D Digital Locker Grid */}
        <Locker3DGrid
          tools={tools}
          activeWorkstation={activeWorkstation}
          selectedToolId={selectedTool?.id || null}
          onSelectTool={(tool) => setSelectedTool(tool)}
          openLockerSlots={openLockerSlots}
          onToggleSlotDoor={handleToggleSlotDoor}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Dual Grid: Output 2 (Factory Route Map) & Output 3 (Usage Statistics & Ergonomics) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Output 2: Optimal Walking Route Map */}
          <FactoryMap
            workstations={WORKSTATIONS}
            activeWorkstation={activeWorkstation}
            onSelectWorkstation={setActiveWorkstation}
            selectedTool={selectedTool}
          />

          {/* Output 3: Usage Bar Chart & Ergonomics */}
          <UsageErgonomicsChart
            tools={tools}
            onSelectTool={(tool) => setSelectedTool(tool)}
          />
        </div>

        {/* Output 6: Time-Loss Reduction Dashboard */}
        <TimeLossDashboard />

        {/* Audit Trail & Sensor Activity Logs */}
        <ActivityLogsTable logs={logs} />
      </main>

      {/* Clean Apple-style Minimal Footer */}
      <footer className="border-t border-black/[0.06] bg-white py-8 px-6 text-center text-xs text-[#86868b]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center text-white">
              <span className="text-[8px] font-bold">E</span>
            </div>
            <span className="font-semibold text-slate-900">E-LOCK Smart Locker</span>
            <span>• Academic Systems Engineering Coursework</span>
          </div>

          <p className="text-[11px]">
            Designed with Apple minimalist principles • Virtual Strain-Gauge Bridge • 2D Spatial Proximity
          </p>
        </div>
      </footer>

      {/* Modals */}
      {selectedTool && (
        <HolographicToolCard
          tool={selectedTool}
          currentEmployee={currentEmployee}
          activeWorkstation={activeWorkstation}
          onClose={() => setSelectedTool(null)}
          onBorrowTool={handleBorrowTool}
          onReturnTool={handleInitiateReturn}
        />
      )}

      {loadCellTool && (
        <LoadCellModal
          tool={loadCellTool}
          currentEmployee={currentEmployee}
          onClose={() => setLoadCellTool(null)}
          onConfirmReturn={handleConfirmReturn}
        />
      )}

      {isRfidModalOpen && (
        <RfidScanModal
          currentEmployee={currentEmployee}
          allEmployees={INITIAL_EMPLOYEES}
          onSelectEmployee={setCurrentEmployee}
          onClose={() => setIsRfidModalOpen(false)}
        />
      )}

      {isOverdueModalOpen && (
        <OverdueModal
          overdueTools={overdueTools}
          onClose={() => setIsOverdueModalOpen(false)}
          onInitiateReturn={handleInitiateReturn}
          onSendCommsReminder={handleSendCommsReminder}
        />
      )}

      {isAcademicModalOpen && (
        <AcademicEngineeringModal onClose={() => setIsAcademicModalOpen(false)} />
      )}
    </div>
  );
}
