
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User, ShieldAlert } from 'lucide-react';
import UsersTable from './users/UsersTable';
import UserEditDialog from './users/UserEditDialog';
import UserDeleteDialog from './users/UserDeleteDialog';
import { User as UserType } from './types/user';

interface UsersTabProps {
  users: UserType[];
  getStatusBadge: (status: string) => React.ReactNode;
}

const UsersTab: React.FC<UsersTabProps> = ({ users: initialUsers, getStatusBadge }) => {
  const [users, setUsers] = useState<UserType[]>(initialUsers);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [editedUsername, setEditedUsername] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedRole, setEditedRole] = useState("");
  const [editedStatus, setEditedStatus] = useState("");

  const handleEdit = (user: UserType) => {
    setSelectedUser(user);
    setEditedUsername(user.username);
    setEditedEmail(user.email);
    setEditedRole(user.role);
    setEditedStatus(user.status);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (user: UserType) => {
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
        <UsersTable 
          users={users}
          getStatusBadge={getStatusBadge}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <UserEditDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          selectedUser={selectedUser}
          editedUsername={editedUsername}
          setEditedUsername={setEditedUsername}
          editedEmail={editedEmail}
          setEditedEmail={setEditedEmail}
          editedRole={editedRole}
          setEditedRole={setEditedRole}
          editedStatus={editedStatus}
          setEditedStatus={setEditedStatus}
          onConfirm={confirmEdit}
        />

        <UserDeleteDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          selectedUser={selectedUser}
          onConfirm={confirmDelete}
        />
      </CardContent>
    </Card>
  );
};

export default UsersTab;
