
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { pl } from 'date-fns/locale';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { BarChart2, MessageSquare, ThumbsUp, Award, Star, FileText } from 'lucide-react';

// Mock activity data
const mockActivities = [
  {
    id: 1,
    type: 'comment',
    user: { name: 'Anna Nowak', avatar: '/placeholder.svg', initials: 'AN' },
    content: 'skomentowała artykuł "Nowy park w centrum Witnicy już otwarty!"',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    id: 2,
    type: 'like',
    user: { name: 'Piotr Kowalski', avatar: '/placeholder.svg', initials: 'PK' },
    content: 'polubił twój komentarz w artykule "Wyniki lokalnych zawodów sportowych"',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
  },
  {
    id: 3,
    type: 'achievement',
    user: { name: 'Marcin Wiśniewski', avatar: '/placeholder.svg', initials: 'MW' },
    content: 'zdobył odznakę "Popularny Autor"',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: 4,
    type: 'publish',
    user: { name: 'Karolina Dąbrowska', avatar: '/placeholder.svg', initials: 'KD' },
    content: 'opublikowała nowy artykuł "Przyszłość edukacji w Witnicy"',
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
  },
  {
    id: 5,
    type: 'rating',
    user: { name: 'Tomasz Lewandowski', avatar: '/placeholder.svg', initials: 'TL' },
    content: 'ocenił 5/5 twój artykuł "Nowa inwestycja w strefie przemysłowej"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
  },
  {
    id: 6,
    type: 'comment',
    user: { name: 'Aleksandra Wójcik', avatar: '/placeholder.svg', initials: 'AW' },
    content: 'skomentowała twój artykuł "Festiwal Kultury już w przyszły weekend"',
    timestamp: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
  },
  {
    id: 7,
    type: 'publish',
    user: { name: 'Michał Zieliński', avatar: '/placeholder.svg', initials: 'MZ' },
    content: 'opublikował nową ankietę "Co zmienić w centrum miasta?"',
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
  },
];

// Activity icon mapping
const ActivityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'comment':
      return <MessageSquare className="h-4 w-4" />;
    case 'like':
      return <ThumbsUp className="h-4 w-4" />;
    case 'achievement':
      return <Award className="h-4 w-4" />;
    case 'rating':
      return <Star className="h-4 w-4" />;
    case 'publish':
      return <FileText className="h-4 w-4" />;
    default:
      return <BarChart2 className="h-4 w-4" />;
  }
};

// Badge color mapping
const getBadgeVariant = (type: string) => {
  switch (type) {
    case 'comment':
      return 'outline';
    case 'like':
      return 'secondary';
    case 'achievement':
      return 'default';
    case 'rating':
      return 'secondary';
    case 'publish':
      return 'outline';
    default:
      return 'default';
  }
};

const ActivityFeed = () => {
  return (
    <ScrollArea className="h-[400px] rounded-md border p-4">
      <div className="space-y-4">
        {mockActivities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 p-2 rounded-lg hover:bg-muted/50">
            <Avatar>
              <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
              <AvatarFallback>{activity.user.initials}</AvatarFallback>
            </Avatar>
            
            <div className="flex-grow">
              <div className="flex items-center gap-2">
                <span className="font-medium">{activity.user.name}</span>
                <Badge variant={getBadgeVariant(activity.type)} className="flex items-center gap-1">
                  <ActivityIcon type={activity.type} />
                  <span className="text-xs">{activity.type}</span>
                </Badge>
                <span className="text-xs text-muted-foreground ml-auto">
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true, locale: pl })}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{activity.content}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ActivityFeed;
