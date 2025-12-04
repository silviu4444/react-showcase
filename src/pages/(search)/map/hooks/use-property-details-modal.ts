import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const usePropertyDetailsModal = create<ModalStore>((set) => ({
  data: null,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () =>
    set({
      isOpen: false
    })
}));
