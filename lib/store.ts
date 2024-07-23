import { activeJobIdState } from '@/types/job-schema';
import { create } from 'zustand';

export const useJobStore = create<activeJobIdState>((set) => ({
  activeJobId: 'null',
  setActiveJobId: (id: string) => set({ activeJobId: id }),
}));
