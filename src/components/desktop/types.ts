
export interface WindowState {
  id: string;
  appId: string;
  title: string;
  component: React.ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  innerWidth?: number;
  innerHeight?: number;
}

export interface DesktopApp {
  id: string;
  name: string;
  icon: string;
  component: React.ReactNode;
  category: 'social' | 'productivity' | 'entertainment' | 'utilities';
  isPinned?: boolean;
}
