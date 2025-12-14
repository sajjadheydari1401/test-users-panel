import create from "zustand";
import { persist } from "zustand/middleware";
import { mockUsers } from "../data/mockUsers";
import { UserStatus, User } from "../types/user";

type UserState = {
  users: User[];
  search: string;
  filterStatus: "all" | UserStatus;
  addUser: (u: Omit<User, "id" | "createdAt">) => void;
  updateUser: (id: string, patch: Partial<User>) => void;
  deleteUser: (id: string) => void;
  toggleStatus: (id: string) => void;
  setSearch: (s: string) => void;
  setFilterStatus: (s: "all" | UserStatus) => void;
  reset: () => void;
  getFilteredUsers: () => User[];
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      users: mockUsers,
      search: "",
      filterStatus: "all",
      addUser: (u) =>
        set((s) => ({
          users: [
            {
              ...u,
              id: String(Date.now()) + Math.random().toString(36).slice(2, 9),
              createdAt: new Date().toISOString(),
            },
            ...s.users,
          ],
        })),
      updateUser: (id, patch) =>
        set((s) => ({
          users: s.users.map((x) => (x.id === id ? { ...x, ...patch } : x)),
        })),
      deleteUser: (id) =>
        set((s) => ({ users: s.users.filter((x) => x.id !== id) })),
      toggleStatus: (id) =>
        set((s) => ({
          users: s.users.map((x) =>
            x.id === id
              ? { ...x, status: x.status === "active" ? "suspended" : "active" }
              : x
          ),
        })),
      setSearch: (s) => set(() => ({ search: s })),
      setFilterStatus: (s) => set(() => ({ filterStatus: s })),
      reset: () =>
        set(() => ({ users: mockUsers, search: "", filterStatus: "all" })),
      getFilteredUsers: () => {
        const { users, search, filterStatus } = get();
        return users.filter((user) => {
          const matchesSearch =
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.role.toLowerCase().includes(search.toLowerCase());
          const matchesFilter =
            filterStatus === "all" || user.status === filterStatus;
          return matchesSearch && matchesFilter;
        });
      },
    }),
    {
      name: "users-storage",
      getStorage: () =>
        typeof window !== "undefined" ? localStorage : (undefined as any),
    }
  )
);

export default useUserStore;
