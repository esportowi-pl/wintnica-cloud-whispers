
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Edit, Trash2, GripVertical } from 'lucide-react';
import { CustomField } from './types/customField';
import { toast } from "sonner";

interface CustomFieldsTabProps {
  initialCustomFields: CustomField[];
}

const CustomFieldsTab: React.FC<CustomFieldsTabProps> = ({ initialCustomFields }) => {
  const [customFields, setCustomFields] = useState<CustomField[]>(initialCustomFields);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingField, setEditingField] = useState<CustomField | null>(null);
  const [newField, setNewField] = useState<Partial<CustomField>>({
    name: '',
    type: 'text',
    required: false,
    enabled: true,
    visibleToUsers: true,
    defaultValue: '',
    description: ''
  });

  const handleToggleEnabled = (id: number) => {
    setCustomFields(fields => 
      fields.map(field => 
        field.id === id ? { ...field, enabled: !field.enabled } : field
      )
    );
    toast.success("Status pola został zaktualizowany");
  };

  const handleToggleRequired = (id: number) => {
    setCustomFields(fields => 
      fields.map(field => 
        field.id === id ? { ...field, required: !field.required } : field
      )
    );
    toast.success("Wymagalność pola została zaktualizowana");
  };

  const handleToggleVisibility = (id: number) => {
    setCustomFields(fields => 
      fields.map(field => 
        field.id === id ? { ...field, visibleToUsers: !field.visibleToUsers } : field
      )
    );
    toast.success("Widoczność pola została zaktualizowana");
  };

  const handleAddField = () => {
    if (!newField.name) {
      toast.error("Nazwa pola jest wymagana");
      return;
    }

    const field: CustomField = {
      id: Math.max(...customFields.map(f => f.id)) + 1,
      name: newField.name,
      type: newField.type || 'text',
      required: newField.required || false,
      enabled: newField.enabled !== false,
      visibleToUsers: newField.visibleToUsers !== false,
      defaultValue: newField.defaultValue || '',
      description: newField.description || '',
      order: customFields.length + 1
    };

    setCustomFields([...customFields, field]);
    setNewField({
      name: '',
      type: 'text',
      required: false,
      enabled: true,
      visibleToUsers: true,
      defaultValue: '',
      description: ''
    });
    setIsAddDialogOpen(false);
    toast.success("Nowe pole zostało dodane");
  };

  const handleDeleteField = (id: number) => {
    setCustomFields(fields => fields.filter(field => field.id !== id));
    toast.success("Pole zostało usunięte");
  };

  const handleEditField = (field: CustomField) => {
    setEditingField(field);
    setNewField({ ...field });
  };

  const handleUpdateField = () => {
    if (!newField.name || !editingField) {
      toast.error("Nazwa pola jest wymagana");
      return;
    }

    setCustomFields(fields => 
      fields.map(field => 
        field.id === editingField.id 
          ? { ...field, ...newField } as CustomField
          : field
      )
    );
    
    setEditingField(null);
    setNewField({
      name: '',
      type: 'text',
      required: false,
      enabled: true,
      visibleToUsers: true,
      defaultValue: '',
      description: ''
    });
    toast.success("Pole zostało zaktualizowane");
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Pola niestandardowe</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Zarządzaj dodatkowymi polami w formularzach użytkowników
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Dodaj pole
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dodaj nowe pole</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="field-name">Nazwa pola</Label>
                  <Input
                    id="field-name"
                    value={newField.name}
                    onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                    placeholder="np. Telefon kontaktowy"
                  />
                </div>
                
                <div>
                  <Label htmlFor="field-type">Typ pola</Label>
                  <Select 
                    value={newField.type} 
                    onValueChange={(value) => setNewField({ ...newField, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Tekst</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="number">Liczba</SelectItem>
                      <SelectItem value="date">Data</SelectItem>
                      <SelectItem value="select">Lista wyboru</SelectItem>
                      <SelectItem value="textarea">Obszar tekstowy</SelectItem>
                      <SelectItem value="checkbox">Pole wyboru</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="field-description">Opis</Label>
                  <Textarea
                    id="field-description"
                    value={newField.description}
                    onChange={(e) => setNewField({ ...newField, description: e.target.value })}
                    placeholder="Opisz przeznaczenie tego pola"
                  />
                </div>

                <div>
                  <Label htmlFor="field-default">Wartość domyślna</Label>
                  <Input
                    id="field-default"
                    value={newField.defaultValue}
                    onChange={(e) => setNewField({ ...newField, defaultValue: e.target.value })}
                    placeholder="Opcjonalna wartość domyślna"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="field-required"
                    checked={newField.required}
                    onCheckedChange={(checked) => setNewField({ ...newField, required: checked })}
                  />
                  <Label htmlFor="field-required">Pole wymagane</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="field-visible"
                    checked={newField.visibleToUsers}
                    onCheckedChange={(checked) => setNewField({ ...newField, visibleToUsers: checked })}
                  />
                  <Label htmlFor="field-visible">Widoczne dla użytkowników</Label>
                </div>

                <Button onClick={handleAddField} className="w-full">
                  Dodaj pole
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8"></TableHead>
              <TableHead>Nazwa</TableHead>
              <TableHead>Typ</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Wymagane</TableHead>
              <TableHead>Widoczne</TableHead>
              <TableHead>Opis</TableHead>
              <TableHead className="text-right">Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customFields.map((field) => (
              <TableRow key={field.id}>
                <TableCell>
                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                </TableCell>
                <TableCell className="font-medium">{field.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{field.type}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={field.enabled}
                      onCheckedChange={() => handleToggleEnabled(field.id)}
                      size="sm"
                    />
                    <Badge variant={field.enabled ? "default" : "secondary"}>
                      {field.enabled ? "Włączone" : "Wyłączone"}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={field.required}
                      onCheckedChange={() => handleToggleRequired(field.id)}
                      size="sm"
                    />
                    <span className="text-sm">{field.required ? "Tak" : "Nie"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={field.visibleToUsers}
                      onCheckedChange={() => handleToggleVisibility(field.id)}
                      size="sm"
                    />
                    <span className="text-sm">{field.visibleToUsers ? "Tak" : "Nie"}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                  {field.description}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditField(field)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteField(field.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {editingField && (
          <Dialog open={!!editingField} onOpenChange={() => setEditingField(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edytuj pole: {editingField.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-field-name">Nazwa pola</Label>
                  <Input
                    id="edit-field-name"
                    value={newField.name}
                    onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-field-type">Typ pola</Label>
                  <Select 
                    value={newField.type} 
                    onValueChange={(value) => setNewField({ ...newField, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Tekst</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="number">Liczba</SelectItem>
                      <SelectItem value="date">Data</SelectItem>
                      <SelectItem value="select">Lista wyboru</SelectItem>
                      <SelectItem value="textarea">Obszar tekstowy</SelectItem>
                      <SelectItem value="checkbox">Pole wyboru</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="edit-field-description">Opis</Label>
                  <Textarea
                    id="edit-field-description"
                    value={newField.description}
                    onChange={(e) => setNewField({ ...newField, description: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="edit-field-default">Wartość domyślna</Label>
                  <Input
                    id="edit-field-default"
                    value={newField.defaultValue}
                    onChange={(e) => setNewField({ ...newField, defaultValue: e.target.value })}
                  />
                </div>

                <Button onClick={handleUpdateField} className="w-full">
                  Zaktualizuj pole
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomFieldsTab;
