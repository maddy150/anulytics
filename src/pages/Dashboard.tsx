import { DollarSign, Receipt, TrendingUp, Activity } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { dashboardSummary, cashFlowData, quarterlySummary } from '@/data/financeData';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
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

const Dashboard = () => {
  const quarterlyData = [
    { quarter: 'Q1', revenue: quarterlySummary.q1.revenue, expenses: quarterlySummary.q1.expenses, profit: quarterlySummary.q1.profit },
    { quarter: 'Q2', revenue: quarterlySummary.q2.revenue, expenses: quarterlySummary.q2.expenses, profit: quarterlySummary.q2.profit },
    { quarter: 'Q3', revenue: quarterlySummary.q3.revenue, expenses: quarterlySummary.q3.expenses, profit: quarterlySummary.q3.profit },
    { quarter: 'Q4', revenue: quarterlySummary.q4.revenue, expenses: quarterlySummary.q4.expenses, profit: quarterlySummary.q4.profit },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Financial Overview</h2>
        <p className="mt-1 text-muted-foreground">Real-time financial metrics and performance indicators</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Net Cash Position"
          value={formatCurrency(dashboardSummary.netCashPosition)}
          change={dashboardSummary.netCashChange}
          icon={DollarSign}
          trend="up"
        />
        <StatCard
          title="Total Outstanding Receivables"
          value={formatCurrency(dashboardSummary.totalReceivables)}
          change={dashboardSummary.receivablesChange}
          icon={Receipt}
          trend="down"
        />
        <StatCard
          title="Forecasted Revenue"
          value={formatCurrency(dashboardSummary.forecastedRevenue)}
          change={dashboardSummary.forecastChange}
          icon={TrendingUp}
          trend="up"
        />
        <StatCard
          title="Liquidity Status"
          value={dashboardSummary.liquidityStatus}
          changeLabel={`Ratio: ${dashboardSummary.liquidityRatio}`}
          icon={Activity}
          trend="stable"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Cash Flow Trend */}
        <div className="finance-card-elevated">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Cash Flow Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashFlowData}>
                <defs>
                  <linearGradient id="colorInflow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorOutflow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0} />
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
                  formatter={(value: number) => [formatCurrency(value)]}
                />
                <Area
                  type="monotone"
                  dataKey="inflow"
                  stroke="hsl(142, 76%, 36%)"
                  fillOpacity={1}
                  fill="url(#colorInflow)"
                  name="Inflow"
                />
                <Area
                  type="monotone"
                  dataKey="outflow"
                  stroke="hsl(0, 84%, 60%)"
                  fillOpacity={1}
                  fill="url(#colorOutflow)"
                  name="Outflow"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quarterly Performance */}
        <div className="finance-card-elevated">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Quarterly Performance</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quarterlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="quarter" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [formatCurrency(value)]}
                />
                <Legend />
                <Bar dataKey="revenue" name="Revenue" fill="hsl(217, 91%, 22%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" name="Expenses" fill="hsl(215, 16%, 47%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" name="Profit" fill="hsl(142, 76%, 36%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
