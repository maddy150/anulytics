import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  BarChart3, 
  Receipt, 
  TrendingUp, 
  AlertTriangle, 
  FileText, 
  LogOut 
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { path: '/cash-flow', label: 'Cash Flow & Capital Health', icon: TrendingUp },
  { path: '/receivables', label: 'Accounts Receivable', icon: Receipt },
  { path: '/forecasting', label: 'Revenue Forecasting', icon: BarChart3 },
  { path: '/leakage', label: 'Revenue Leakage & Renewals', icon: AlertTriangle },
  { path: '/reports', label: 'Reports & Downloads', icon: FileText },
];

export const Navigation = ({ isOpen, onClose }: NavigationProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Navigation Panel */}
          <motion.nav
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="fixed left-0 top-0 z-50 h-full w-72 bg-card border-r border-border shadow-finance-lg"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border px-4 py-4">
                <Logo />
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        cn('nav-link', isActive && 'active')
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-border p-4">
                <button
                  onClick={handleLogout}
                  className="nav-link w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};
