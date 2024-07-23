import Image from 'next/image';
import { Banknote, Bookmark, Briefcase, MapPinned } from 'lucide-react';
import { Job } from '@prisma/client';
import { cn, daysAgo, formatSalary } from '@/lib/utils';

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
  return (
    <div
      className={cn(
        'p-4 border rounded-md space-y-2',
        isActive ? 'bg-[#f4f5f7]' : ''
      )}
      onClick={onClick}
    >
      <a href={`#${slug}`} className="cursor-pointer">
        <div className="flex items-center justify-between">
          <Image
            src={companyLogo!}
            alt="company logo"
            width={64}
            height={64}
            className="rounded-full self-center"
          />
          <Bookmark />
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
          <p className="flex items-center gap-1.5 mt-4">{daysAgo(createdAt)}</p>
        </div>
      </a>
    </div>
  );
}
