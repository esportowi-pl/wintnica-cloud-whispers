
import React from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CreateProfilePrompt: React.FC = () => {
  return (
    <div className="max-w-md mx-auto p-6 text-center space-y-4">
      <h2 className="text-2xl font-bold">Utwórz swój profil randkowy</h2>
      <p>Aby zacząć poznawać ludzi, musisz najpierw utworzyć swój profil.</p>
      <Button onClick={() => toast.info("Funkcja tworzenia profilu będzie dostępna wkrótce")}>
        Utwórz profil
      </Button>
    </div>
  );
};

export default CreateProfilePrompt;
