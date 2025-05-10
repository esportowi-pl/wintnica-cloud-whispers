
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PlusCircle, Edit, Trash, GripVertical, ChevronUp, ChevronDown, AlertCircle, FormInput, CheckSquare } from 'lucide-react';
import { CustomField } from './types/customField';
import StatusBadge from './StatusBadge';

interface CustomFieldsTabProps {
  initialCustomFields: CustomField[];
}

const CustomFieldsTab: React.FC<CustomFieldsTabProps> = ({ initialCustomFields }) => {
  const [customFields, setCustomFields] = useState<CustomField[]>(initialCustomFields);
  const [showCustomFieldForm, setShowCustomFieldForm] = useState(false);
  const [draggedFieldId, setDraggedFieldId] = useState<number | null>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  // Handle field reordering
  const moveField = (direction: 'up' | 'down', id: number) => {
    const fieldIndex = customFields.findIndex(field => field.id === id);
    if (
      (direction === 'up' && fieldIndex === 0) || 
      (direction === 'down' && fieldIndex === customFields.length - 1)
    ) return;
    
    const newFields = [...customFields];
    const fieldToMove = newFields[fieldIndex];
    
    if (direction === 'up') {
      newFields[fieldIndex] = newFields[fieldIndex - 1];
      newFields[fieldIndex - 1] = fieldToMove;
    } else {
      newFields[fieldIndex] = newFields[fieldIndex + 1];
      newFields[fieldIndex + 1] = fieldToMove;
    }
    
    // Update order numbers
    const reorderedFields = newFields.map((field, index) => ({
      ...field,
      order: index + 1
    }));
    
    setCustomFields(reorderedFields);
  };
  
  // Handle field deletion
  const deleteField = (id: number) => {
    setCustomFields(customFields.filter(field => field.id !== id));
  };

  // Handle field drag start
  const handleFieldDragStart = (id: number) => {
    setDraggedFieldId(id);
  };

  // Handle field drag over
  const handleFieldDragOver = (e: React.DragEvent, id: number) => {
    e.preventDefault();
    if (draggedFieldId === null || draggedFieldId === id) return;
    
    const draggedIndex = customFields.findIndex(field => field.id === draggedFieldId);
    const targetIndex = customFields.findIndex(field => field.id === id);
    
    if (draggedIndex === targetIndex) return;
    
    const newFields = [...customFields];
    const fieldToMove = newFields[draggedIndex];
    newFields.splice(draggedIndex, 1);
    newFields.splice(targetIndex, 0, fieldToMove);
    
    // Update order numbers
    const reorderedFields = newFields.map((field, index) => ({
      ...field,
      order: index + 1
    }));
    
    setCustomFields(reorderedFields);
  };

  // Handle field drag end
  const handleFieldDragEnd = () => {
    setDraggedFieldId(null);
  };

  // Form to add a new custom field
  const CustomFieldForm = () => (
    <Dialog open={showCustomFieldForm} onOpenChange={setShowCustomFieldForm}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Dodaj nowe pole niestandardowe</DialogTitle>
          <DialogDescription>
            Twórz własne pola dla profili użytkowników. Te pola będą widoczne podczas rejestracji i edycji profilu.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="field-name">Nazwa pola</Label>
              <Input id="field-name" placeholder="np. Ulubiona restauracja" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="field-type">Typ pola</Label>
              <Select>
                <SelectTrigger id="field-type">
                  <SelectValue placeholder="Wybierz typ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Tekst</SelectItem>
                  <SelectItem value="textarea">Długi tekst</SelectItem>
                  <SelectItem value="number">Liczba</SelectItem>
                  <SelectItem value="date">Data</SelectItem>
                  <SelectItem value="select">Lista wyboru</SelectItem>
                  <SelectItem value="checkbox">Checkbox</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="field-description">Opis (podpowiedź dla użytkownika)</Label>
            <Input id="field-description" placeholder="np. Podaj swoją ulubioną restaurację w Witnicy" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="field-default">Wartość domyślna (opcjonalnie)</Label>
            <Input id="field-default" placeholder="np. Park Miejski" />
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="field-required" className="cursor-pointer">Pole wymagane</Label>
              <Switch id="field-required" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="field-visible" className="cursor-pointer">Widoczne dla innych użytkowników</Label>
              <Switch id="field-visible" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="field-enabled" className="cursor-pointer">Pole aktywne</Label>
              <Switch id="field-enabled" defaultChecked />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowCustomFieldForm(false)}>Anuluj</Button>
          <Button onClick={() => {
            const newField = {
              id: customFields.length + 1,
              name: "Nowe pole",
              type: "text",
              required: false,
              enabled: true,
              visibleToUsers: true,
              defaultValue: "",
              description: "Opis pola",
              order: customFields.length + 1
            };
            setCustomFields([...customFields, newField]);
            setShowCustomFieldForm(false);
          }}>
            Dodaj pole
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Pola niestandardowe profilu</CardTitle>
            <CardDescription>Zarządzaj dodatkowymi polami widocznymi w profilach użytkowników.</CardDescription>
          </div>
          <Button onClick={() => setShowCustomFieldForm(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Dodaj nowe pole
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Informacja o polach niestandardowych</AlertTitle>
          <AlertDescription>
            Pola niestandardowe pozwalają na zbieranie dodatkowych informacji od użytkowników. 
            Będą one widoczne podczas rejestracji i edycji profilu. 
            Przeciągnij i upuść pola, aby zmienić ich kolejność.
          </AlertDescription>
        </Alert>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {customFields.map((field) => (
            <motion.div 
              key={field.id} 
              variants={itemVariants}
              draggable
              onDragStart={() => handleFieldDragStart(field.id)}
              onDragOver={(e) => handleFieldDragOver(e, field.id)}
              onDragEnd={handleFieldDragEnd}
              className={`border rounded-lg p-4 ${
                draggedFieldId === field.id ? 'border-primary bg-primary/5' : ''
              } hover:shadow-sm transition-shadow`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="cursor-move p-1 hover:bg-muted rounded">
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      {field.name}
                      <StatusBadge status={field.type} />
                      {field.required && <Badge variant="outline" className="text-xs">Wymagane</Badge>}
                    </h3>
                    <p className="text-sm text-muted-foreground">{field.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center mr-4 space-x-4">
                    <div className="flex items-center space-x-1">
                      <Label htmlFor={`visible-${field.id}`} className="text-sm text-muted-foreground">Widoczne</Label>
                      <Switch id={`visible-${field.id}`} checked={field.visibleToUsers} />
                    </div>
                    <div className="flex items-center space-x-1">
                      <Label htmlFor={`enabled-${field.id}`} className="text-sm text-muted-foreground">Aktywne</Label>
                      <Switch id={`enabled-${field.id}`} checked={field.enabled} />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Button variant="ghost" size="sm" onClick={() => moveField('up', field.id)} disabled={field.order === 1}>
                      <ChevronUp className="h-4 w-4" />
                      <span className="sr-only">W górę</span>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => moveField('down', field.id)} disabled={field.order === customFields.length}>
                      <ChevronDown className="h-4 w-4" />
                      <span className="sr-only">W dół</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edytuj</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500" onClick={() => deleteField(field.id)}>
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Usuń</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              {field.defaultValue && (
                <div className="mt-2 text-sm">
                  <span className="text-muted-foreground">Domyślna wartość:</span> {field.defaultValue}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
        
        {customFields.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <FormInput className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">Brak pól niestandardowych</h3>
            <p className="text-muted-foreground mb-4">
              Dodaj pola niestandardowe, aby zbierać dodatkowe informacje od użytkowników.
            </p>
            <Button onClick={() => setShowCustomFieldForm(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Dodaj pierwsze pole
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t flex justify-between">
        <div className="text-sm text-muted-foreground">
          {customFields.length} {customFields.length === 1 ? 'pole niestandardowe' : 
           customFields.length < 5 ? 'pola niestandardowe' : 'pól niestandardowych'}
        </div>
        <div>
          <Button variant="outline" disabled={customFields.length === 0}>
            <CheckSquare className="mr-2 h-4 w-4" />
            Zapisz zmiany
          </Button>
        </div>
      </CardFooter>

      {/* Custom Field Form Dialog */}
      <CustomFieldForm />
    </Card>
  );
};

export default CustomFieldsTab;
