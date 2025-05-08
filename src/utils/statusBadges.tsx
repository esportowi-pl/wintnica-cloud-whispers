
import React from 'react';
import { Badge } from "@/components/ui/badge";

export const getStatusBadge = (status: string): React.ReactNode => {
  switch(status) {
    // User statuses
    case "active": return <Badge className="bg-green-500">Aktywny</Badge>;
    case "suspended": return <Badge className="bg-red-500">Zawieszony</Badge>;
    case "inactive": return <Badge className="bg-gray-500">Nieaktywny</Badge>;
    case "banned": return <Badge className="bg-black">Zablokowany</Badge>;
    case "pending": return <Badge className="bg-yellow-500">Oczekujący</Badge>;
    
    // Content statuses
    case "published": return <Badge className="bg-green-500">Opublikowany</Badge>;
    case "draft": return <Badge variant="outline">Szkic</Badge>;
    case "review": return <Badge variant="secondary">Do weryfikacji</Badge>;
    case "rejected": return <Badge className="bg-red-500">Odrzucony</Badge>;
    case "scheduled": return <Badge className="bg-blue-500">Zaplanowany</Badge>;
    case "archived": return <Badge className="bg-gray-400">Zarchiwizowany</Badge>;
    
    // Notification statuses
    case "info": return <Badge variant="secondary">Informacja</Badge>;
    case "warning": return <Badge className="bg-yellow-500">Ostrzeżenie</Badge>;
    case "error": return <Badge className="bg-red-500">Błąd</Badge>;
    case "success": return <Badge className="bg-green-500">Sukces</Badge>;
    
    // Comment statuses
    case "approved": return <Badge className="bg-green-500">Zatwierdzony</Badge>;
    case "flagged": return <Badge className="bg-yellow-500">Oznaczony</Badge>;
    case "deleted": return <Badge className="bg-gray-500">Usunięty</Badge>;
    
    default: return <Badge variant="outline">{status}</Badge>;
  }
};
