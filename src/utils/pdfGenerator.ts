import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  dashboardSummary,
  cashFlowData,
  liquidityData,
  investmentData,
  agingBuckets,
  invoices,
  forecastData,
  forecastSummary,
  contractRenewals,
  revenueLeakage,
  revenueAtRisk,
} from '@/data/financeData';

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const addHeader = (doc: jsPDF, title: string) => {
  doc.setFillColor(27, 54, 93);
  doc.rect(0, 0, 210, 30, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('ANULYTICS', 14, 15);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Watch your money grow.', 14, 22);
  
  doc.setFontSize(12);
  doc.text(title, 196, 18, { align: 'right' });
  
  doc.setTextColor(0, 0, 0);
};

const addFooter = (doc: jsPDF, pageNumber: number, totalPages: number) => {
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text(`Generated on ${new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}`, 14, 287);
  doc.text(`Page ${pageNumber} of ${totalPages}`, 196, 287, { align: 'right' });
  doc.text('Confidential - Internal Use Only', 105, 287, { align: 'center' });
};

export const generateCashFlowReport = () => {
  const doc = new jsPDF();
  
  addHeader(doc, 'Cash Flow Summary');
  
  let yPos = 45;
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Cash Flow Overview', 14, yPos);
  yPos += 10;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Total Liquidity: ${formatCurrency(liquidityData.totalLiquidity)}`, 14, yPos);
  yPos += 6;
  doc.text(`Cash in Bank: ${formatCurrency(liquidityData.cashInBank)}`, 14, yPos);
  yPos += 6;
  doc.text(`Short-term Assets: ${formatCurrency(liquidityData.shortTermAssets)}`, 14, yPos);
  yPos += 15;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Monthly Cash Flow', 14, yPos);
  yPos += 8;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Month', 'Inflow', 'Outflow', 'Net Cash Flow']],
    body: cashFlowData.map(row => [
      row.month,
      formatCurrency(row.inflow),
      formatCurrency(row.outflow),
      formatCurrency(row.net),
    ]),
    theme: 'striped',
    headStyles: { fillColor: [27, 54, 93] },
    styles: { fontSize: 9 },
  });
  
  yPos = (doc as any).lastAutoTable.finalY + 15;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Investment Allocation', 14, yPos);
  yPos += 8;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Investment Type', 'Amount', 'Portfolio %', 'Trend']],
    body: investmentData.map(row => [
      row.type,
      formatCurrency(row.amount),
      `${row.percentage}%`,
      row.trend.charAt(0).toUpperCase() + row.trend.slice(1),
    ]),
    theme: 'striped',
    headStyles: { fillColor: [27, 54, 93] },
    styles: { fontSize: 9 },
  });
  
  addFooter(doc, 1, 1);
  
  doc.save('Anulytics_Cash_Flow_Summary.pdf');
};

export const generateARReport = () => {
  const doc = new jsPDF();
  
  addHeader(doc, 'Accounts Receivable Report');
  
  let yPos = 45;
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Accounts Receivable Overview', 14, yPos);
  yPos += 10;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Total Outstanding: ${formatCurrency(dashboardSummary.totalReceivables)}`, 14, yPos);
  yPos += 15;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Aging Analysis', 14, yPos);
  yPos += 8;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Age Range', 'Amount', 'Invoice Count', '% of Total']],
    body: agingBuckets.map(row => [
      row.range,
      formatCurrency(row.amount),
      row.count.toString(),
      `${row.percentage}%`,
    ]),
    theme: 'striped',
    headStyles: { fillColor: [27, 54, 93] },
    styles: { fontSize: 9 },
  });
  
  yPos = (doc as any).lastAutoTable.finalY + 15;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Outstanding Invoices', 14, yPos);
  yPos += 8;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Invoice ID', 'Customer', 'Amount', 'Due Date', 'Status']],
    body: invoices.map(row => [
      row.id,
      row.customer,
      formatCurrency(row.amount),
      row.dueDate,
      row.status.charAt(0).toUpperCase() + row.status.slice(1),
    ]),
    theme: 'striped',
    headStyles: { fillColor: [27, 54, 93] },
    styles: { fontSize: 9 },
  });
  
  addFooter(doc, 1, 1);
  
  doc.save('Anulytics_AR_Report.pdf');
};

