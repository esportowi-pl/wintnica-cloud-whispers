
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface GeneralSettingsProps {
  siteName: string;
  setSiteName: (value: string) => void;
  siteDescription: string;
  setSiteDescription: (value: string) => void;
  contactEmail: string;
  setContactEmail: (value: string) => void;
  commentsRequireApproval: boolean;
  setCommentsRequireApproval: (value: boolean) => void;
}

const GeneralSettingsTab: React.FC<GeneralSettingsProps> = ({
  siteName,
  setSiteName,
  siteDescription,
  setSiteDescription,
  contactEmail,
  setContactEmail,
  commentsRequireApproval,
  setCommentsRequireApproval
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium mb-2">Podstawowe informacje</h3>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div>Nazwa portalu</div>
            <div className="col-span-2">
              <Input 
                value={siteName} 
                onChange={(e) => setSiteName(e.target.value)} 
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>Opis portalu</div>
            <div className="col-span-2">
              <Textarea 
                value={siteDescription} 
                onChange={(e) => setSiteDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>Email kontaktowy</div>
            <div className="col-span-2">
              <Input 
                value={contactEmail} 
                onChange={(e) => setContactEmail(e.target.value)} 
                type="email"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-lg font-medium mb-2">Moderacja treści</h3>
          <div className="flex items-center space-x-2">
            <Switch 
              id="comments-approval" 
              checked={commentsRequireApproval}
              onCheckedChange={setCommentsRequireApproval}
            />
            <Label htmlFor="comments-approval">Komentarze wymagają zatwierdzenia</Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettingsTab;
