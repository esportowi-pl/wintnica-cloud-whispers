
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import SettingsTabs from './settings/SettingsTabs';

const SettingsTab: React.FC = () => {
  const [siteName, setSiteName] = useState("Witnica.info");
  const [siteDescription, setSiteDescription] = useState("Portal miejski dla mieszkańców Witnicy");
  const [contactEmail, setContactEmail] = useState("kontakt@witnica.info");
  const [primaryColor, setPrimaryColor] = useState("#3b82f6");
  const [secondaryColor, setSecondaryColor] = useState("#64748b");
  const [headingFont, setHeadingFont] = useState("inter");
  const [bodyFont, setBodyFont] = useState("inter");
  const [fontSize, setFontSize] = useState(16);
  const [passwordStrength, setPasswordStrength] = useState("medium");
  const [loginAttempts, setLoginAttempts] = useState("5");
  const [requireEmailVerification, setRequireEmailVerification] = useState(true);
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [commentsRequireApproval, setCommentsRequireApproval] = useState(false);

  const handleSaveSettings = () => {
    // In a real app, this would save settings to a backend
    toast.success("Ustawienia zostały zapisane!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ustawienia portalu</CardTitle>
      </CardHeader>
      <CardContent>
        <SettingsTabs 
          siteName={siteName}
          setSiteName={setSiteName}
          siteDescription={siteDescription}
          setSiteDescription={setSiteDescription}
          contactEmail={contactEmail}
          setContactEmail={setContactEmail}
          primaryColor={primaryColor}
          setPrimaryColor={setPrimaryColor}
          secondaryColor={secondaryColor}
          setSecondaryColor={setSecondaryColor}
          headingFont={headingFont}
          setHeadingFont={setHeadingFont}
          bodyFont={bodyFont}
          setBodyFont={setBodyFont}
          fontSize={fontSize}
          setFontSize={setFontSize}
          passwordStrength={passwordStrength}
          setPasswordStrength={setPasswordStrength}
          loginAttempts={loginAttempts}
          setLoginAttempts={setLoginAttempts}
          requireEmailVerification={requireEmailVerification}
          setRequireEmailVerification={setRequireEmailVerification}
          enableNotifications={enableNotifications}
          setEnableNotifications={setEnableNotifications}
          commentsRequireApproval={commentsRequireApproval}
          setCommentsRequireApproval={setCommentsRequireApproval}
        />
        
        <div className="flex justify-end mt-6">
          <Button onClick={handleSaveSettings}>Zapisz ustawienia</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsTab;
