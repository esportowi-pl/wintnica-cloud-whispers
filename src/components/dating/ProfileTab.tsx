
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { toast } from "sonner";
import { DatingProfile } from './types';

interface ProfileTabProps {
  userProfile: DatingProfile | null;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ userProfile }) => {
  return (
    <Card className="p-6 text-center">
      <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-xl font-bold mb-2">Twój profil</h3>
      <p className="text-muted-foreground mb-4">
        {userProfile?.display_name}, {userProfile?.age}
      </p>
      <Button onClick={() => toast.info("Edycja profilu będzie dostępna wkrótce")}>
        Edytuj profil
      </Button>
    </Card>
  );
};

export default ProfileTab;
