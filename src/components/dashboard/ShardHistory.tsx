
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { pl } from 'date-fns/locale';
import { 
  PlusCircle, 
  MinusCircle, 
  Gift, 
  FileText, 
  MessageSquare, 
  CreditCard,
  ThumbsUp
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data for shard history
const mockShardHistory = [
  {
    id: 1,
    type: 'earning',
    amount: 25,
    description: 'Zarobek za artykuł "Nowy park w centrum Witnicy"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    source: 'article'
  },
  {
    id: 2,
    type: 'purchase',
    amount: -50,
    description: 'Zakup odznaki "Ekspert lokalny"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    source: 'badge'
  },
  {
    id: 3,
    type: 'earning',
    amount: 5,
    description: 'Komentarz pod artykułem "Festiwal Kultury"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 days ago
    source: 'comment'
  },
  {
    id: 4,
    type: 'earning',
    amount: 10,
    description: 'Dzienna misja: Dodaj 3 komentarze',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    source: 'mission'
  },
  {
    id: 5,
    type: 'purchase',
    amount: -100,
    description: 'Zakup subskrypcji Premium (1 miesiąc)',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    source: 'subscription'
  },
  {
    id: 6,
    type: 'earning',
    amount: 15,
    description: 'Like dla artykułu "Wyniki lokalnych zawodów"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4 days ago
    source: 'like'
  },
  {
    id: 7,
    type: 'earning',
    amount: 50,
    description: 'Artykuł "Historia miasta w pigułce" oznaczony jako wyróżniony',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120), // 5 days ago
    source: 'featured'
  },
  {
    id: 8,
    type: 'earning',
    amount: 20,
    description: 'Tydzień aktywności - logowanie przez 7 dni z rzędu',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 144), // 6 days ago
    source: 'streak'
  }
];

// Icon mapping for different transaction types
const getTransactionIcon = (transaction: { type: string; source: string }) => {
  if (transaction.type === 'purchase') {
    return <MinusCircle className="h-5 w-5 text-red-500" />;
  }
  
  // Icons for earnings by source
  switch (transaction.source) {
    case 'article':
      return <FileText className="h-5 w-5 text-green-500" />;
    case 'comment':
      return <MessageSquare className="h-5 w-5 text-green-500" />;
    case 'mission':
      return <Gift className="h-5 w-5 text-green-500" />;
    case 'like':
      return <ThumbsUp className="h-5 w-5 text-green-500" />;
    default:
      return <PlusCircle className="h-5 w-5 text-green-500" />;
  }
};

interface ShardHistoryProps {
  limit?: number;
}

const ShardHistory: React.FC<ShardHistoryProps> = ({ limit }) => {
  const displayedHistory = limit ? mockShardHistory.slice(0, limit) : mockShardHistory;

  // Calculate total balance
  const currentBalance = mockShardHistory.reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <div>
      <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30 mb-4">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <span className="font-medium">Aktualny stan</span>
        </div>
        <span className="text-xl font-bold">{currentBalance} shardów</span>
      </div>
      
      <ScrollArea className={limit ? "h-[250px]" : "h-[500px]"}>
        <div className="space-y-3">
          {displayedHistory.map((transaction) => (
            <div 
              key={transaction.id} 
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {getTransactionIcon(transaction)}
                </div>
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(transaction.timestamp, { addSuffix: true, locale: pl })}
                  </p>
                </div>
              </div>
              <span className={`font-medium ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {transaction.amount > 0 ? '+' : ''}{transaction.amount}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ShardHistory;
