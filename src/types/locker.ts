export interface Workstation {
  id: string;
  name: string;
  code: string;
  zone: 'Zone A' | 'Zone B' | 'Zone C' | 'Zone D' | 'Zone E';
  x: number; // meters from factory origin (0,0)
  y: number; // meters from factory origin (0,0)
  description: string;
  activeMachinery: string;
}

export type ToolCategory =
  | 'Precision Measurement'
  | 'Torque & Assembly'
  | 'Cutting & Machining'
  | 'Electrical & Diagnostics'
  | 'Pneumatics & Safety';

export interface ToolItem {
  id: string;
  slotId: string;
  slotRow: number; // 1 (bottom), 2 (lower golden), 3 (upper golden), 4 (top)
  slotCol: number; // 1 to 4
  name: string;
  category: ToolCategory;
  model: string;
  serialNumber: string;
  image: string;
  nominalWeightGrams: number;
  weightToleranceGrams: number;
  currentWeightGrams?: number;
  status: 'available' | 'borrowed' | 'maintenance';
  loanFrequencyMonthly: number;
  avgCheckoutDurationHours: number;
  lastBorrower?: {
    id: string;
    name: string;
    role: string;
    avatarUrl: string;
    borrowedAt: string;
    dueAt: string;
    workstationId: string;
    workOrder: string;
  };
  maintenance: {
    lastCalibrated: string;
    nextCalibrationDue: string;
    usageHours: number;
    maxHoursBeforeCalibration: number;
    healthScore: number;
    lockReason?: string;
  };
}

export interface Employee {
  id: string;
  rfidCode: string;
  barcode: string;
  name: string;
  role: string;
  department: string;
  avatarUrl: string;
  certifications: string[];
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  type: 'CHECKOUT' | 'RETURN' | 'MAINTENANCE_LOCK' | 'CALIBRATION' | 'OVERDUE_ALERT';
  toolId: string;
  toolName: string;
  slotId: string;
  employeeName: string;
  employeeId: string;
  details: string;
  status: 'SUCCESS' | 'WARNING' | 'ALERT';
}
