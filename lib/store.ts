import prisma from '@/server/db';

import { Job } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type activeJobIdState = {
  activeJobId: string | null;
  setActiveJobId: (id: string) => void;
};

export const useJobStore = create<activeJobIdState>((set) => ({
  activeJobId: 'null',
  setActiveJobId: (id: string) => set({ activeJobId: id }),
}));

type bookmarksJob = {
  title: string;
  company: string;
  slug: string;
  save: Date;
};

export type bookmarksState = {
  bookmarks: bookmarksJob[];
  handleToggleBookmark: (job: bookmarksJob) => void;
};

export const useBookmarksStore = create<bookmarksState>()(
  persist(
    (set, get) => ({
      bookmarks: [] as bookmarksJob[],
      handleToggleBookmark: (job: bookmarksJob) => {
        const { bookmarks } = get();
        const isBookmarked = bookmarks.some(
          (bookmark) => bookmark.slug === job.slug
        );
        if (isBookmarked) {
          set({
            bookmarks: bookmarks.filter(
              (bookmark) => bookmark.slug !== job.slug
            ),
          });
        } else {
          set({ bookmarks: [...bookmarks, job] });
        }
      },
    }),
    { name: '7job-bookmarks' }
  )
);
