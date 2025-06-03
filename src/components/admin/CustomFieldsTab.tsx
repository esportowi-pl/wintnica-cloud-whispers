import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface CustomField {
  id: number;
  name: string;
  type: string;
  required: boolean;
  enabled: boolean;
  visibleToUsers: boolean;
  defaultValue: string;
  description: string;
  order: number;
}

interface CustomFieldsTabProps {
  initialCustomFields: CustomField[];
}

const CustomFieldsTab: React.FC<CustomFieldsTabProps> = ({ initialCustomFields }) => {
  const [customFields, setCustomFields] = useState<CustomField[]>(initialCustomFields);
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldType, setNewFieldType] = useState("text");
  const [editingField, setEditingField] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDefaultValue, setEditDefaultValue] = useState("");
  const [editRequired, setEditRequired] = useState(false);
  const [editEnabled, setEditEnabled] = useState(true);
  const [editVisibleToUsers, setEditVisibleToUsers] = useState(true);

  const handleAddField = () => {
    if (newFieldName.trim() === "") {
      toast.error("Nazwa pola nie może być pusta!");
      return;
    }

    const newField: CustomField = {
      id: Date.now(),
      name: newFieldName,
      type: newFieldType,
      required: false,
      enabled: true,
      visibleToUsers: true,
      defaultValue: "",
      description: "",
      order: customFields.length + 1,
    };

    setCustomFields([...customFields, newField]);
    setNewFieldName("");
    toast.success("Pole zostało dodane!");
  };

  const handleDeleteField = (id: number) => {
    setCustomFields(customFields.filter(field => field.id !== id));
    toast.success("Pole zostało usunięte!");
  };

  const startEdit = (field: CustomField) => {
    setEditingField(field.id);
    setEditName(field.name);
    setEditType(field.type);
    setEditDescription(field.description);
    setEditDefaultValue(field.defaultValue);
    setEditRequired(field.required);
    setEditEnabled(field.enabled);
    setEditVisibleToUsers(field.visibleToUsers);
  };

  const cancelEdit = () => {
    setEditingField(null);
  };

  const saveEdit = () => {
    if (!editingField) return;

    const updatedFields = customFields.map(field => {
      if (field.id === editingField) {
        return {
          ...field,
          name: editName,
          type: editType,
          description: editDescription,
          defaultValue: editDefaultValue,
          required: editRequired,
          enabled: editEnabled,
          visibleToUsers: editVisibleToUsers,
        };
      }
      return field;
    });

    setCustomFields(updatedFields);
    setEditingField(null);
    toast.success("Pole zostało zaktualizowane!");
  };

  const getFieldTypeLabel = (type: string) => {
    switch (type) {
      case "text": return "Tekst";
      case "textarea": return "Obszar tekstowy";
      case "select": return "Lista wyboru";
      case "checkbox": return "Pole wyboru";
      case "date": return "Data";
      case "number": return "Liczba";
      default: return "Nieznany";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Pola niestandardowe</span>
          <Button onClick={handleAddField}>
            <Plus className="h-4 w-4 mr-2" />
            Dodaj pole
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {customFields.map(field => (
            <div key={field.id} className="border rounded-lg p-4 space-y-4">
              {editingField === field.id ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nazwa pola</Label>
                    <Input 
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Nazwa pola"
                    />
                  </div>
                  
                  <div>
                    <Label>Typ pola</Label>
                    <Select value={editType} onValueChange={setEditType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Tekst</SelectItem>
                        <SelectItem value="textarea">Obszar tekstowy</SelectItem>
                        <SelectItem value="select">Lista wyboru</SelectItem>
                        <SelectItem value="checkbox">Pole wyboru</SelectItem>
                        <SelectItem value="date">Data</SelectItem>
                        <SelectItem value="number">Liczba</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="col-span-2">
                    <Label>Opis</Label>
                    <Input 
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      placeholder="Opis pola"
                    />
                  </div>
                  
                  <div>
                    <Label>Wartość domyślna</Label>
                    <Input 
                      value={editDefaultValue}
                      onChange={(e) => setEditDefaultValue(e.target.value)}
                      placeholder="Wartość domyślna"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={editRequired}
                        onCheckedChange={setEditRequired}
                      />
                      <Label>Wymagane</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={editEnabled}
                        onCheckedChange={setEditEnabled}
                      />
                      <Label>Aktywne</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={editVisibleToUsers}
                        onCheckedChange={setEditVisibleToUsers}
                      />
                      <Label>Widoczne dla użytkowników</Label>
                    </div>
                  </div>
                  
                  <div className="col-span-2 flex justify-end space-x-2">
                    <Button variant="outline" onClick={cancelEdit}>
                      <X className="h-4 w-4 mr-2" />
                      Anuluj
                    </Button>
                    <Button onClick={saveEdit}>
                      <Save className="h-4 w-4 mr-2" />
                      Zapisz
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-lg">{field.name}</h3>
                      <Badge variant="outline">{getFieldTypeLabel(field.type)}</Badge>
                      {field.required && <Badge variant="destructive">Wymagane</Badge>}
                      {!field.enabled && <Badge variant="secondary">Nieaktywne</Badge>}
                      {field.visibleToUsers && <Badge variant="default">Widoczne publicznie</Badge>}
                    </div>
                    
                    {field.description && (
                      <p className="text-muted-foreground text-sm">{field.description}</p>
                    )}
                    
                    {field.defaultValue && (
                      <p className="text-sm"><strong>Wartość domyślna:</strong> {field.defaultValue}</p>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => startEdit(field)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteField(field.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {customFields.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>Brak zdefiniowanych pól niestandardowych.</p>
              <p className="text-sm">Kliknij "Dodaj pole", aby utworzyć nowe pole.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomFieldsTab;
