
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface GlassStatsCardProps {
  icon: LucideIcon;
  title: string;
  value: number | string;
  subtitle: string;
  color: string;
  progress?: number;
  isAnimated?: boolean;
}

export const GlassStatsCard: React.FC<GlassStatsCardProps> = ({
  icon: Icon,
  title,
  value,
  subtitle,
  color,
  progress = 75,
  isAnimated = true
}) => {
  return (
    <div className={`backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 ${isAnimated ? 'hover:scale-105' : ''} cursor-pointer group`}>
      <div className="flex items-center gap-3 mb-4">
        <Icon className={`h-6 w-6 ${color} group-hover:scale-110 transition-transform duration-300`} />
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className={`text-3xl font-bold ${color} mb-2 transition-all duration-500`}>
        {typeof value === 'number' && value % 1 !== 0 ? value.toFixed(1) : value}
        {typeof value === 'number' && title === 'Energia' && '%'}
      </div>
      <div className="text-blue-200 text-sm mb-4">{subtitle}</div>
      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${getGradientForColor(color)} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const getGradientForColor = (color: string) => {
  if (color.includes('green')) return 'from-green-400 to-blue-400';
  if (color.includes('yellow')) return 'from-yellow-400 to-orange-400';
  if (color.includes('blue')) return 'from-blue-400 to-purple-400';
  return 'from-purple-400 to-pink-400';
};
