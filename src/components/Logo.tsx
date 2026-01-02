import { TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'default' | 'light' | 'compact';
  className?: string;
}

export const Logo = ({ variant = 'default', className }: LogoProps) => {
  const isLight = variant === 'light';
  const isCompact = variant === 'compact';

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn(
        'flex items-center justify-center rounded-lg p-1.5',
        isLight ? 'bg-primary-foreground/10' : 'bg-primary'
      )}>
        <TrendingUp className={cn(
          'h-5 w-5',
          isLight ? 'text-primary-foreground' : 'text-primary-foreground'
        )} />
      </div>
      {!isCompact && (
        <span className={cn(
          'text-xl font-bold tracking-tight',
          isLight ? 'text-primary-foreground' : 'text-foreground'
        )}>
          Anulytics
        </span>
      )}
    </div>
  );
};
