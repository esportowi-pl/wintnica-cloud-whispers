
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Info, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
  type?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = '' }) => {
  switch(status) {
    // User statuses
    case "active": return <Badge className="bg-green-500">Aktywny</Badge>;
    case "suspended": return <Badge className="bg-red-500">Zawieszony</Badge>;
    case "inactive": return <Badge className="bg-gray-500">Nieaktywny</Badge>;
    
    // Content statuses
    case "published": return <Badge className="bg-green-500">Opublikowany</Badge>;
    case "draft": return <Badge variant="outline">Szkic</Badge>;
    case "review": return <Badge variant="secondary">Do weryfikacji</Badge>;
    
    // Notification types
    case "info": return <Badge variant="secondary">Informacja</Badge>;
    case "warning": return <Badge className="bg-yellow-500">Ostrzeżenie</Badge>;
    case "error": return <Badge className="bg-red-500">Błąd</Badge>;
    case "success": return <Badge className="bg-green-500">Sukces</Badge>;
    
    // Field types
    case "text": return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Tekst</Badge>;
    case "textarea": return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">Długi tekst</Badge>;
    case "number": return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Liczba</Badge>;
    case "date": return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">Data</Badge>;
    case "select": return <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-300">Lista</Badge>;
    case "checkbox": return <Badge variant="outline" className="bg-pink-100 text-pink-800 border-pink-300">Checkbox</Badge>;
    
    default: return <Badge variant="outline">{status}</Badge>;
  }
};

export default StatusBadge;
