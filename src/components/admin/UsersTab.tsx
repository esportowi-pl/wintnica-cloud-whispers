
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Edit, Trash2, ShieldAlert, User } from 'lucide-react';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  status: string;
  joined: string;
}

interface UsersTabProps {
  users: User[];
  getStatusBadge: (status: string) => React.ReactNode;
}

const UsersTab: React.FC<UsersTabProps> = ({ users: initialUsers, getStatusBadge }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editedUsername, setEditedUsername] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedRole, setEditedRole] = useState("");
  const [editedStatus, setEditedStatus] = useState("");

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditedUsername(user.username);
    setEditedEmail(user.email);
    setEditedRole(user.role);
    setEditedStatus(user.status);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmEdit = () => {
    if (!selectedUser) return;
    
    const updatedUsers = users.map(user => 
      user.id === selectedUser.id 
        ? { 
            ...user, 
            username: editedUsername, 
            email: editedEmail,
            role: editedRole,
            status: editedStatus
          } 
        : user
    );
    
    setUsers(updatedUsers);
    setIsEditDialogOpen(false);
    toast.success("Użytkownik został zaktualizowany!");
  };

  const confirmDelete = () => {
    if (!selectedUser) return;
    
    const filteredUsers = users.filter(user => user.id !== selectedUser.id);
    setUsers(filteredUsers);
    setIsDeleteDialogOpen(false);
    toast.success("Użytkownik został usunięty!");
  };

  const handleAddUser = () => {
    // In a real app, this would open a user creation form
    toast.info("Otwieranie formularza dodawania użytkownika");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Zarządzanie użytkownikami</span>
          <Button onClick={handleAddUser}>
            <User className="h-4 w-4 mr-2" />
            Dodaj użytkownika
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nazwa użytkownika</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rola</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data dołączenia</TableHead>
              <TableHead>Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell>{user.joined}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(user)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edytuj
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(user)}>
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
                Czy na pewno chcesz usunąć użytkownika "{selectedUser?.username}"? Ta akcja jest nieodwracalna.
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

export default UsersTab;
