import { TableCell, TableHead, TableRow } from "@mui/material";

export default function UserTableHeader() {
  return (
    <TableHead>
      <TableRow
        sx={{
          backgroundColor: "#f5f5f5",
        }}
      >
        <TableCell sx={{ fontWeight: "bold", color: "#555" }}>Name</TableCell>
        <TableCell sx={{ fontWeight: "bold", color: "#555" }}>Email</TableCell>
        <TableCell sx={{ fontWeight: "bold", color: "#555" }}>Role</TableCell>
        <TableCell sx={{ fontWeight: "bold", color: "#555" }}>Status</TableCell>
        <TableCell sx={{ fontWeight: "bold", color: "#555" }}>Created</TableCell>
        <TableCell sx={{ fontWeight: "bold", color: "#555" }}>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}