
import React, { useState, useEffect } from 'react';
import { Monitor, Cpu, MemoryStick, HardDrive, Zap, X, Minimize2, Maximize2, RefreshCw, Settings, AlertTriangle, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SystemProcess {
  id: string;
  name: string;
  type: 'app' | 'system' | 'widget';
  memoryUsage: number;
  cpuUsage: number;
  status: 'running' | 'suspended' | 'critical';
  startTime: string;
}

interface SystemStats {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  uptime: string;
}

const WitCommandCenter = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [systemStats, setSystemStats] = useState<SystemStats>({
    cpu: 23,
    memory: 67,
    disk: 45,
    network: 12,
    uptime: '2:34:12'
  });

  const [processes] = useState<SystemProcess[]>([
    { id: 'witword-1', name: 'WitWord Document.docx', type: 'app', memoryUsage: 156, cpuUsage: 15, status: 'running', startTime: '14:30:22' },
    { id: 'witcode-1', name: 'WitCode - main.tsx', type: 'app', memoryUsage: 234, cpuUsage: 8, status: 'running', startTime: '14:25:10' },
    { id: 'witpaint-1', name: 'WitPaint - Projekt1.png', type: 'app', memoryUsage: 89, cpuUsage: 3, status: 'running', startTime: '14:45:33' },
    { id: 'system-1', name: 'Desktop Manager', type: 'system', memoryUsage: 45, cpuUsage: 2, status: 'critical', startTime: '12:00:00' },
    { id: 'widget-1', name: 'Weather Widget', type: 'widget', memoryUsage: 12, cpuUsage: 1, status: 'running', startTime: '14:15:05' },
  ]);

  const [quickActions] = useState([
    { name: 'Restart Desktop', icon: '🔄', action: 'restart', color: 'bg-orange-500' },
    { name: 'Clear Cache', icon: '🧹', action: 'clear', color: 'bg-blue-500' },
    { name: 'Kill All Apps', icon: '⚡', action: 'killall', color: 'bg-red-500' },
    { name: 'Organize Windows', icon: '📐', action: 'organize', color: 'bg-green-500' },
    { name: 'Performance Mode', icon: '🚀', action: 'performance', color: 'bg-purple-500' },
    { name: 'Emergency Stop', icon: '🚨', action: 'emergency', color: 'bg-red-600' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats(prev => ({
        ...prev,
        cpu: Math.max(5, Math.min(95, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(10, Math.min(90, prev.memory + (Math.random() - 0.5) * 5)),
        network: Math.max(0, Math.min(100, Math.random() * 30)),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-500';
      case 'suspended': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'app': return '📱';
      case 'system': return '⚙️';
      case 'widget': return '🔧';
      default: return '❓';
    }
  };

  return (
    <div className="h-full bg-gray-900 text-white p-6 overflow-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Monitor className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">WITNICA Command Center</h1>
              <p className="text-gray-400">System Control & Monitoring Hub</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-green-400 border-green-400">
              ONLINE
            </Badge>
            <Badge variant="outline" className="text-blue-400 border-blue-400">
              {systemStats.uptime}
            </Badge>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Cpu className="w-8 h-8 text-blue-400" />
                <div className="text-right">
                  <div className="text-2xl font-bold">{systemStats.cpu}%</div>
                  <div className="text-sm text-gray-400">CPU Usage</div>
                </div>
              </div>
              <Progress value={systemStats.cpu} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <MemoryStick className="w-8 h-8 text-green-400" />
                <div className="text-right">
                  <div className="text-2xl font-bold">{systemStats.memory}%</div>
                  <div className="text-sm text-gray-400">Memory</div>
                </div>
              </div>
              <Progress value={systemStats.memory} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <HardDrive className="w-8 h-8 text-purple-400" />
                <div className="text-right">
                  <div className="text-2xl font-bold">{systemStats.disk}%</div>
                  <div className="text-sm text-gray-400">Storage</div>
                </div>
              </div>
              <Progress value={systemStats.disk} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Activity className="w-8 h-8 text-orange-400" />
                <div className="text-right">
                  <div className="text-2xl font-bold">{systemStats.network}%</div>
                  <div className="text-sm text-gray-400">Network</div>
                </div>
              </div>
              <Progress value={systemStats.network} className="mt-2" />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="processes">Processes</TabsTrigger>
          <TabsTrigger value="actions">Quick Actions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5" />
                  Active Windows
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {processes.filter(p => p.type === 'app').map(process => (
                    <div key={process.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{getTypeIcon(process.type)}</span>
                        <div>
                          <div className="font-medium">{process.name}</div>
                          <div className="text-sm text-gray-400">Started: {process.startTime}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(process.status)}>
                          {process.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Desktop Manager</span>
                    <Badge className="bg-green-500">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Window System</span>
                    <Badge className="bg-green-500">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Widget Engine</span>
                    <Badge className="bg-yellow-500">Warning</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Wallpaper Service</span>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Task Bar</span>
                    <Badge className="bg-green-500">Running</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="processes" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Process Manager</CardTitle>
                <Button size="sm" variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-2">Process</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-left p-2">Memory</th>
                      <th className="text-left p-2">CPU</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {processes.map(process => (
                      <tr key={process.id} className="border-b border-gray-700">
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <span>{getTypeIcon(process.type)}</span>
                            <span className="font-medium">{process.name}</span>
                          </div>
                        </td>
                        <td className="p-2">
                          <Badge variant="outline">{process.type}</Badge>
                        </td>
                        <td className="p-2">{process.memoryUsage} MB</td>
                        <td className="p-2">{process.cpuUsage}%</td>
                        <td className="p-2">
                          <Badge className={getStatusColor(process.status)}>
                            {process.status}
                          </Badge>
                        </td>
                        <td className="p-2">
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <Minimize2 className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Maximize2 className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="destructive">
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Powerful tools for system management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    className={`h-20 flex flex-col gap-2 ${action.color} hover:opacity-80 transition-opacity`}
                    onClick={() => console.log(`Action: ${action.action}`)}
                  >
                    <span className="text-2xl">{action.icon}</span>
                    <span className="text-sm font-medium">{action.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>System Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Advanced Settings
                </Button>
                <Button variant="outline" className="justify-start">
                  <Monitor className="w-4 h-4 mr-2" />
                  Display Configuration
                </Button>
                <Button variant="outline" className="justify-start">
                  <Zap className="w-4 h-4 mr-2" />
                  Power Management
                </Button>
                <Button variant="outline" className="justify-start">
                  <HardDrive className="w-4 h-4 mr-2" />
                  Storage Manager
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Command Center Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Auto-refresh processes</div>
                    <div className="text-sm text-gray-400">Automatically update process list every 5 seconds</div>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Show system processes</div>
                    <div className="text-sm text-gray-400">Display internal system processes in the list</div>
                  </div>
                  <input type="checkbox" className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Performance alerts</div>
                    <div className="text-sm text-gray-400">Notify when system resources are high</div>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Dark theme</div>
                    <div className="text-sm text-gray-400">Use dark theme for Command Center</div>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WitCommandCenter;
