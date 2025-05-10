
import React from 'react';
import { Button } from "@/components/ui/button";
import { Shield } from 'lucide-react';

const PageHeader: React.FC = () => {
  return (
    <div className="flex flex-col mb-8">
      <div className="text-sm text-muted-foreground mb-2">
        <a href="/" className="hover:underline">Strona główna</a> &gt; <span>Panel administratora</span>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Panel Administracyjny</h1>
        <Button>
          <Shield className="mr-2 h-4 w-4" />
          Dziennik zdarzeń
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;
