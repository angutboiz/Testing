// store.js
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Store = {
  user: null | any;
  profile: null | any;
  setUser: (inputUser: any) => void;
  setProfile: (inputProfile: any) => void;
};
const useStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        profile: null,
        setUser: (inputUser: any) => set(() => ({ user: inputUser })),
        setProfile: (inputProfile: any) =>
          set(() => ({ profile: inputProfile })),
      }),
      { name: "userStore" }
    )
  )
);

export default useStore;