export const generateForecastReport = () => {
  const doc = new jsPDF();
  
  addHeader(doc, 'Revenue Forecast Report');
  
  let yPos = 45;
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Revenue Forecast Overview', 14, yPos);
  yPos += 10;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Q1 Expected Revenue: ${formatCurrency(forecastSummary.q1Expected)}`, 14, yPos);
  yPos += 6;
  doc.text(`Q2 Expected Revenue: ${formatCurrency(forecastSummary.q2Expected)}`, 14, yPos);
  yPos += 6;
  doc.text(`Annual Forecast: ${formatCurrency(forecastSummary.annualForecast)}`, 14, yPos);
  yPos += 6;
  doc.text(`Pipeline Total: ${formatCurrency(forecastSummary.pipelineTotal)}`, 14, yPos);
  yPos += 6;
  doc.text(`Conversion Rate: ${forecastSummary.conversionRate}%`, 14, yPos);
  yPos += 15;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Monthly Scenario Analysis', 14, yPos);
  yPos += 8;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Month', 'Best Case', 'Expected', 'Worst Case', 'Pipeline']],
    body: forecastData.map(row => [
      row.month,
      formatCurrency(row.bestCase),
      formatCurrency(row.expected),
      formatCurrency(row.worstCase),
      formatCurrency(row.pipeline),
    ]),
    theme: 'striped',
    headStyles: { fillColor: [27, 54, 93] },
    styles: { fontSize: 9 },
  });
  
  addFooter(doc, 1, 1);
  
  doc.save('Anulytics_Forecast_Report.pdf');
};

export const generateLeakageReport = () => {
  const doc = new jsPDF();
  
  addHeader(doc, 'Revenue Leakage Report');
  
  let yPos = 45;
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Revenue at Risk Summary', 14, yPos);
  yPos += 10;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Total Revenue at Risk: ${formatCurrency(revenueAtRisk.total)}`, 14, yPos);
  yPos += 6;
  doc.text(`Missed Renewals: ${formatCurrency(revenueAtRisk.missedRenewals)}`, 14, yPos);
  yPos += 6;
  doc.text(`At-Risk Contracts: ${formatCurrency(revenueAtRisk.atRiskContracts)}`, 14, yPos);
  yPos += 6;
  doc.text(`Percentage of Total Revenue: ${revenueAtRisk.percentageOfRevenue}%`, 14, yPos);
  yPos += 15;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Revenue Leakage Breakdown', 14, yPos);
  yPos += 8;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Leakage Type', 'Amount', 'Description']],
    body: revenueLeakage.map(row => [
      row.type,
      formatCurrency(row.amount),
      row.description,
    ]),
    theme: 'striped',
    headStyles: { fillColor: [27, 54, 93] },
    styles: { fontSize: 9 },
  });
  
  yPos = (doc as any).lastAutoTable.finalY + 15;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Contract Renewals', 14, yPos);
  yPos += 8;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Contract ID', 'Customer', 'Value', 'Renewal Date', 'Status', 'Risk']],
    body: contractRenewals.map(row => [
      row.id,
      row.customer,
      formatCurrency(row.contractValue),
      row.renewalDate,
      row.status.charAt(0).toUpperCase() + row.status.slice(1),
      row.riskLevel.charAt(0).toUpperCase() + row.riskLevel.slice(1),
    ]),
    theme: 'striped',
    headStyles: { fillColor: [27, 54, 93] },
    styles: { fontSize: 9 },
  });
  
  addFooter(doc, 1, 1);
  
  doc.save('Anulytics_Revenue_Leakage_Report.pdf');
};

