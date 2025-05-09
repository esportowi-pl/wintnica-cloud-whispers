
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Code, Trash2, Play, RefreshCw, Database } from 'lucide-react';

interface LogEntry {
  id: number;
  timestamp: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  source?: string;
}

const DebuggerPanel: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>(['info', 'warning', 'error']);
  
  // Mock function to simulate getting logs
  const generateMockLogs = () => {
    const newLogs: LogEntry[] = [
      {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        type: 'info',
        message: 'Application started successfully',
        source: 'system'
      },
      {
        id: Date.now() + 1,
        timestamp: new Date().toISOString(),
        type: 'warning',
        message: 'Content cache may be outdated',
        source: 'content-service'
      },
      {
        id: Date.now() + 2,
        timestamp: new Date().toISOString(),
        type: 'error',
        message: 'Failed to load user preferences',
        source: 'user-service'
      }
    ];
    
    setLogs(prev => [...newLogs, ...prev]);
  };
  
  useEffect(() => {
    // Initialize with some mock logs
    generateMockLogs();
  }, []);
  
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };
  
  const clearLogs = () => {
    setLogs([]);
  };
  
  const refreshLogs = () => {
    generateMockLogs();
  };
  
  const getLogBadge = (type: string) => {
    switch (type) {
      case 'info':
        return <Badge className="bg-blue-500">Info</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500">Warning</Badge>;
      case 'error':
        return <Badge className="bg-red-500">Error</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const filteredLogs = logs.filter(log => activeFilters.includes(log.type));

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              <span>System Debugger</span>
            </CardTitle>
            <CardDescription>Monitoruj i debuguj system w czasie rzeczywistym</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={refreshLogs}>
              <RefreshCw className="h-4 w-4 mr-1" />
              Odśwież
            </Button>
            <Button variant="destructive" size="sm" onClick={clearLogs}>
              <Trash2 className="h-4 w-4 mr-1" />
              Wyczyść
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="logs">
          <TabsList className="mb-4">
            <TabsTrigger value="logs" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span>Logi systemowe</span>
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>Zapytania DB</span>
            </TabsTrigger>
            <TabsTrigger value="console" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              <span>Konsola</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="logs" className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button 
                variant={activeFilters.includes('info') ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => toggleFilter('info')}
              >
                Info
              </Button>
              <Button 
                variant={activeFilters.includes('warning') ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => toggleFilter('warning')}
              >
                Ostrzeżenia
              </Button>
              <Button 
                variant={activeFilters.includes('error') ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => toggleFilter('error')}
              >
                Błędy
              </Button>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <div className="bg-muted px-4 py-2 border-b">
                <div className="grid grid-cols-12 gap-4 font-medium text-sm">
                  <div className="col-span-2">Czas</div>
                  <div className="col-span-2">Typ</div>
                  <div className="col-span-2">Źródło</div>
                  <div className="col-span-6">Wiadomość</div>
                </div>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <div key={log.id} className="grid grid-cols-12 gap-4 px-4 py-3 border-b text-sm">
                      <div className="col-span-2 text-muted-foreground">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </div>
                      <div className="col-span-2">
                        {getLogBadge(log.type)}
                      </div>
                      <div className="col-span-2 font-mono">
                        {log.source}
                      </div>
                      <div className="col-span-6">
                        {log.message}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-muted-foreground">
                    Brak logów do wyświetlenia
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="database">
            <div className="p-8 text-center text-muted-foreground">
              Monitorowanie zapytań bazodanowych będzie dostępne wkrótce...
            </div>
          </TabsContent>
          
          <TabsContent value="console">
            <div className="p-8 text-center text-muted-foreground">
              Konsola interaktywna będzie dostępna wkrótce...
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DebuggerPanel;
