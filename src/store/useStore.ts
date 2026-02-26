import { create } from 'zustand';

interface AppState {
    currentSection: number;
    setCurrentSection: (section: number) => void;
}

export const useStore = create<AppState>((set) => ({
    currentSection: 0,
    setCurrentSection: (section) => set({ currentSection: section }),
}));
