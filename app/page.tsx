import JobFilter from '@/components/job/job-filter';
import JobResults from '@/components/job/job-results';
import Nav from '@/components/navigation/nav';
import prisma from '@/server/db';
import { redirect } from 'next/navigation';
import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';
import { RESULT_PER_PAGE } from '@/lib/constants';

type HomeProps = {
  searchParams: {
    query?: string;
    type?: string;
    location?: string;
    page?: string;
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const { query, type, location, page } = searchParams;

  const currentPage = parseInt(page ?? '1');

  const skip = (currentPage - 1) * RESULT_PER_PAGE;

  const filterValue = {
    query,
    type,
    location,
  };

  const queryString = query
    ?.split(' ')
    .filter((word) => word.length > 0)
    .join(' ');

  console.log('queryString', queryString);

  const searchFilter: Prisma.JobWhereInput = queryString
    ? {
        OR: [
          {
            title: {
              contains: queryString,
              mode: 'insensitive',
            },
          },
          {
            type: {
              contains: queryString,
              mode: 'insensitive',
            },
          },
          {
            location: {
              contains: queryString,
              mode: 'insensitive',
            },
          },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type: { contains: type, mode: 'insensitive' } } : {},
      location ? { location: { contains: location, mode: 'insensitive' } } : {},
      {
        approved: true,
      },
    ],
  };

  const filteredJobsPromise = prisma.job.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: RESULT_PER_PAGE,
    skip,
  });

  const totalResultsPromise = prisma.job.count({ where });

  const [jobs, totalResults] = await Promise.all([
    filteredJobsPromise,
    totalResultsPromise,
  ]);

  return (
    <>
      <main>
        <div className="space-y-8">
          <JobFilter defaultValues={filterValue} />
          <JobResults
            jobs={jobs}
            total={totalResults}
            page={currentPage}
            filterValue={filterValue}
          />
        </div>
      </main>
    </>
  );
}
