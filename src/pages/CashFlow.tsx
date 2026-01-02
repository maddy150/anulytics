import { Download, TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cashFlowData, liquidityData, investmentData, riskIndicators } from '@/data/financeData';
import { generateCashFlowReport } from '@/utils/pdfGenerator';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
};

const COLORS = ['hsl(217, 91%, 22%)', 'hsl(199, 89%, 48%)', 'hsl(142, 76%, 36%)', 'hsl(38, 92%, 50%)', 'hsl(215, 25%, 27%)'];

const CashFlow = () => {
  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-success" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const getRiskStatusColor = (status: string) => {
    if (status === 'low') return 'badge-success';
    if (status === 'medium') return 'badge-warning';
    return 'badge-danger';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Cash Flow & Capital Health</h2>
          <p className="mt-1 text-muted-foreground">Monitor liquidity, investments, and cash position</p>
        </div>
        <Button onClick={generateCashFlowReport} className="btn-executive">
          <Download className="mr-2 h-4 w-4" />
          Download Cash Flow Summary (PDF)
        </Button>
      </div>

      {/* Liquidity Overview */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="stat-card">
          <p className="text-sm font-medium text-muted-foreground">Cash in Bank</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{formatCurrency(liquidityData.cashInBank)}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm font-medium text-muted-foreground">Short-term Assets</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{formatCurrency(liquidityData.shortTermAssets)}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm font-medium text-muted-foreground">Total Liquidity</p>
          <p className="mt-2 text-2xl font-bold text-primary">{formatCurrency(liquidityData.totalLiquidity)}</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Cash Flow Chart */}
        <div className="finance-card-elevated">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Monthly Cash Flow</h3>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashFlowData}>
                <defs>
                  <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number, name: string) => [formatCurrency(value), name.charAt(0).toUpperCase() + name.slice(1)]}
                />
                <Area type="monotone" dataKey="inflow" stackId="1" stroke="hsl(142, 76%, 36%)" fill="hsl(142, 76%, 36%)" fillOpacity={0.3} name="Inflow" />
                <Area type="monotone" dataKey="outflow" stackId="2" stroke="hsl(0, 84%, 60%)" fill="hsl(0, 84%, 60%)" fillOpacity={0.3} name="Outflow" />
                <Area type="monotone" dataKey="net" stroke="hsl(199, 89%, 48%)" fillOpacity={1} fill="url(#colorNet)" name="Net" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Investment Allocation */}
        <div className="finance-card-elevated">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Investment Allocation</h3>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={investmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="amount"
                  nameKey="type"
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  labelLine={false}
                >
                  {investmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [formatCurrency(value)]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Investment Details Table */}
      <div className="finance-card-elevated">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Investment Details</h3>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Investment Type</th>
                <th>Amount</th>
                <th>Portfolio %</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {investmentData.map((investment) => (
                <tr key={investment.type}>
                  <td className="font-medium">{investment.type}</td>
                  <td>{formatCurrency(investment.amount)}</td>
                  <td>{investment.percentage}%</td>
                  <td className="flex items-center gap-2">
                    {getTrendIcon(investment.trend)}
                    <span className="capitalize">{investment.trend}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Risk Indicators */}
      <div className="finance-card-elevated">
        <div className="mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <h3 className="text-lg font-semibold text-foreground">Risk Indicators</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {riskIndicators.map((indicator) => (
            <div key={indicator.label} className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{indicator.label}</span>
                <span className={getRiskStatusColor(indicator.status)}>{indicator.status}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{indicator.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CashFlow;
