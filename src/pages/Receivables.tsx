import { Download, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { invoices, agingBuckets, customerOutstanding, dsoData } from '@/data/financeData';
import { generateARReport } from '@/utils/pdfGenerator';
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

const COLORS = ['hsl(142, 76%, 36%)', 'hsl(38, 92%, 50%)', 'hsl(0, 84%, 60%)'];

const Receivables = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'current':
        return 'badge-success';
      case 'overdue':
        return 'badge-warning';
      case 'critical':
        return 'badge-danger';
      default:
        return 'badge-info';
    }
  };

  const totalOutstanding = agingBuckets.reduce((sum, bucket) => sum + bucket.amount, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Accounts Receivable</h2>
          <p className="mt-1 text-muted-foreground">Track invoices, aging analysis, and collection metrics</p>
        </div>
        <Button onClick={generateARReport} className="btn-executive">
          <Download className="mr-2 h-4 w-4" />
          Download AR Report (PDF)
        </Button>
      </div>

      {/* DSO Overview */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="stat-card">
          <p className="text-sm font-medium text-muted-foreground">Total Outstanding</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{formatCurrency(totalOutstanding)}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm font-medium text-muted-foreground">Current DSO</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{dsoData.current} days</p>
          <p className="mt-1 text-xs text-muted-foreground">Previous: {dsoData.previous} days</p>
        </div>
        <div className="stat-card">
          <p className="text-sm font-medium text-muted-foreground">Industry Avg DSO</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{dsoData.industry} days</p>
        </div>
        <div className="stat-card">
          <p className="text-sm font-medium text-muted-foreground">Overdue Invoices</p>
          <p className="mt-2 text-2xl font-bold text-destructive">
            {invoices.filter(inv => inv.status !== 'current').length}
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Aging Distribution Chart */}
        <div className="finance-card-elevated">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Aging Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agingBuckets} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => formatCurrency(value)} />
                <YAxis type="category" dataKey="range" stroke="hsl(var(--muted-foreground))" fontSize={12} width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [formatCurrency(value), 'Amount']}
                />
                <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                  {agingBuckets.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Aging Pie Chart */}
        <div className="finance-card-elevated">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Aging Breakdown</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={agingBuckets}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="amount"
                  nameKey="range"
                  label={({ range, percentage }) => `${range}: ${percentage}%`}
                  labelLine={false}
                >
                  {agingBuckets.map((entry, index) => (
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
        </div>
      </div>

      {/* Customer Outstanding */}
      <div className="finance-card-elevated">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Top Customers by Outstanding Amount</h3>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Outstanding Amount</th>
                <th>Invoice Count</th>
              </tr>
            </thead>
            <tbody>
              {customerOutstanding.map((customer) => (
                <tr key={customer.customer}>
                  <td className="font-medium">{customer.customer}</td>
                  <td>{formatCurrency(customer.amount)}</td>
                  <td>{customer.invoices}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Overdue Invoices */}
      <div className="finance-card-elevated">
        <div className="mb-4 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-warning" />
          <h3 className="text-lg font-semibold text-foreground">Overdue Invoices</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Days Overdue</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="font-mono text-sm">{invoice.id}</td>
                  <td className="font-medium">{invoice.customer}</td>
                  <td>{formatCurrency(invoice.amount)}</td>
                  <td>{invoice.dueDate}</td>
                  <td>{invoice.daysOverdue > 0 ? `${invoice.daysOverdue} days` : '-'}</td>
                  <td>
                    <span className={getStatusBadge(invoice.status)}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
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

export default Receivables;
