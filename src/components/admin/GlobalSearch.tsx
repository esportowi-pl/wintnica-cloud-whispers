
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface GlobalSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-8">
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input 
          placeholder="Szukaj użytkowników, treści, ustawień..." 
          className="pl-10 pr-16" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <kbd className="absolute top-1/2 transform -translate-y-1/2 right-3 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
    </div>
  );
};

export default GlobalSearch;
