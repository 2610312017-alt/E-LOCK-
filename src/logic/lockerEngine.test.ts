import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateEuclideanDistance,
  calculateManhattanDistance,
  estimateWalkTimeSeconds,
  evaluateErgonomicPlacement,
  verifyLoadCellWeight,
  determineLockerBadgeStatus,
  checkOverdueStatus,
  calculateTimeLossMetrics,
  ToolItem,
  Workstation,
} from './lockerEngine';

test('Distance calculations: Euclidean and Manhattan calculations match formulas', () => {
  const stationA = { x: 20, y: 10 };
  const stationB = { x: 50, y: 50 }; // distance dx=30, dy=40 -> 50

  const euclidean = calculateEuclideanDistance(stationA, stationB);
  assert.equal(euclidean, 50);

  const manhattan = calculateManhattanDistance(stationA, stationB);
  assert.equal(manhattan, 70); // 30 + 40

  const walkTime = estimateWalkTimeSeconds(euclidean, 1.25);
  assert.equal(walkTime, 40); // 50 / 1.25 = 40 seconds
});

test('Ergonomic evaluation: golden zone waist/chest tier prioritizes high frequency tools', () => {
  const mockToolGolden: ToolItem = {
    id: 'T-01',
    slotId: 'L-06',
    slotRow: 2, // Golden Zone
    slotCol: 2,
    name: 'Digital Torque Wrench 1/2"',
    category: 'Torque & Assembly',
    image: '',
    nominalWeightGrams: 1250,
    weightToleranceGrams: 20,
    status: 'available',
    loanFrequencyMonthly: 42, // High demand
    maintenance: {
      lastCalibrated: '2026-09-01',
      nextCalibrationDue: '2026-12-01',
      usageHours: 120,
      maxHoursBeforeCalibration: 500,
      healthScore: 98,
    },
  };

  const evalGolden = evaluateErgonomicPlacement(mockToolGolden);
  assert.equal(evalGolden.isGoldenZone, true);
  assert.equal(evalGolden.isRecommendedPlacement, true);
  assert.equal(evalGolden.ergonomicScore, 10);

  // Suboptimal placement: high demand tool in row 1 (bottom rack)
  const mockToolBottom: ToolItem = {
    ...mockToolGolden,
    slotRow: 1,
  };
  const evalBottom = evaluateErgonomicPlacement(mockToolBottom);
  assert.equal(evalBottom.isGoldenZone, false);
  assert.equal(evalBottom.isRecommendedPlacement, false);
});

test('Load cell verification: handles pass, underweight (missing parts), overweight, and empty states', () => {
  const nominal = 1000;
  const tolerance = 25; // 975g to 1025g is valid

  // Case 1: Perfect pass
  const passRes = verifyLoadCellWeight(995, nominal, tolerance);
  assert.equal(passRes.isValid, true);
  assert.equal(passRes.status, 'PASS');

  // Case 2: Underweight (e.g. missing socket bit)
  const underRes = verifyLoadCellWeight(940, nominal, tolerance);
  assert.equal(underRes.isValid, false);
  assert.equal(underRes.status, 'UNDERWEIGHT');

  // Case 3: Overweight (foreign item or wrong tool)
  const overRes = verifyLoadCellWeight(1080, nominal, tolerance);
  assert.equal(overRes.isValid, false);
  assert.equal(overRes.status, 'OVERWEIGHT');

  // Case 4: Empty tray
  const emptyRes = verifyLoadCellWeight(0, nominal, tolerance);
  assert.equal(emptyRes.isValid, false);
  assert.equal(emptyRes.status, 'EMPTY');
});

test('Status badge color-coding rules: blue=available, green=recommended, red=borrowed/maintenance', () => {
  const baseTool: ToolItem = {
    id: 'T-02',
    slotId: 'L-02',
    slotRow: 4, // Top rack, moderate demand
    slotCol: 2,
    name: 'Precision Vernier Caliper',
    category: 'Precision Measurement',
    image: '',
    nominalWeightGrams: 320,
    weightToleranceGrams: 5,
    status: 'available',
    loanFrequencyMonthly: 12,
    maintenance: {
      lastCalibrated: '2026-10-01',
      nextCalibrationDue: '2027-01-01',
      usageHours: 40,
      maxHoursBeforeCalibration: 400,
      healthScore: 99,
    },
  };

  // Standard available -> blue
  assert.equal(determineLockerBadgeStatus(baseTool).code, 'blue');

  // Recommended (Golden zone + high demand) -> green
  const recommendedTool: ToolItem = {
    ...baseTool,
    slotRow: 3,
    loanFrequencyMonthly: 35,
  };
  assert.equal(determineLockerBadgeStatus(recommendedTool).code, 'green');

  // Borrowed -> red
  const borrowedTool: ToolItem = {
    ...baseTool,
    status: 'borrowed',
    lastBorrower: {
      id: 'EMP-101',
      name: 'Andi Pratama',
      role: 'Senior Tech',
      borrowedAt: new Date().toISOString(),
      dueAt: new Date(Date.now() + 3600000).toISOString(),
      workstationId: 'WS-01',
    },
  };
  assert.equal(determineLockerBadgeStatus(borrowedTool).code, 'red');

  // Maintenance -> red
  const maintTool: ToolItem = {
    ...baseTool,
    status: 'maintenance',
  };
  assert.equal(determineLockerBadgeStatus(maintTool).code, 'red');
});

test('Overdue status calculation properly flags overdue checkouts', () => {
  const pastDue = new Date(Date.now() - 45 * 60 * 1000).toISOString(); // 45 mins ago
  const overdueTool: ToolItem = {
    id: 'T-03',
    slotId: 'L-03',
    slotRow: 2,
    slotCol: 1,
    name: 'Laser Alignment Sensor',
    category: 'Electrical & Diagnostics',
    image: '',
    nominalWeightGrams: 450,
    weightToleranceGrams: 10,
    status: 'borrowed',
    loanFrequencyMonthly: 18,
    lastBorrower: {
      id: 'EMP-202',
      name: 'Dewi Lestari',
      role: 'Assembly Lead',
      borrowedAt: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
      dueAt: pastDue,
      workstationId: 'WS-02',
    },
    maintenance: {
      lastCalibrated: '2026-08-01',
      nextCalibrationDue: '2026-11-01',
      usageHours: 85,
      maxHoursBeforeCalibration: 300,
      healthScore: 92,
    },
  };

  const overdueCheck = checkOverdueStatus(overdueTool, new Date());
  assert.equal(overdueCheck.isOverdue, true);
  assert.equal(overdueCheck.alertLevel, 'critical');
  assert.ok(overdueCheck.overdueMinutes >= 40);
});

test('Time-Loss metrics returns valid positive productivity savings', () => {
  const metrics = calculateTimeLossMetrics(50, 30);
  assert.ok(metrics.savedMinutesPerReq > 10);
  assert.ok(metrics.percentageTimeReduction >= 85);
  assert.ok(metrics.annualSavingsUsd > 10000);
});
