import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { daysAgo, formatSalary } from '@/lib/utils';
import prisma from '@/server/db';

import { Banknote, Briefcase, Clock, MapPinned } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { cache } from 'react';

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
        <Image
          src={job.companyLogo!}
          alt={job.companyName}
          width={150}
          height={150}
        />
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
