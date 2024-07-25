'use client';
import Image from 'next/image';
import { Banknote, Bookmark, Briefcase, MapPinned } from 'lucide-react';
import { Job } from '@prisma/client';
import { cn, daysAgo, formatSalary } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../spinner';
import BookmarkIcon from './bookmark-icon';

type JobListItemProps = {
  job: Job;
  isActive?: boolean;
  onClick: () => void;
};

export default function JobListItem({
  job,
  isActive,
  onClick,
}: JobListItemProps) {
  const {
    id,
    slug,
    title,
    companyName,
    companyLogo,
    location,
    salary,
    type,
    createdAt,
  } = job;

  const useViewport = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 640);
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
  };

  const isMobile = useViewport();
  const href = isMobile ? `/jobs/${slug}` : `#${slug}`;
  return (
    <>
      {!job && <LoadingSpinner className="w-full h-64" />}
      {job && (
        <div
          className={cn(
            'p-4 border rounded-md space-y-2',
            isActive ? 'bg-[#f4f5f7] dark:bg-gray-700' : ''
          )}
          onClick={onClick}
        >
          <a href={href} className="cursor-pointer">
            <div className="flex items-center justify-between my-4">
              <div className="relative h-[64px] w-[64px]">
                <Image
                  src={companyLogo!}
                  alt="company logo"
                  fill
                  className="rounded-full self-center object-cover"
                />
              </div>
              <BookmarkIcon title={title} company={companyName} slug={slug} />
            </div>
            <p className="font-semibold">{title}</p>
            <p className="">{companyName}</p>
            <div className="text-muted-foreground">
              <p className="flex items-center gap-1.5 ">
                <Briefcase size={16} className="shrink-0" />
                {type}
              </p>
              <p className="flex items-center gap-1.5 ">
                <MapPinned size={16} className="shrink-0" />
                {location}
              </p>
              <p className="flex items-center gap-1.5 ">
                <Banknote size={16} className="shrink-0" />
                {formatSalary(salary)}
              </p>
              <p className="flex items-center gap-1.5 mt-4">
                {daysAgo(createdAt)}
              </p>
            </div>
          </a>
        </div>
      )}
    </>
  );
}
