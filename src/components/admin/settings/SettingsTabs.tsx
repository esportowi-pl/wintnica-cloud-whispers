
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Palette, Shield, Bell } from 'lucide-react';
import GeneralSettingsTab from './GeneralSettingsTab';
import AppearanceSettingsTab from './AppearanceSettingsTab';
import SecuritySettingsTab from './SecuritySettingsTab';
import NotificationSettingsTab from './NotificationSettingsTab';

interface SettingsTabsProps {
  siteName: string;
  setSiteName: (value: string) => void;
  siteDescription: string;
  setSiteDescription: (value: string) => void;
  contactEmail: string;
  setContactEmail: (value: string) => void;
  primaryColor: string;
  setPrimaryColor: (value: string) => void;
  passwordStrength: string;
  setPasswordStrength: (value: string) => void;
  loginAttempts: string;
  setLoginAttempts: (value: string) => void;
  requireEmailVerification: boolean;
  setRequireEmailVerification: (value: boolean) => void;
  enableNotifications: boolean;
  setEnableNotifications: (value: boolean) => void;
  commentsRequireApproval: boolean;
  setCommentsRequireApproval: (value: boolean) => void;
}

const SettingsTabs: React.FC<SettingsTabsProps> = (props) => {
  return (
    <Tabs defaultValue="general" className="space-y-6">
      <TabsList>
        <TabsTrigger value="general" className="flex items-center gap-2">
          <Settings size={16} />
          <span>Ogólne</span>
        </TabsTrigger>
        <TabsTrigger value="appearance" className="flex items-center gap-2">
          <Palette size={16} />
          <span>Wygląd</span>
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center gap-2">
          <Shield size={16} />
          <span>Bezpieczeństwo</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell size={16} />
          <span>Powiadomienia</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="general">
        <GeneralSettingsTab 
          siteName={props.siteName}
          setSiteName={props.setSiteName}
          siteDescription={props.siteDescription}
          setSiteDescription={props.setSiteDescription}
          contactEmail={props.contactEmail}
          setContactEmail={props.setContactEmail}
          commentsRequireApproval={props.commentsRequireApproval}
          setCommentsRequireApproval={props.setCommentsRequireApproval}
        />
      </TabsContent>
      
      <TabsContent value="appearance">
        <AppearanceSettingsTab 
          primaryColor={props.primaryColor}
          setPrimaryColor={props.setPrimaryColor}
        />
      </TabsContent>
      
      <TabsContent value="security">
        <SecuritySettingsTab 
          passwordStrength={props.passwordStrength}
          setPasswordStrength={props.setPasswordStrength}
          loginAttempts={props.loginAttempts}
          setLoginAttempts={props.setLoginAttempts}
          requireEmailVerification={props.requireEmailVerification}
          setRequireEmailVerification={props.setRequireEmailVerification}
        />
      </TabsContent>
      
      <TabsContent value="notifications">
        <NotificationSettingsTab 
          enableNotifications={props.enableNotifications}
          setEnableNotifications={props.setEnableNotifications}
        />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
