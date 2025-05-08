
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

interface AdminSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder?: string;
}

const AdminSearch: React.FC<AdminSearchProps> = ({ 
  searchQuery, 
  setSearchQuery,
  placeholder = "Szukaj użytkowników, treści, ustawień..."
}) => {
  return (
    <div className="mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input 
          placeholder={placeholder} 
          className="pl-10 w-full max-w-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default AdminSearch;