export const generateFullReport = () => {
  const doc = new jsPDF();
  let currentPage = 1;
  const totalPages = 5;
  
  // Cover Page
  doc.setFillColor(27, 54, 93);
  doc.rect(0, 0, 210, 297, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(36);
  doc.setFont('helvetica', 'bold');
  doc.text('ANULYTICS', 105, 100, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'italic');
  doc.text('Watch your money grow.', 105, 115, { align: 'center' });
  
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Enterprise Financial Overview', 105, 150, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Report Generated: ${new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })}`, 105, 180, { align: 'center' });
  
  doc.setFontSize(10);
  doc.text('Confidential - Internal Use Only', 105, 270, { align: 'center' });
  
  // Page 2: Executive Summary
  doc.addPage();
  currentPage++;
  addHeader(doc, 'Executive Summary');
  
  let yPos = 45;
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Key Financial Indicators', 14, yPos);
  yPos += 12;
  
  const summaryData = [
    ['Net Cash Position', formatCurrency(dashboardSummary.netCashPosition), `${dashboardSummary.netCashChange > 0 ? '+' : ''}${dashboardSummary.netCashChange}%`],
    ['Total Receivables', formatCurrency(dashboardSummary.totalReceivables), `${dashboardSummary.receivablesChange}%`],
    ['Forecasted Revenue', formatCurrency(dashboardSummary.forecastedRevenue), `+${dashboardSummary.forecastChange}%`],
    ['Liquidity Status', dashboardSummary.liquidityStatus, `Ratio: ${dashboardSummary.liquidityRatio}`],
  ];
  
  autoTable(doc, {
    startY: yPos,
    head: [['Metric', 'Value', 'Change/Status']],
    body: summaryData,
    theme: 'striped',
    headStyles: { fillColor: [27, 54, 93] },
    styles: { fontSize: 10 },
  });
  
  yPos = (doc as any).lastAutoTable.finalY + 20;
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Risk Highlights', 14, yPos);
  yPos += 10;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('• Revenue at risk due to missed renewals: ' + formatCurrency(revenueAtRisk.missedRenewals), 14, yPos);
  yPos += 6;
  doc.text('• Total outstanding receivables over 60 days: ' + formatCurrency(agingBuckets[2].amount), 14, yPos);
  yPos += 6;
  doc.text('• Contracts at high renewal risk: 2', 14, yPos);
  
  addFooter(doc, currentPage, totalPages);
  
  // Page 3: Cash Flow & Capital Health
  doc.addPage();
  currentPage++;
  addHeader(doc, 'Cash Flow & Capital Health');
  
  yPos = 45;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Liquidity Position', 14, yPos);
  yPos += 8;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Category', 'Amount']],
    body: [
      ['Cash in Bank', formatCurrency(liquidityData.cashInBank)],
      ['Short-term Assets', formatCurrency(liquidityData.shortTermAssets)],
      ['Total Liquidity', formatCurrency(liquidityData.totalLiquidity)],
    ],
    theme: 'striped',
    headStyles: { fillColor: [27, 54, 93] },
    styles: { fontSize: 9 },
  });
  
  yPos = (doc as any).lastAutoTable.finalY + 15;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Monthly Cash Flow', 14, yPos);
  yPos += 8;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Month', 'Inflow', 'Outflow', 'Net']],
    body: cashFlowData.map(row => [
      row.month,
      formatCurrency(row.inflow),
      formatCurrency(row.outflow),
      formatCurrency(row.net),
    ]),
    theme: 'striped',
    headStyles: { fillColor: [27, 54, 93] },
    styles: { fontSize: 9 },
  });
  
  addFooter(doc, currentPage, totalPages);
  
  // Page 4: Accounts Receivable & Forecasting
  doc.addPage();
  currentPage++;
  addHeader(doc, 'Receivables & Forecasting');
  
  yPos = 45;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Aging Analysis', 14, yPos);
  yPos += 8;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Age Range', 'Amount', 'Count', '% of Total']],
    body: agingBuckets.map(row => [
      row.range,
      formatCurrency(row.amount),
      row.count.toString(),
      `${row.percentage}%`,
    ]),
    theme: 'striped',
    headStyles: { fillColor: [27, 54, 93] },
    styles: { fontSize: 9 },
  });
  
  yPos = (doc as any).lastAutoTable.finalY + 15;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Revenue Forecast (Next 6 Months)', 14, yPos);
  yPos += 8;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Month', 'Best Case', 'Expected', 'Worst Case']],
    body: forecastData.map(row => [
      row.month,
      formatCurrency(row.bestCase),
      formatCurrency(row.expected),
      formatCurrency(row.worstCase),
    ]),
    theme: 'striped',
    headStyles: { fillColor: [27, 54, 93] },
    styles: { fontSize: 9 },
  });
  
  addFooter(doc, currentPage, totalPages);
  
  // Page 5: Revenue Leakage & Renewals
  doc.addPage();
  currentPage++;
  addHeader(doc, 'Revenue Leakage & Renewals');
  
  yPos = 45;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Revenue Leakage Summary', 14, yPos);
  yPos += 8;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Category', 'Amount', 'Description']],
    body: revenueLeakage.map(row => [
      row.type,
      formatCurrency(row.amount),
      row.description,
    ]),
    theme: 'striped',
    headStyles: { fillColor: [27, 54, 93] },
    styles: { fontSize: 9 },
  });
  
  yPos = (doc as any).lastAutoTable.finalY + 15;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Contract Renewals', 14, yPos);
  yPos += 8;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Customer', 'Value', 'Date', 'Status', 'Risk']],
    body: contractRenewals.map(row => [
      row.customer,
      formatCurrency(row.contractValue),
      row.renewalDate,
      row.status,
      row.riskLevel,
    ]),
    theme: 'striped',
    headStyles: { fillColor: [27, 54, 93] },
    styles: { fontSize: 9 },
  });
  
  addFooter(doc, currentPage, totalPages);
  
  doc.save('Anulytics_Full_Finance_Report.pdf');
};
