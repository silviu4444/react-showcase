import { create } from "zustand";

type IsUploadingState = {
  isUploadingPhotos: boolean;
  setIsUploading: (isUploading: boolean) => void;
};

export const useIsUploadingPhotos = create<IsUploadingState>((set) => ({
  isUploadingPhotos: false,
  setIsUploading: (isUploadingPhotos: boolean) => set({ isUploadingPhotos })
}));
