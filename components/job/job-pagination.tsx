import { cn } from '@/lib/utils';
import { TJobFilterSchema } from '@/types/job-schema';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  filterValue: TJobFilterSchema;
};

export default function Pagination({
  currentPage,
  totalPages,
  filterValue: { query, type, location },
}: PaginationProps) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(query && { query }),
      ...(type && { type }),
      ...(location && { location }),
      page: page.toString(),
    });

    return `/?${searchParams.toString()}`;
  }

  return (
    <div className="flex justify-between ">
      <span className="">
        Page <b>{currentPage} </b>of {totalPages}
      </span>
      <div className="flex gap-4">
        <Link
          href={generatePageLink(currentPage - 1)}
          className={cn(
            'flex bg-primary-foreground px-2 py-1 rounded-lg items-center gap-2 font-semibold text-blue-500 hover:text-blue-700',
            currentPage <= 1 && 'invisible'
          )}
        >
          <ArrowLeft size={16} />
          Previous
        </Link>
        <Link
          href={generatePageLink(currentPage + 1)}
          className={cn(
            'flex bg-primary-foreground px-2 py-1 rounded-lg items-center gap-2 font-semibold text-blue-500 hover:text-blue-700',
            currentPage >= totalPages && 'invisible'
          )}
        >
          Next
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
