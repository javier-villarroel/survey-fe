"use client";

import { create } from "zustand";

interface ISidebarAtom {
	isOpen: boolean;
	openSidebar: () => void;
	closeSidebar: () => void;
	toggleSidebar: () => void;
}

export const useSidebarStore = create<ISidebarAtom>((set) => ({
	isOpen: true,
	openSidebar: () => set({ isOpen: true }),
	closeSidebar: () => set({ isOpen: false }),
	toggleSidebar: () => set((prevState) => ({ isOpen: !prevState.isOpen })),
}));
