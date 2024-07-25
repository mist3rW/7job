'use server';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { daysAgo, formatSalary } from '@/lib/utils';
import prisma from '@/server/db';

import { Banknote, Briefcase, Clock, MapPinned } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import SingleJob from './single-job';

const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: { slug },
  });
  if (!job) notFound();
  return job;
});

export async function generateStaticParams() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    select: { slug: true },
  });
  return jobs.map(({ slug }) => slug);
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const job = await getJob(slug);
  return {
    title: job.title,
  };
}

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const job = await getJob(slug);

  const applyLink = job?.applyEmail
    ? `mailto:${job.applyEmail}`
    : job?.applyUrl;

  if (!applyLink) {
    console.error(`Job has no application link`);
    notFound();
  }

  return (
    <main className="max-w-5xl  px-3 m-auto my-10 flex flex-col md:flex-row items-center gap-5 md:items-start">
      <section className="my-4 p-4 space-y-4 w-full ">
        <SingleJob job={job} />
        <div className="flex gap-2">
          <Button asChild>
            <a href={applyLink} target="_blank" className="w-40 md:w-fit">
              Apply Now
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}
