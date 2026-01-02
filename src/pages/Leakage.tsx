import { Download, AlertTriangle, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contractRenewals, revenueLeakage, revenueAtRisk } from '@/data/financeData';
import { generateLeakageReport } from '@/utils/pdfGenerator';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
};

const COLORS = ['hsl(0, 84%, 60%)', 'hsl(38, 92%, 50%)', 'hsl(199, 89%, 48%)', 'hsl(215, 25%, 27%)'];

const Leakage = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'badge-info';
      case 'missed':
        return 'badge-danger';
      case 'renewed':
        return 'badge-success';
      default:
        return 'badge-info';
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'badge-success';
      case 'medium':
        return 'badge-warning';
      case 'high':
        return 'badge-danger';
      default:
        return 'badge-info';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Revenue Leakage & Renewals</h2>
          <p className="mt-1 text-muted-foreground">Track contract renewals and identify revenue risks</p>
        </div>
        <Button onClick={generateLeakageReport} className="btn-executive">
          <Download className="mr-2 h-4 w-4" />
          Download Revenue Leakage Report (PDF)
        </Button>
      </div>

      {/* Revenue at Risk Summary */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="stat-card border-l-4 border-l-destructive">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <p className="text-sm font-medium text-muted-foreground">Total Revenue at Risk</p>
          </div>
          <p className="mt-2 text-2xl font-bold text-destructive">{formatCurrency(revenueAtRisk.total)}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm font-medium text-muted-foreground">Missed Renewals</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{formatCurrency(revenueAtRisk.missedRenewals)}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm font-medium text-muted-foreground">At-Risk Contracts</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{formatCurrency(revenueAtRisk.atRiskContracts)}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm font-medium text-muted-foreground">% of Total Revenue</p>
          <p className="mt-2 text-2xl font-bold text-warning">{revenueAtRisk.percentageOfRevenue}%</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Leakage Breakdown Chart */}
        <div className="finance-card-elevated">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Revenue Leakage Breakdown</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueLeakage} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => formatCurrency(value)} />
                <YAxis type="category" dataKey="type" stroke="hsl(var(--muted-foreground))" fontSize={12} width={120} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [formatCurrency(value), 'Amount']}
                />
                <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                  {revenueLeakage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Leakage Pie Chart */}
        <div className="finance-card-elevated">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Leakage Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueLeakage}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="amount"
                  nameKey="type"
                >
                  {revenueLeakage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
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
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {revenueLeakage.map((item, index) => (
              <div key={item.type} className="flex items-center gap-2 text-sm">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                <span className="text-muted-foreground">{item.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Leakage Details */}
      <div className="finance-card-elevated">
        <div className="mb-4 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-destructive" />
          <h3 className="text-lg font-semibold text-foreground">Revenue Leakage Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Leakage Type</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {revenueLeakage.map((item) => (
                <tr key={item.type}>
                  <td className="font-medium">{item.type}</td>
                  <td className="text-destructive font-medium">{formatCurrency(item.amount)}</td>
                  <td className="text-muted-foreground">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contract Renewals */}
      <div className="finance-card-elevated">
        <div className="mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-info" />
          <h3 className="text-lg font-semibold text-foreground">Contract Renewals</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Contract ID</th>
                <th>Customer</th>
                <th>Contract Value</th>
                <th>Renewal Date</th>
                <th>Status</th>
                <th>Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {contractRenewals.map((contract) => (
                <tr key={contract.id}>
                  <td className="font-mono text-sm">{contract.id}</td>
                  <td className="font-medium">{contract.customer}</td>
                  <td>{formatCurrency(contract.contractValue)}</td>
                  <td>{contract.renewalDate}</td>
                  <td>
                    <span className={getStatusBadge(contract.status)}>
                      {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <span className={getRiskBadge(contract.riskLevel)}>
                      {contract.riskLevel.charAt(0).toUpperCase() + contract.riskLevel.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leakage;
