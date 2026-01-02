import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { TopBar } from './TopBar';
import { Navigation } from './Navigation';
import { PageTransition } from './PageTransition';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/cash-flow': 'Cash Flow & Capital Health',
  '/receivables': 'Accounts Receivable',
  '/forecasting': 'Revenue Forecasting',
  '/leakage': 'Revenue Leakage & Renewals',
  '/reports': 'Reports & Downloads',
};

export const DashboardLayout = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const pageTitle = pageTitles[location.pathname] || 'Dashboard';

  return (
    <div className="min-h-screen bg-background">
      <TopBar title={pageTitle} onMenuClick={() => setIsNavOpen(true)} />
      <Navigation isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
      
      <main className="container mx-auto px-4 py-6 lg:px-6 lg:py-8">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
    </div>
  );
};
