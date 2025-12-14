export type UserStatus = "active" | "suspended";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  createdAt: string;
};
