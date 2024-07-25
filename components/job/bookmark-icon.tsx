'use client';
import { useBookmarksStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Job } from '@prisma/client';
import { Bookmark } from 'lucide-react';

type BookmarkIconProps = {
  title: string;
  company: string;
  slug: string;
  size?: string;
};

export default function BookmarkIcon({
  title,
  company,
  slug,
  size,
}: BookmarkIconProps) {
  const { bookmarks, handleToggleBookmark } = useBookmarksStore();
  const isBookmarked = bookmarks.some((bookmark) => bookmark.slug === slug);
  return (
    <button
      onClick={(e) => {
        handleToggleBookmark({
          title,
          company: company,
          slug,
          save: new Date(),
        });
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Bookmark
        size={size}
        className={cn(isBookmarked ? 'fill-blue-500' : '')}
      />
    </button>
  );
}
