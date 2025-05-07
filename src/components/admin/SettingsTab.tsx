
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SettingsTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ustawienia portalu</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Ogólne</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div>Nazwa portalu</div>
                <div className="col-span-2">
                  <Input defaultValue="Witnica.info" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>Opis portalu</div>
                <div className="col-span-2">
                  <Input defaultValue="Portal miejski dla mieszkańców Witnicy" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>Email kontaktowy</div>
                <div className="col-span-2">
                  <Input defaultValue="kontakt@witnica.info" />
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Bezpieczeństwo</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div>Wymagana siła hasła</div>
                <div className="col-span-2">
                  <select className="w-full border rounded-md p-2">
                    <option>Niska</option>
                    <option selected>Średnia</option>
                    <option>Wysoka</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>Limit prób logowania</div>
                <div className="col-span-2">
                  <Input type="number" defaultValue="5" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button>Zapisz ustawienia</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsTab;
