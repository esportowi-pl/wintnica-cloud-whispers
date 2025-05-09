
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { User } from '../types/user';

interface UserEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUser: User | null;
  editedUsername: string;
  setEditedUsername: (value: string) => void;
  editedEmail: string;
  setEditedEmail: (value: string) => void;
  editedRole: string;
  setEditedRole: (value: string) => void;
  editedStatus: string;
  setEditedStatus: (value: string) => void;
  onConfirm: () => void;
}

const UserEditDialog: React.FC<UserEditDialogProps> = ({
  isOpen,
  onClose,
  selectedUser,
  editedUsername,
  setEditedUsername,
  editedEmail,
  setEditedEmail,
  editedRole,
  setEditedRole,
  editedStatus,
  setEditedStatus,
  onConfirm
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edytuj użytkownika</DialogTitle>
          <DialogDescription>Wprowadź nowe dane dla użytkownika.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">Nazwa użytkownika</label>
            <Input
              id="username"
              value={editedUsername}
              onChange={(e) => setEditedUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input
              id="email"
              type="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium">Rola</label>
            <Select value={editedRole} onValueChange={setEditedRole}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Wybierz rolę" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="editor">Redaktor</SelectItem>
                <SelectItem value="user">Użytkownik</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium">Status</label>
            <Select value={editedStatus} onValueChange={setEditedStatus}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Wybierz status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Aktywny</SelectItem>
                <SelectItem value="inactive">Nieaktywny</SelectItem>
                <SelectItem value="suspended">Zawieszony</SelectItem>
                <SelectItem value="banned">Zablokowany</SelectItem>
                <SelectItem value="pending">Oczekujący</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Anuluj</Button>
          <Button onClick={onConfirm}>Zapisz zmiany</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserEditDialog;
