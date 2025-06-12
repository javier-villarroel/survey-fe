import { Icon123 } from "@tabler/icons-react";
import React from "react";
import { create } from "zustand";

interface ModalData {
	open?: boolean;
	Render?: React.ElementType;
	handleClose?: () => void;
}

interface ModalStore {
	data: ModalData;
	isOpen: boolean;
	onOpen: (data?: ModalData) => void;
	onClose: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
	type: null,
	data: {
		open: false,
		Render: undefined,
		handleClose: () => {},
	},
	isOpen: false,
	onOpen: (data = {}) => set({ isOpen: false, data }),
	onClose: () =>
		set({ isOpen: false, data: { open: false, Render: undefined } }),
}));
