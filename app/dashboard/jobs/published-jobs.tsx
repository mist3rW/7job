'use client';
import { RESULT_PER_PAGE } from '@/lib/constants';
import { Job } from '@prisma/client';
import React, { useState } from 'react';
import JobTable from './job-table';
import { PageDirection } from '@/types/types';
import PaginationControl from './pagination-control';

type PublishedJobsProps = {
  jobs: Job[];
};

export default function PublishedJobs({ jobs }: PublishedJobsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(jobs.length / RESULT_PER_PAGE);

  const jobsSlice = jobs.slice(
    (currentPage - 1) * RESULT_PER_PAGE,
    currentPage * RESULT_PER_PAGE
  );

  const handleChangePage = (direction: PageDirection) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === 'previous' && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      <JobTable jobs={jobsSlice} />
      <PaginationControl
        currentPage={currentPage}
        totalPages={totalPages}
        onClick={handleChangePage}
      />
    </div>
  );
}
