import {
  Banknote,
  Briefcase,
  Clock,
  ExternalLink,
  Globe2,
  MapPinned,
} from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { Job } from '@prisma/client';
import { daysAgo, formatSalary } from '@/lib/utils';
import { Separator } from '../ui/separator';
import { notFound } from 'next/navigation';

type JobItemContentProps = {
  job: Job | undefined;
};

export default function JobItemContent({ job }: JobItemContentProps) {
  if (!job) return <EmptyJobContent />;

  const applyLink = job?.applyEmail
    ? `mailto:${job.applyEmail}`
    : job?.applyUrl;

  if (!applyLink) {
    console.error(`Job has no application link`);
    notFound();
  }

  return (
    <section className="my-4 p-4 space-y-4 w-full ">
      <h1 className="font-bold text-2xl">{job.title}</h1>
      <p>{job.companyName}</p>
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
        <Button className="bg-zinc-400">Save</Button>
      </div>
    </section>
  );
}

function EmptyJobContent() {
  return (
    <section className="hidden md:flex flex-col my-4 p-4  space-y-4 ">
      <div className="flex flex-col justify-center w-full mx-auto items-center">
        <p className="text-bold text-2xl">
          What kind of jobs are you looking for?
        </p>
        <p>Start by searching for any job, company, or location.</p>
      </div>
    </section>
  );
}
