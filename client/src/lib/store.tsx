// store.js
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Store = {
  user: null | any;
  setUser: (inputUser: any) => void;
};
const useStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (inputUser: any) => set(() => ({ user: inputUser })),
      }),
      { name: "userStore" }
    )
  )
);

export default useStore;
