import { TableCell, TableRow, Chip, IconButton } from "@mui/material";
import { Edit, Delete, ToggleOn, ToggleOff } from "@mui/icons-material";
import { User } from "../types/user";

interface UserTableRowProps {
  user: User;
  onToggleStatus: (id: string) => void;
  onDeleteClick: (user: User) => void;
}

export default function UserTableRow({ user, onToggleStatus, onDeleteClick }: UserTableRowProps) {
  return (
    <TableRow
      key={user.id}
      sx={{
        "&:hover": {
          backgroundColor: "#f9f9f9",
        },
      }}
    >
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell>
        <Chip
          label={user.status}
          color={user.status === "active" ? "success" : "error"}
          size="small"
        />
      </TableCell>
      <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>
        <IconButton
          color="primary"
          onClick={() => onToggleStatus(user.id)}
          sx={{ mr: 1 }}
        >
          {user.status === "active" ? <ToggleOff /> : <ToggleOn />}
        </IconButton>
        <IconButton color="secondary" sx={{ mr: 1 }}>
          <Edit />
        </IconButton>
        <IconButton color="error" onClick={() => onDeleteClick(user)}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}