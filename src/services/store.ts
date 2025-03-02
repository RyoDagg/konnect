import { create } from 'zustand';
import { UserStore } from '../types/userTypes';

export const useStore = create<UserStore>(set => ({
  user: null,
  setUser: user => set({ user }),
}));
