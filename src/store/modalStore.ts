import { create } from "zustand";

export type ModalKey = "createBoard" | "createColumn" | "createTask" | "boardSwitch" | "boardOptions" | "columnOptions" | "taskOptions" | "taskInfo" | "renameBoard" | "renameColumn" | "renameTask";

export type ModalState = {
  modals: Record<ModalKey, boolean>;
  openModal: (name: ModalKey) => void;
  closeModal: (name: ModalKey) => void;
  toggleModal: (name: ModalKey) => void;
};

export const useModalStore = create<ModalState>((set) => ({
    modals: {
        createBoard: false,
        createColumn: false,
        createTask: false,
        boardSwitch: false,
        boardOptions: false,
        columnOptions: false,
        taskOptions: false,
        taskInfo: false,
        renameBoard: false,
        renameColumn: false,
        renameTask: false,
    },
    openModal: (name) =>
      set((state) => ({ modals: { ...state.modals, [name]: true } })),
    closeModal: (name) =>
      set((state) => ({ modals: { ...state.modals, [name]: false } })),
    toggleModal: (name) =>
      set((state) => ({
        modals: { ...state.modals, [name]: !state.modals[name] },
      })),
  }));