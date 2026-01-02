import { Download, FileText, BarChart3, Receipt, TrendingUp, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  generateFullReport,
  generateCashFlowReport,
  generateARReport,
  generateForecastReport,
  generateLeakageReport,
} from '@/utils/pdfGenerator';

const reports = [
  {
    id: 'full',
    title: 'Full Finance Report',
    description: 'Comprehensive executive report covering all financial metrics, analysis, and recommendations.',
    icon: FileText,
    onDownload: generateFullReport,
    primary: true,
  },
  {
    id: 'cashflow',
    title: 'Cash Flow & Capital Health',
    description: 'Detailed analysis of cash position, liquidity, and investment allocations.',
    icon: BarChart3,
    onDownload: generateCashFlowReport,
  },
  {
    id: 'ar',
    title: 'Accounts Receivable Report',
    description: 'Invoice aging analysis, DSO metrics, and collection performance overview.',
    icon: Receipt,
    onDownload: generateARReport,
  },
  {
    id: 'forecast',
    title: 'Revenue Forecast Report',
    description: 'Probability-weighted projections with best, expected, and worst case scenarios.',
    icon: TrendingUp,
    onDownload: generateForecastReport,
  },
  {
    id: 'leakage',
    title: 'Revenue Leakage Report',
    description: 'Contract renewal status, missed opportunities, and revenue at risk analysis.',
    icon: AlertTriangle,
    onDownload: generateLeakageReport,
  },
];

const Reports = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Reports & Downloads</h2>
        <p className="mt-1 text-muted-foreground">Generate and download professional PDF reports</p>
      </div>

      {/* Reports Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <div
            key={report.id}
            className={`finance-card-elevated flex flex-col ${
              report.primary ? 'sm:col-span-2 lg:col-span-1 border-primary/30 bg-primary/5' : ''
            }`}
          >
            <div className="flex-1">
              <div className={`mb-4 inline-flex rounded-lg p-3 ${
                report.primary ? 'bg-primary/10' : 'bg-secondary'
              }`}>
                <report.icon className={`h-6 w-6 ${report.primary ? 'text-primary' : 'text-foreground'}`} />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{report.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{report.description}</p>
            </div>
            <Button
              onClick={report.onDownload}
              className={`mt-6 w-full ${report.primary ? 'btn-executive' : ''}`}
              variant={report.primary ? 'default' : 'outline'}
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        ))}
      </div>

      {/* Report Info */}
      <div className="finance-card">
        <h3 className="mb-4 text-lg font-semibold text-foreground">About Reports</h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            All reports are generated in PDF format and are designed to be professional, 
            boardroom-ready documents suitable for executive presentations.
          </p>
          <p>
            Reports include real-time data, charts, tables, and analysis summaries. 
            The Full Finance Report consolidates all modules into a single comprehensive document.
          </p>
          <p className="text-xs">
            Reports are marked as confidential and intended for internal use only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
