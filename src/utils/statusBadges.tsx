
import React from 'react';
import { Badge } from "@/components/ui/badge";

export const getStatusBadge = (status: string): React.ReactNode => {
  switch(status) {
    case "active": return <Badge className="bg-green-500">Aktywny</Badge>;
    case "suspended": return <Badge className="bg-red-500">Zawieszony</Badge>;
    case "inactive": return <Badge className="bg-gray-500">Nieaktywny</Badge>;
    case "published": return <Badge className="bg-green-500">Opublikowany</Badge>;
    case "draft": return <Badge variant="outline">Szkic</Badge>;
    case "review": return <Badge variant="secondary">Do weryfikacji</Badge>;
    case "info": return <Badge variant="secondary">Informacja</Badge>;
    case "warning": return <Badge className="bg-yellow-500">Ostrzeżenie</Badge>;
    case "error": return <Badge className="bg-red-500">Błąd</Badge>;
    case "success": return <Badge className="bg-green-500">Sukces</Badge>;
    default: return <Badge variant="outline">{status}</Badge>;
  }
};
