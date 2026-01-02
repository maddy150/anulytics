// Mock financial data simulating Google Sheets as data source

export interface CashFlowData {
  month: string;
  inflow: number;
  outflow: number;
  net: number;
}

export interface LiquidityData {
  cashInBank: number;
  shortTermAssets: number;
  totalLiquidity: number;
}

export interface InvestmentData {
  type: string;
  amount: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
}

export interface InvoiceData {
  id: string;
  customer: string;
  amount: number;
  dueDate: string;
  status: 'current' | 'overdue' | 'critical';
  daysOverdue: number;
}

export interface AgingBucket {
  range: string;
  amount: number;
  count: number;
  percentage: number;
}

export interface ForecastData {
  month: string;
  bestCase: number;
  expected: number;
  worstCase: number;
  pipeline: number;
}

export interface ContractRenewal {
  id: string;
  customer: string;
  contractValue: number;
  renewalDate: string;
  status: 'upcoming' | 'missed' | 'renewed';
  riskLevel: 'low' | 'medium' | 'high';
}

export interface RevenueLeakage {
  type: string;
  amount: number;
  description: string;
}

// Dashboard Summary Data
export const dashboardSummary = {
  netCashPosition: 2847500,
  netCashChange: 12.5,
  totalReceivables: 1245000,
  receivablesChange: -3.2,
  forecastedRevenue: 4520000,
  forecastChange: 8.7,
  liquidityStatus: 'Healthy',
  liquidityRatio: 2.4,
};

// Cash Flow Data
export const cashFlowData: CashFlowData[] = [
  { month: 'Jul', inflow: 450000, outflow: 380000, net: 70000 },
  { month: 'Aug', inflow: 520000, outflow: 410000, net: 110000 },
  { month: 'Sep', inflow: 480000, outflow: 395000, net: 85000 },
  { month: 'Oct', inflow: 560000, outflow: 420000, net: 140000 },
  { month: 'Nov', inflow: 610000, outflow: 450000, net: 160000 },
  { month: 'Dec', inflow: 680000, outflow: 470000, net: 210000 },
];

export const liquidityData: LiquidityData = {
  cashInBank: 1847500,
  shortTermAssets: 1000000,
  totalLiquidity: 2847500,
};

export const investmentData: InvestmentData[] = [
  { type: 'Fixed Assets', amount: 2500000, percentage: 40, trend: 'stable' },
  { type: 'Equity Investments', amount: 1500000, percentage: 24, trend: 'up' },
  { type: 'IPO Holdings', amount: 750000, percentage: 12, trend: 'up' },
  { type: 'Mutual Funds', amount: 1000000, percentage: 16, trend: 'stable' },
  { type: 'Bonds', amount: 500000, percentage: 8, trend: 'down' },
];

export const riskIndicators = [
  { label: 'Liquidity Risk', status: 'low', value: 'Adequate reserves' },
  { label: 'Cash Flow Risk', status: 'low', value: 'Positive trend' },
  { label: 'Investment Risk', status: 'medium', value: 'Moderate volatility' },
  { label: 'Credit Risk', status: 'low', value: 'Strong counterparties' },
];

// Accounts Receivable Data
export const invoices: InvoiceData[] = [
  { id: 'INV-001', customer: 'Acme Corporation', amount: 125000, dueDate: '2024-01-15', status: 'overdue', daysOverdue: 45 },
  { id: 'INV-002', customer: 'TechFlow Inc.', amount: 87500, dueDate: '2024-02-01', status: 'current', daysOverdue: 0 },
  { id: 'INV-003', customer: 'Global Systems Ltd.', amount: 215000, dueDate: '2023-12-20', status: 'critical', daysOverdue: 72 },
  { id: 'INV-004', customer: 'Innovate Partners', amount: 95000, dueDate: '2024-01-28', status: 'overdue', daysOverdue: 32 },
  { id: 'INV-005', customer: 'Summit Holdings', amount: 156000, dueDate: '2024-02-10', status: 'current', daysOverdue: 0 },
  { id: 'INV-006', customer: 'Nexus Solutions', amount: 78000, dueDate: '2024-01-05', status: 'overdue', daysOverdue: 55 },
  { id: 'INV-007', customer: 'Alpine Industries', amount: 142000, dueDate: '2024-02-15', status: 'current', daysOverdue: 0 },
  { id: 'INV-008', customer: 'Coastal Enterprises', amount: 63000, dueDate: '2023-11-30', status: 'critical', daysOverdue: 92 },
];

