
import React from 'react';
import { Users, User, FileText, BarChart } from 'lucide-react';
import { Analytics } from './types/analytics';
import AnalyticsCard from './AnalyticsCard';

interface AnalyticsOverviewProps {
  analytics: Analytics;
}

const AnalyticsOverview: React.FC<AnalyticsOverviewProps> = ({ analytics }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <AnalyticsCard 
        title="Łączna liczba użytkowników" 
        value={analytics.usersTotal} 
        trend={analytics.usersTrend} 
        icon={Users} 
      />
      <AnalyticsCard 
        title="Aktywni dzisiaj" 
        value={analytics.activeToday} 
        trend={analytics.activeTodayTrend} 
        icon={User} 
      />
      <AnalyticsCard 
        title="Treści" 
        value={analytics.contentTotal} 
        trend={analytics.contentTrend} 
        icon={FileText} 
      />
      <AnalyticsCard 
        title="Wyświetlenia dzisiaj" 
        value={analytics.viewsToday} 
        trend={analytics.viewsTrend} 
        icon={BarChart} 
      />
    </div>
  );
};

export default AnalyticsOverview;
