import JobFilter from '@/components/job/job-filter';
import JobResults from '@/components/job/job-results';
import Nav from '@/components/navigation/nav';
import prisma from '@/server/db';
import { redirect } from 'next/navigation';

export default async function Home() {
  const jobs = await prisma.job.findMany();

  return (
    <>
      <main>
        <div className="space-y-8">
          <JobFilter />
          <JobResults jobs={jobs} />
        </div>
      </main>
    </>
  );
}
