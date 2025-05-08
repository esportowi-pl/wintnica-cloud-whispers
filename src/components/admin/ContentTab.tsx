
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Edit, Trash2, Eye } from 'lucide-react';

interface Content {
  id: number;
  title: string;
  author: string;
  status: string;
  date: string;
  views: number;
}

interface ContentTabProps {
  content: Content[];
  getStatusBadge: (status: string) => React.ReactNode;
}

const ContentTab: React.FC<ContentTabProps> = ({ content: initialContent, getStatusBadge }) => {
  const [content, setContent] = useState<Content[]>(initialContent);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedStatus, setEditedStatus] = useState("");

  const handleEdit = (item: Content) => {
    setSelectedContent(item);
    setEditedTitle(item.title);
    setEditedStatus(item.status);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (item: Content) => {
    setSelectedContent(item);
    setIsDeleteDialogOpen(true);
  };

  const confirmEdit = () => {
    if (!selectedContent) return;
    
    const updatedContent = content.map(item => 
      item.id === selectedContent.id 
        ? { ...item, title: editedTitle, status: editedStatus } 
        : item
    );
    
    setContent(updatedContent);
    setIsEditDialogOpen(false);
    toast.success("Treść została zaktualizowana!");
  };

  const confirmDelete = () => {
    if (!selectedContent) return;
    
    const filteredContent = content.filter(item => item.id !== selectedContent.id);
    setContent(filteredContent);
    setIsDeleteDialogOpen(false);
    toast.success("Treść została usunięta!");
  };

  const handleView = (id: number) => {
    // In a real app, this would navigate to the content preview
    toast.info(`Podgląd treści o ID: ${id}`);
  };

  const handleAddContent = () => {
    // In a real app, this would navigate to content creation page
    toast.info("Przekierowanie do formularza dodawania treści");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Zarządzanie treściami</span>
          <Button onClick={handleAddContent}>Dodaj treść</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Tytuł</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Wyświetlenia</TableHead>
              <TableHead>Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {content.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.author}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.views}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edytuj
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleView(item.id)}>
                      <Eye className="h-4 w-4 mr-1" />
                      Podgląd
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(item)}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Usuń
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edytuj treść</DialogTitle>
              <DialogDescription>Wprowadź nowe dane dla treści.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Tytuł</label>
                <Input
                  id="title"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">Status</label>
                <Select value={editedStatus} onValueChange={setEditedStatus}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Wybierz status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Opublikowany</SelectItem>
                    <SelectItem value="draft">Szkic</SelectItem>
                    <SelectItem value="review">Do weryfikacji</SelectItem>
                    <SelectItem value="scheduled">Zaplanowany</SelectItem>
                    <SelectItem value="archived">Zarchiwizowany</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Anuluj</Button>
              <Button onClick={confirmEdit}>Zapisz zmiany</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Potwierdź usunięcie</DialogTitle>
              <DialogDescription>
                Czy na pewno chcesz usunąć treść "{selectedContent?.title}"? Ta akcja jest nieodwracalna.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Anuluj</Button>
              <Button variant="destructive" onClick={confirmDelete}>Usuń</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ContentTab;
