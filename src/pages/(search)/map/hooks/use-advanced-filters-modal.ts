import { QueryFiltersParamsKeys } from "@/shared/interfaces/property/property.interfaces";
import { create } from "zustand";

type ModalData = {
  focusFieldKey?: QueryFiltersParamsKeys;
};

interface ModalStore {
  data: ModalData;
  isOpen: boolean;
  onOpen: (data?: ModalData) => void;
  onClose: () => void;
}

export const useAdvancedFiltersModal = create<ModalStore>((set) => ({
  data: {},
  isOpen: false,
  onOpen: (data = {}) => set({ isOpen: true, data }),
  onClose: () =>
    set({
      isOpen: false,
      data: {}
    })
}));