export const agingBuckets: AgingBucket[] = [
  { range: '0-30 days', amount: 480500, count: 12, percentage: 38.6 },
  { range: '31-60 days', amount: 385000, count: 8, percentage: 30.9 },
  { range: '60+ days', amount: 379500, count: 5, percentage: 30.5 },
];

export const customerOutstanding = [
  { customer: 'Global Systems Ltd.', amount: 215000, invoices: 2 },
  { customer: 'Summit Holdings', amount: 156000, invoices: 1 },
  { customer: 'Alpine Industries', amount: 142000, invoices: 3 },
  { customer: 'Acme Corporation', amount: 125000, invoices: 2 },
  { customer: 'Innovate Partners', amount: 95000, invoices: 1 },
];

export const dsoData = {
  current: 42,
  previous: 38,
  industry: 45,
  trend: 'up' as const,
};

// Revenue Forecasting Data
export const forecastData: ForecastData[] = [
  { month: 'Jan', bestCase: 520000, expected: 450000, worstCase: 380000, pipeline: 620000 },
  { month: 'Feb', bestCase: 580000, expected: 490000, worstCase: 400000, pipeline: 710000 },
  { month: 'Mar', bestCase: 650000, expected: 540000, worstCase: 430000, pipeline: 820000 },
  { month: 'Apr', bestCase: 720000, expected: 600000, worstCase: 480000, pipeline: 890000 },
  { month: 'May', bestCase: 780000, expected: 650000, worstCase: 520000, pipeline: 950000 },
  { month: 'Jun', bestCase: 850000, expected: 710000, worstCase: 570000, pipeline: 1020000 },
];

export const forecastSummary = {
  q1Expected: 1480000,
  q2Expected: 1960000,
  annualForecast: 7280000,
  pipelineTotal: 5010000,
  conversionRate: 68.5,
};

// Revenue Leakage & Renewals Data
export const contractRenewals: ContractRenewal[] = [
  { id: 'CTR-001', customer: 'Enterprise Solutions', contractValue: 450000, renewalDate: '2024-02-28', status: 'upcoming', riskLevel: 'low' },
  { id: 'CTR-002', customer: 'DataCore Systems', contractValue: 280000, renewalDate: '2024-03-15', status: 'upcoming', riskLevel: 'medium' },
  { id: 'CTR-003', customer: 'CloudFirst Inc.', contractValue: 195000, renewalDate: '2024-01-31', status: 'missed', riskLevel: 'high' },
  { id: 'CTR-004', customer: 'Quantum Analytics', contractValue: 320000, renewalDate: '2024-04-01', status: 'upcoming', riskLevel: 'low' },
  { id: 'CTR-005', customer: 'Pinnacle Group', contractValue: 175000, renewalDate: '2024-02-10', status: 'missed', riskLevel: 'high' },
  { id: 'CTR-006', customer: 'Mercury Labs', contractValue: 420000, renewalDate: '2024-03-30', status: 'upcoming', riskLevel: 'medium' },
];

export const revenueLeakage: RevenueLeakage[] = [
  { type: 'Missed Renewals', amount: 370000, description: 'Contracts not renewed on time' },
  { type: 'Excessive Discounts', amount: 125000, description: 'Discounts exceeding policy limits' },
  { type: 'Billing Errors', amount: 45000, description: 'Uncaptured revenue from billing mistakes' },
  { type: 'Service Credits', amount: 78000, description: 'Credits issued for service issues' },
];

export const revenueAtRisk = {
  total: 618000,
  missedRenewals: 370000,
  atRiskContracts: 248000,
  percentageOfRevenue: 8.5,
};

// Quarterly Summary Data
export const quarterlySummary = {
  q1: { revenue: 1650000, expenses: 1320000, profit: 330000 },
  q2: { revenue: 1820000, expenses: 1410000, profit: 410000 },
  q3: { revenue: 1780000, expenses: 1380000, profit: 400000 },
  q4: { revenue: 2100000, expenses: 1540000, profit: 560000 },
};
