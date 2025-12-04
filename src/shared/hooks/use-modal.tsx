import { create } from "zustand";

export type ModalType = "add-phone-number" | "change-user-role" | "lock-user";

export type ModalConfirmationData = {
  phoneNumber?: string | undefined;
};

export type ModalConfirmationDataKeys = keyof ModalConfirmationData;

interface ModalData {
  changeUserRole?: {
    userId: string;
  };
  lockUser?: {
    email: string
  }
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  confirmationData: ModalConfirmationData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  resetConfirmationData: () => void;
  onClose: (confirmationData?: {
    data: any;
    field: ModalConfirmationDataKeys;
  }) => void;
}

export const useModal = create<ModalStore>((set, get) => ({
  isOpen: false,
  confirmationData: {},
  data: {},
  type: null,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  resetConfirmationData: () => {
    set({ ...get(), confirmationData: {} });
  },
  onClose: (confirmationData?: {
    data: any;
    field: ModalConfirmationDataKeys;
  }) =>
    set({
      type: null,
      isOpen: false,
      confirmationData: confirmationData
        ? {
            ...get().confirmationData,
            [confirmationData.field]: confirmationData.data
          }
        : get().confirmationData
    })
}));
