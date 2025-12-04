import { create } from "zustand";

interface ModalData {
  redirectUrlAfterAuth?: string;
}

interface ModalStore {
  data: ModalData;
  isOpen: boolean;
  onOpen: (data?: ModalData) => void;
  onClose: () => void;
}

export const useAuthModal = create<ModalStore>((set) => ({
  isOpen: false,
  data: {},
  type: null,
  onOpen: (data = {}) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false })
}));
