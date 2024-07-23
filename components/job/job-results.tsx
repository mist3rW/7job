'use client';

import { Job } from '@prisma/client';
import JobItemContent from './job-item-content';
import JobListItem from './job-list-item';

import { useJobStore } from '@/lib/store';

type JobResultsProps = {
  jobs: Job[];
};

export default function JobResults({ jobs }: JobResultsProps) {
  const { activeJobId, setActiveJobId } = useJobStore();

  const activeJob = jobs.find((job) => job.id === activeJobId);

  return (
    <section className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/3 space-y-4">
        {jobs.map((job) => (
          <JobListItem
            key={job.id}
            job={job}
            isActive={job.id === activeJobId}
            onClick={() => setActiveJobId(job.id)}
          />
        ))}
      </div>
      <div className="w-2/3">
        <div className="hidden md:flex items-center justify-center sticky top-0">
          <JobItemContent job={activeJob} />
        </div>
      </div>
    </section>
  );
}
