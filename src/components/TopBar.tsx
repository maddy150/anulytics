import { Menu, Download } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from './ui/button';
import { generateFullReport } from '@/utils/pdfGenerator';

interface TopBarProps {
  title: string;
  onMenuClick: () => void;
}

export const TopBar = ({ title, onMenuClick }: TopBarProps) => {
  const handleDownload = () => {
    generateFullReport();
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Logo variant="compact" className="lg:hidden" />
          <Logo className="hidden lg:flex" />
        </div>

        {/* Center Section */}
        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-foreground hidden md:block">
          {title}
        </h1>

        {/* Right Section */}
        <Button 
          onClick={handleDownload}
          className="btn-executive gap-2"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Download Full Finance Report (PDF)</span>
          <span className="sm:hidden">Report</span>
        </Button>
      </div>
    </header>
  );
};
