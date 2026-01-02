import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { forecastData, forecastSummary } from '@/data/financeData';
import { generateForecastReport } from '@/utils/pdfGenerator';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
  Bar,
  Line,
} from 'recharts';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
};

const Forecasting = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Revenue Forecasting</h2>
          <p className="mt-1 text-muted-foreground">Probability-weighted projections and scenario analysis</p>
        </div>
        <Button onClick={generateForecastReport} className="btn-executive">
          <Download className="mr-2 h-4 w-4" />
          Download Forecast Report (PDF)
        </Button>
      </div>

      {/* Forecast Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="stat-card">
          <p className="text-sm font-medium text-muted-foreground">Q1 Expected</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{formatCurrency(forecastSummary.q1Expected)}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm font-medium text-muted-foreground">Q2 Expected</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{formatCurrency(forecastSummary.q2Expected)}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm font-medium text-muted-foreground">Annual Forecast</p>
          <p className="mt-2 text-2xl font-bold text-primary">{formatCurrency(forecastSummary.annualForecast)}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm font-medium text-muted-foreground">Pipeline Total</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{formatCurrency(forecastSummary.pipelineTotal)}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
          <p className="mt-2 text-2xl font-bold text-success">{forecastSummary.conversionRate}%</p>
        </div>
      </div>

      {/* Scenario Analysis Chart */}
      <div className="finance-card-elevated">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Scenario Analysis (Best / Expected / Worst)</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData}>
              <defs>
                <linearGradient id="colorBest" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorWorst" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.2} />
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
                formatter={(value: number, name: string) => [formatCurrency(value), name]}
              />
              <Legend />
              <Area type="monotone" dataKey="bestCase" name="Best Case" stroke="hsl(142, 76%, 36%)" fillOpacity={1} fill="url(#colorBest)" />
              <Area type="monotone" dataKey="expected" name="Expected" stroke="hsl(199, 89%, 48%)" fillOpacity={1} fill="url(#colorExpected)" />
              <Area type="monotone" dataKey="worstCase" name="Worst Case" stroke="hsl(0, 84%, 60%)" fillOpacity={1} fill="url(#colorWorst)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pipeline vs Expected */}
      <div className="finance-card-elevated">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Pipeline vs Expected Revenue</h3>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                formatter={(value: number, name: string) => [formatCurrency(value), name]}
              />
              <Legend />
              <Bar dataKey="pipeline" name="Pipeline" fill="hsl(215, 25%, 27%)" radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="expected" name="Expected Revenue" stroke="hsl(199, 89%, 48%)" strokeWidth={3} dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Projections Table */}
      <div className="finance-card-elevated">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Monthly Projections</h3>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Best Case</th>
                <th>Expected</th>
                <th>Worst Case</th>
                <th>Pipeline</th>
                <th>Variance Range</th>
              </tr>
            </thead>
            <tbody>
              {forecastData.map((row) => {
                const variance = ((row.bestCase - row.worstCase) / row.expected * 100).toFixed(1);
                return (
                  <tr key={row.month}>
                    <td className="font-medium">{row.month}</td>
                    <td className="text-success">{formatCurrency(row.bestCase)}</td>
                    <td className="text-info font-medium">{formatCurrency(row.expected)}</td>
                    <td className="text-destructive">{formatCurrency(row.worstCase)}</td>
                    <td>{formatCurrency(row.pipeline)}</td>
                    <td className="text-muted-foreground">±{variance}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Forecasting;
