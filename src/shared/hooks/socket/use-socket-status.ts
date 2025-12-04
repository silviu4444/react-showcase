import { create } from "zustand";

interface SocketStatusStore {
  connected: boolean;
  setIsConnected: (connected: boolean) => void;
}

export const useSocketStore = create<SocketStatusStore>((set, get) => ({
  connected: false,
  setIsConnected: (connected: boolean) => set({ ...get(), connected })
}));

export const useSocketStatus = () =>
  useSocketStore(({ connected }) => connected);
