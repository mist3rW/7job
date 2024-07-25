import BookmarkIcon from '@/components/job/bookmark-icon';

import { Separator } from '@/components/ui/separator';
import { daysAgo, formatSalary } from '@/lib/utils';
import { Job } from '@prisma/client';
import { Banknote, Briefcase, Clock, MapPinned } from 'lucide-react';
import Image from 'next/image';

type SingleJobProps = {
  job: Job;
};

export default function SingleJob({ job }: SingleJobProps) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <Image
          src={job.companyLogo!}
          alt={job.companyName}
          width={150}
          height={150}
        />
        <BookmarkIcon
          title={job.title}
          slug={job.slug}
          company={job.companyName}
          size="40"
        />
      </div>
      <h1 className="font-bold text-2xl">{job.title}</h1>

      <p>{job.companyName}</p>

      <Separator />
      <div>
        <p className="flex items-center gap-1.5 ">
          <Briefcase size={16} className="shrink-0" />
          {job.type}
        </p>
        <p className="flex items-center gap-1.5 ">
          <MapPinned size={16} className="shrink-0" />
          {job.location}
        </p>
        <p className="flex items-center gap-1.5 ">
          <Banknote size={16} className="shrink-0" />
          {formatSalary(job.salary)}
        </p>
        <p className="flex items-center gap-1.5 mt-4">
          <Clock size={16} className="shrink-0" />
          Posted: {daysAgo(job.createdAt)}
        </p>
      </div>
      <Separator />
      <div>
        <h2 className="font-semibold text-lg">Job Description</h2>
        <div dangerouslySetInnerHTML={{ __html: job.description }}></div>
      </div>
      <Separator />
    </div>
  );
}
