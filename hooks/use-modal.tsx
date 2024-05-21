import { create } from "zustand";

type useModal = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useTerminalModal = create<useModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
