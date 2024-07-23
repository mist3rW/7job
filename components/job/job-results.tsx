'use client';
import { Job } from '@prisma/client';
import JobItemContent from './job-item-content';
import JobListItem from './job-list-item';
import { useState } from 'react';

type JobResultsProps = {
  jobs: Job[];
};

export default function JobResults({ jobs }: JobResultsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  return (
    <section className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/3 space-y-4">
        {jobs.map((job) => (
          <JobListItem
            key={job.id}
            job={job}
            isActive={job.id === activeId}
            onClick={() => setActiveId(job.id)}
          />
        ))}
      </div>
      <div className="w-2/3">
        <JobItemContent />
      </div>
    </section>
  );
}
