"use client";

import { useState } from "react";
import { Table, TableBody, TableContainer, Paper, Typography, Box } from "@mui/material";
import { useUserStore } from "../stores/userStore";
import { User } from "../types/user";
import UserFilters from "./UserFilters";
import UserTableHeader from "./UserTableHeader";
import UserTableRow from "./UserTableRow";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

export default function UserTable() {
  const { search, filterStatus, setSearch, setFilterStatus, deleteUser, toggleStatus, getFilteredUsers } = useUserStore();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

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

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: "bold", color: "#333" }}>
        User Management
      </Typography>

      <UserFilters
        search={search}
        filterStatus={filterStatus}
        onSearchChange={setSearch}
        onFilterChange={setFilterStatus}
      />

      <TableContainer component={Paper} sx={{ boxShadow: "0 4px 6px rgba(0,0,0,0.1)", borderRadius: 2 }}>
        <Table>
          <UserTableHeader />
          <TableBody>
            {filteredUsers.map((user) => (
              <UserTableRow
                key={user.id}
                user={user}
                onToggleStatus={toggleStatus}
                onDeleteClick={handleDeleteClick}
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
    </Box>
  );
}
