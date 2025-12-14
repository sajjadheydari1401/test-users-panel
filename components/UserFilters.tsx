"use client";

import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { UserStatus } from "../types/user";

interface Props {
  search: string;
  filterStatus: "all" | UserStatus;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: "all" | UserStatus) => void;
}

export default function UserFilters({
  search,
  filterStatus,
  onSearchChange,
  onFilterChange,
}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        marginBottom: 3,
        flexWrap: "wrap",
      }}
    >
      <TextField
        label="Search users"
        variant="outlined"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{
          minWidth: 250,
          flexGrow: 1,
        }}
      />
      <FormControl
        variant="outlined"
        sx={{
          minWidth: 150,
        }}
      >
        <InputLabel>Status</InputLabel>
        <Select
          value={filterStatus}
          onChange={(e) => onFilterChange(e.target.value as "all" | UserStatus)}
          label="Status"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="suspended">Suspended</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
