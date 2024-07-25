'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useBookmarksStore } from '@/lib/store';
import { daysAgo } from '@/lib/utils';

import { Bookmark, ChevronDown, MapPinIcon } from 'lucide-react';
import { Separator } from '../ui/separator';
import Link from 'next/link';
import BookmarkIcon from '../job/bookmark-icon';

export default function BookmarkMenu() {
  const { bookmarks } = useBookmarksStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center text-sm tracking-tighter gap-2">
        bookmarks
        <ChevronDown size={10} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-96 overflow-auto">
        <DropdownMenuLabel>Saved jobs</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {bookmarks.length === 0 ? (
          <DropdownMenuItem className="p-4">
            you don&apos;t have any saved jobs yet
          </DropdownMenuItem>
        ) : (
          bookmarks.map((bookmark) => (
            <DropdownMenuItem key={bookmark.slug} className="w-[300px]">
              <Link href={`/jobs/${bookmark.slug}`} className="w-full">
                <div className="flex gap-2 w-full">
                  <div className="w-[55px] h-[55px] rounded-md bg-muted flex justify-center items-center font-bold">
                    {bookmark.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="text-sm flex flex-col py-1 justify-between w-full">
                    <div className="flex justify-between w-full">
                      <p className="font-bold">{bookmark.title}</p>
                      <BookmarkIcon
                        title={bookmark.title}
                        company={bookmark.company}
                        slug={bookmark.slug}
                        size="16"
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-secondary-foreground italic">
                        {bookmark.company}
                      </p>
                      <p className="text-[10px]">
                        Saved&nbsp;{daysAgo(bookmark.save)}
                      </p>
                    </div>
                  </div>
                </div>
                <Separator className="w-full" />
              </Link>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
