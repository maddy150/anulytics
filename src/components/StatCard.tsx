import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'stable';
  className?: string;
}

export const StatCard = ({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  trend = 'stable',
  className,
}: StatCardProps) => {
  const getTrendIcon = () => {
    if (trend === 'up') return TrendingUp;
    if (trend === 'down') return TrendingDown;
    return Minus;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-destructive';
    return 'text-muted-foreground';
  };

  const TrendIcon = getTrendIcon();

  return (
    <div className={cn('stat-card', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
          {(change !== undefined || changeLabel) && (
            <div className="mt-2 flex items-center gap-1">
              <TrendIcon className={cn('h-4 w-4', getTrendColor())} />
              <span className={cn('text-sm font-medium', getTrendColor())}>
                {change !== undefined && `${change > 0 ? '+' : ''}${change}%`}
                {changeLabel && ` ${changeLabel}`}
              </span>
            </div>
          )}
        </div>
        <div className="rounded-lg bg-primary/10 p-3">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </div>
  );
};
