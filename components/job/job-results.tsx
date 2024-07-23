'use client';

import { Job } from '@prisma/client';
import JobItemContent from './job-item-content';
import JobListItem from './job-list-item';
import { useJobStore } from '@/lib/store';
import Pagination from './job-pagination';
import { TJobFilterSchema } from '@/types/job-schema';
import { RESULT_PER_PAGE } from '@/lib/constants';

type JobResultsProps = {
  jobs: Job[];
  page?: number;
  total: number;
  filterValue: TJobFilterSchema;
};

export default function JobResults({
  jobs,
  page = 1,
  total,
  filterValue,
}: JobResultsProps) {
  const { activeJobId, setActiveJobId } = useJobStore();

  const activeJob = jobs.find((job) => job.id === activeJobId);

  return (
    <section className="flex flex-col md:flex-row gap-4">
      {jobs.length === 0 ? (
        <p className="m-auto text-center">
          No jobs found. Try a different search.
        </p>
      ) : (
        <>
          <div className="w-full md:w-1/3 space-y-4">
            <p>
              {total > 0 ? (
                <span>
                  <b>{total}</b> jobs available
                </span>
              ) : (
                ''
              )}
            </p>

            {jobs.map((job) => (
              <JobListItem
                key={job.id}
                job={job}
                isActive={job.id === activeJobId}
                onClick={() => setActiveJobId(job.id)}
              />
            ))}
            {jobs.length > 0 && (
              <Pagination
                currentPage={page}
                totalPages={Math.ceil(total / RESULT_PER_PAGE)}
                filterValue={filterValue}
              />
            )}
          </div>
          <div className="w-2/3">
            <div className="hidden md:flex items-center justify-center sticky top-0">
              <JobItemContent job={activeJob} />
            </div>
          </div>
        </>
      )}
    </section>
  );
}
