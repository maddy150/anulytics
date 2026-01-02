import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Shield, TrendingUp, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: BarChart3,
    title: 'Cash Flow Analytics',
    description: 'Monitor inflows, outflows, and net cash position in real-time.',
  },
  {
    icon: TrendingUp,
    title: 'Revenue Forecasting',
    description: 'Probability-weighted projections with scenario analysis.',
  },
  {
    icon: PieChart,
    title: 'Investment Tracking',
    description: 'Track fixed assets, equities, IPOs, and fund allocations.',
  },
  {
    icon: Shield,
    title: 'Risk Management',
    description: 'Identify revenue leakage and contract renewal risks.',
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/login">
            <Button variant="outline" size="sm" className="font-medium">
              Login
            </Button>
          </Link>
          <Logo />
          <div className="w-[70px]" /> {/* Spacer for balance */}
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-8 flex justify-center">
            <div className="rounded-2xl bg-primary p-4 shadow-finance-lg">
              <TrendingUp className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Anulytics
          </h1>
          
          <p className="mt-4 text-xl font-medium text-primary sm:text-2xl">
            Watch your money grow.
          </p>
          
          <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground">
            Anulytics is an internal finance analytics platform that helps administration teams 
            monitor cash flow, investments, receivables, forecasts, and financial risks — all in one place.
          </p>
          
          <div className="mt-10">
            <Link to="/login">
              <Button className="btn-executive h-12 px-8 text-base">
                Access Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border bg-card py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
              Enterprise-Grade Financial Intelligence
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
              Built for leadership decision-making with real-time data and meeting-ready reports.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="finance-card-elevated text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Anulytics. Internal Use Only.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
