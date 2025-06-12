import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";

import { IFormattedPermissions } from "../lib/permissions/schemas";

const defaultValueUser: any = {
  userName: "",
  name: "",
  lastName: "",
  role: {
    id: 0,
    name: "",
    roleProcess: [],
  },
  permissions: {} as IFormattedPermissions,
  sidebarAbleModules: [],
  accessToken: "",
  refreshToken: "",

  userAlmacenadora: [],
  userHeadquarter: [],
  userPort: [],
};

interface IAuthStore {
  user: any;
  setUser: (user: any) => void;
  reset: () => void;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      user: { ...defaultValueUser },
      setUser: (user: any) => set({ user }),
      reset: () => set({ user: { ...defaultValueUser } }),
      otpType: null,
    }),
    { name: "auth", storage: createJSONStorage(() => sessionStorage) },
  ),
);
