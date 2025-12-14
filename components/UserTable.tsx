"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useUserStore } from "../stores/userStore";
import { User } from "../types/user";
import { UserFormData } from "../types/userForm";
import UserFilters from "./UserFilters";
import UserTableHeader from "./UserTableHeader";
import UserTableRow from "./UserTableRow";
import UserForm from "./UserForm";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import LoadingSpinner from "./LoadingSpinner";

export default function UserTable() {
  const {
    search,
    filterStatus,
    setSearch,
    setFilterStatus,
    deleteUser,
    toggleStatus,
    getFilteredUsers,
    addUser,
    updateUser,
    isLoading,
  } = useUserStore();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const filteredUsers = getFilteredUsers();

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleCreateUser = (data: UserFormData) => {
    addUser(data);
    setCreateDialogOpen(false);
  };

  const handleEditClick = (user: User) => {
    setUserToEdit(user);
    setEditDialogOpen(true);
  };

  const handleEditUser = (data: UserFormData) => {
    if (userToEdit) {
      updateUser(userToEdit.id, data);
      setEditDialogOpen(false);
      setUserToEdit(null);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ mb: 3, fontWeight: "bold", color: "#333" }}
          >
            User Management
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setCreateDialogOpen(true)}
            >
              Create User
            </Button>
          </Box>

          <UserFilters
            search={search}
            filterStatus={filterStatus}
            onSearchChange={setSearch}
            onFilterChange={setFilterStatus}
          />

          <TableContainer
            component={Paper}
            sx={{ boxShadow: "0 4px 6px rgba(0,0,0,0.1)", borderRadius: 2 }}
          >
            <Table>
              <UserTableHeader />
              <TableBody>
                {filteredUsers.map((user) => (
                  <UserTableRow
                    key={user.id}
                    user={user}
                    onToggleStatus={toggleStatus}
                    onDeleteClick={handleDeleteClick}
                    onEditClick={handleEditClick}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <DeleteConfirmationDialog
            open={deleteDialogOpen}
            user={userToDelete}
            onConfirm={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
          />

          <UserForm
            open={createDialogOpen}
            onClose={() => setCreateDialogOpen(false)}
            onSubmit={handleCreateUser}
            title="Create New User"
            submitLabel="Create"
          />

          <UserForm
            open={editDialogOpen}
            onClose={() => {
              setEditDialogOpen(false);
              setUserToEdit(null);
            }}
            onSubmit={handleEditUser}
            initialData={
              userToEdit
                ? {
                    name: userToEdit.name,
                    email: userToEdit.email,
                    role: userToEdit.role,
                    status: userToEdit.status,
                  }
                : undefined
            }
            title="Edit User"
            submitLabel="Update"
          />
        </>
      )}
    </Box>
  );
}
