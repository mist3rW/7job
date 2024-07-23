import JobItemContent from '@/components/job/job-item-content';
import prisma from '@/server/db';
import { notFound } from 'next/navigation';
import { cache } from 'react';

const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: { slug },
  });
  if (!job) notFound();
  return job;
});

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const job = await getJob(slug);
  return (
    <main className="max-w-5xl  px-3 m-auto my-10 flex flex-col md:flex-row items-center gap-5 md:items-start">
      <JobItemContent job={job} />
    </main>
  );
}
