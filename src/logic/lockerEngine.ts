/**
 * E-LOCK Smart Locker - Pure Industrial Logic & Calculations
 * Logika Pemrograman & Industrial Engineering Coursework Core Engine
 */

export interface Workstation {
  id: string;
  name: string;
  zone: string;
  x: number; // meters from factory origin (0,0)
  y: number; // meters from factory origin (0,0)
  description: string;
}

export interface ToolItem {
  id: string;
  slotId: string;
  slotRow: number; // 1 (bottom), 2 (mid-low: golden), 3 (mid-high: golden), 4 (top)
  slotCol: number; // 1 to 4
  name: string;
  category: 'Precision Measurement' | 'Torque & Assembly' | 'Cutting & Machining' | 'Electrical & Diagnostics' | 'Pneumatics & Safety';
  image: string;
  nominalWeightGrams: number;
  weightToleranceGrams: number;
  currentWeightGrams?: number;
  status: 'available' | 'borrowed' | 'maintenance';
  loanFrequencyMonthly: number; // Requisitions in last 30 days
  lastBorrower?: {
    id: string;
    name: string;
    role: string;
    borrowedAt: string; // ISO string
    dueAt: string; // ISO string
    workstationId: string;
  };
  maintenance: {
    lastCalibrated: string;
    nextCalibrationDue: string;
    usageHours: number;
    maxHoursBeforeCalibration: number;
    healthScore: number; // 0-100%
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

export const LOCKER_COORDINATES = { x: 50, y: 50 }; // Locker wall position in meters

/**
 * Calculates Euclidean walking distance between a workstation and the locker wall.
 * Distance (m) = sqrt((x2 - x1)^2 + (y2 - y1)^2)
 */
export function calculateEuclideanDistance(
  p1: { x: number; y: number },
  p2: { x: number; y: number } = LOCKER_COORDINATES
): number {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.round(Math.hypot(dx, dy) * 10) / 10;
}

/**
 * Calculates Manhattan walking distance (factory aisle grid navigation).
 * Distance (m) = |x2 - x1| + |y2 - y1|
 */
export function calculateManhattanDistance(
  p1: { x: number; y: number },
  p2: { x: number; y: number } = LOCKER_COORDINATES
): number {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

/**
 * Estimates walking time in seconds based on industrial standard walking speed.
 * Average factory technician pace is ~1.25 m/s (4.5 km/h) allowing for safety clearance.
 */
export function estimateWalkTimeSeconds(distanceMeters: number, walkSpeedMps = 1.25): number {
  return Math.round(distanceMeters / walkSpeedMps);
}

/**
 * Industrial Engineering Ergonomic Slot Evaluation:
 * "Golden Zone" in warehousing/locker ergonomics refers to waist-to-chest height
 * (rows 2 and 3 out of 4) where reach is easiest and reduces lumbar strain (RULA score minimized).
 * Top 20% most frequently used tools (Pareto Principle) should ideally be placed in rows 2 & 3.
 */
export function evaluateErgonomicPlacement(tool: ToolItem): {
  isGoldenZone: boolean;
  tierName: 'Bottom Rack (Heavy/Rare)' | 'Golden Zone (High Demand)' | 'Upper Rack (Light/Medium)';
  ergonomicScore: number; // 1 to 10
  isRecommendedPlacement: boolean;
  reason: string;
} {
  const isGolden = tool.slotRow === 2 || tool.slotRow === 3;
  
  // High usage threshold (tools accessed > 25 times/month)
  const isHighDemand = tool.loanFrequencyMonthly >= 25;

  let tierName: 'Bottom Rack (Heavy/Rare)' | 'Golden Zone (High Demand)' | 'Upper Rack (Light/Medium)';
  if (isGolden) {
    tierName = 'Golden Zone (High Demand)';
  } else if (tool.slotRow === 1) {
    tierName = 'Bottom Rack (Heavy/Rare)';
  } else {
    tierName = 'Upper Rack (Light/Medium)';
  }

  // Ergonomic match evaluation
  if (isHighDemand && isGolden) {
    return {
      isGoldenZone: true,
      tierName,
      ergonomicScore: 10,
      isRecommendedPlacement: true,
      reason: 'Optimal: High-frequency tool is placed at chest/waist level (Golden Zone), reducing technician strain.',
    };
  }

  if (isHighDemand && !isGolden) {
    return {
      isGoldenZone: false,
      tierName,
      ergonomicScore: 4,
      isRecommendedPlacement: false,
      reason: 'Suboptimal: High-demand tool is outside Golden Zone. Recommended to move to Row 2 or 3.',
    };
  }

  return {
    isGoldenZone: isGolden,
    tierName,
    ergonomicScore: 8,
    isRecommendedPlacement: true,
    reason: 'Acceptable ergonomic distribution for moderate-demand tool.',
  };
}

/**
 * Load Cell Sensor Weight Verification Logic:
 * Checks whether the measured weight is within the nominal calibration tolerance window.
 */
export function verifyLoadCellWeight(
  measuredGrams: number,
  nominalGrams: number,
  toleranceGrams: number
): {
  isValid: boolean;
  deltaGrams: number;
  percentageDeviation: number;
  status: 'PASS' | 'UNDERWEIGHT' | 'OVERWEIGHT' | 'EMPTY';
  message: string;
} {
  const deltaGrams = Math.round((measuredGrams - nominalGrams) * 10) / 10;
  const percentageDeviation = Math.round((deltaGrams / nominalGrams) * 1000) / 10;

  if (measuredGrams < nominalGrams * 0.1) {
    return {
      isValid: false,
      deltaGrams,
      percentageDeviation,
      status: 'EMPTY',
      message: 'Locker sensor detected empty tray. Tool not returned.',
    };
  }

  if (measuredGrams < nominalGrams - toleranceGrams) {
    return {
      isValid: false,
      deltaGrams,
      percentageDeviation,
      status: 'UNDERWEIGHT',
      message: `Weight deficit of ${Math.abs(deltaGrams)}g detected! Possible missing accessory, battery, or sub-component.`,
    };
  }

  if (measuredGrams > nominalGrams + toleranceGrams) {
    return {
      isValid: false,
      deltaGrams,
      percentageDeviation,
      status: 'OVERWEIGHT',
      message: `Excess weight of +${deltaGrams}g detected! Verify foreign objects or incorrect tool returned.`,
    };
  }

  return {
    isValid: true,
    deltaGrams,
    percentageDeviation,
    status: 'PASS',
    message: `Weight verified within ±${toleranceGrams}g tolerance. Return approved.`,
  };
}

/**
 * Determines real-time Locker Status Badge color:
 * - 'blue': Available (Standard)
 * - 'green': Recommended / Best Placement (Available + in Golden Zone or best match for current station)
 * - 'red': Borrowed / In Maintenance
 */
export function determineLockerBadgeStatus(
  tool: ToolItem,
  activeWorkstation?: Workstation
): {
  code: 'blue' | 'green' | 'red';
  label: string;
  tooltip: string;
} {
  if (tool.status === 'borrowed') {
    return {
      code: 'red',
      label: 'Borrowed',
      tooltip: `Currently checked out by ${tool.lastBorrower?.name || 'Technician'}`,
    };
  }

  if (tool.status === 'maintenance') {
    return {
      code: 'red',
      label: 'In Maintenance',
      tooltip: 'Calibration or repair required. Slot electronically locked.',
    };
  }

  // Tool is available: check if it qualifies for Green (Recommended / Best Ergonomic / Preferred)
  const ergonomic = evaluateErgonomicPlacement(tool);
  if (ergonomic.isGoldenZone && tool.loanFrequencyMonthly >= 20) {
    return {
      code: 'green',
      label: 'Recommended',
      tooltip: 'Optimal placement: High-demand tool located in ergonomic Golden Zone',
    };
  }

  return {
    code: 'blue',
    label: 'Available',
    tooltip: 'Tool is sanitized, calibrated, and ready for requisition',
  };
}

/**
 * Checks if a borrowed tool is overdue past shift allocation time.
 */
export function checkOverdueStatus(
  borrowedTool: ToolItem,
  currentTime: Date = new Date()
): {
  isOverdue: boolean;
  overdueMinutes: number;
  alertLevel: 'none' | 'warning' | 'critical';
} {
  if (toolIsNotBorrowed(borrowedTool) || !borrowedTool.lastBorrower) {
    return { isOverdue: false, overdueMinutes: 0, alertLevel: 'none' };
  }

  const dueTime = new Date(borrowedTool.lastBorrower.dueAt).getTime();
  const now = currentTime.getTime();

  if (now > dueTime) {
    const overdueMinutes = Math.floor((now - dueTime) / (1000 * 60));
    return {
      isOverdue: true,
      overdueMinutes,
      alertLevel: overdueMinutes > 30 ? 'critical' : 'warning',
    };
  }

  return { isOverdue: false, overdueMinutes: 0, alertLevel: 'none' };
}

function toolIsNotBorrowed(tool: ToolItem): boolean {
  return tool.status !== 'borrowed';
}

/**
 * Industrial Engineering Time-Loss Reduction Metrics
 * Compares Traditional Tool Crib vs E-LOCK Smart Locker
 */
export function calculateTimeLossMetrics(dailyRequisitions = 48, technicianHourlyWageUsd = 28.5) {
  const traditionalMinutesPerReq = 14.5; // Walking, paperwork, manual shelf search, attendant signoff
  const elockMinutesPerReq = 1.6; // RFID tap, auto-lit LED slot, automated load cell sign-in

  const savedMinutesPerReq = traditionalMinutesPerReq - elockMinutesPerReq;
  const dailyHoursSaved = Math.round(((dailyRequisitions * savedMinutesPerReq) / 60) * 10) / 10;
  const monthlyLaborHoursSaved = Math.round(dailyHoursSaved * 22); // 22 working days/month
  const monthlyCostSavingsUsd = Math.round(monthlyLaborHoursSaved * technicianHourlyWageUsd);
  const annualSavingsUsd = Math.round(monthlyCostSavingsUsd * 12);
  const percentageTimeReduction = Math.round((savedMinutesPerReq / traditionalMinutesPerReq) * 100);

  return {
    traditionalMinutesPerReq,
    elockMinutesPerReq,
    savedMinutesPerReq,
    dailyHoursSaved,
    monthlyLaborHoursSaved,
    monthlyCostSavingsUsd,
    annualSavingsUsd,
    percentageTimeReduction,
    lostToolsPerYearBefore: 18,
    lostToolsPerYearAfter: 1,
  };
}
