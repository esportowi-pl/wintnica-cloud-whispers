
import React, { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface UserStatsCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: ReactNode;
  trend?: number;
}

const UserStatsCard: React.FC<UserStatsCardProps> = ({ 
  title, 
  value, 
  description, 
  icon,
  trend 
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline mt-1">
              <p className="text-2xl font-semibold">{value}</p>
              
              {trend !== undefined && (
                <span className={`ml-2 flex items-center text-xs ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {trend >= 0 ? (
                    <>
                      <TrendingUp className="h-3 w-3 mr-0.5" />
                      +{trend}
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-3 w-3 mr-0.5" />
                      {trend}
                    </>
                  )}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          <div className="rounded-md p-2 bg-primary/10">
            <div className="text-primary">
              {icon}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserStatsCard;
